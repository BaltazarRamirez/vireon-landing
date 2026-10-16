import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_intro;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.52;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / max(u_res.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 m = (u_mouse - 0.5) * vec2(aspect, 1.0);
  vec2 delta = p - m;
  float md = length(delta);
  p += delta * 0.14 / (md + 0.22);

  float n = fbm(vec2(p.x * 1.05, p.y * 3.1) + vec2(u_time * 0.04, u_time * 0.01));
  float n2 = fbm(vec2(p.x * 2.6, p.y * 6.4) - vec2(u_time * 0.028, 0.0));
  float fiber = 0.5 + 0.5 * sin((p.x * 2.8 + n * 1.8) * 6.28318 + u_time * 0.16);
  float silk = n * 0.62 + n2 * 0.38;
  float crease = pow(abs(sin(p.y * 9.0 + n * 3.2)), 8.0);
  float spec = pow(max(0.0, silk), 3.2);
  float rim = exp(-md * 2.4) * 0.28;
  float band = exp(-pow((uv.x - 0.5 - sin(u_time * 0.15) * 0.22) * 2.8, 2.0)) * 0.18;

  float light = mix(0.42, 1.0, silk);
  light = mix(light, 1.0, fiber * 0.32);
  light += crease * 0.08;
  light += spec * 0.28;
  light += rim + band;
  light = clamp(light, 0.38, 1.0) * mix(0.55, 1.0, u_intro);

  vec3 cold = vec3(0.72, 0.73, 0.78);
  vec3 warm = vec3(1.0);
  vec3 col = mix(cold, warm, smoothstep(0.38, 0.98, light));
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function HeroSilk({ active = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      return undefined;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      return undefined;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return undefined;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const aPos = gl.getAttribLocation(program, "a_pos");
    const uRes = gl.getUniformLocation(program, "u_res");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uIntro = gl.getUniformLocation(program, "u_intro");

    gl.useProgram(program);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    let raf = 0;
    let running = true;
    let visible = true;
    let start = performance.now();
    let intro = 0;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const size = { w: 0, h: 0 };
    const fine = window.matchMedia("(pointer: fine)").matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const cap = fine ? 1.6 : 1.15;
      const dpr = Math.min(window.devicePixelRatio || 1, cap);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (w === size.w && h === size.h) {
        return;
      }
      size.w = w;
      size.h = h;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) {
        return;
      }
      mouse.tx = (event.clientX - rect.left) / rect.width;
      mouse.ty = 1 - (event.clientY - rect.top) / rect.height;
    };

    const tick = (now) => {
      if (!running) {
        return;
      }
      if (!visible || document.hidden) {
        raf = 0;
        return;
      }

      const t = (now - start) / 1000;
      intro = Math.min(1, intro + 0.014);
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      if (!fine) {
        mouse.tx = 0.5 + Math.sin(t * 0.13) * 0.32;
        mouse.ty = 0.5 + Math.cos(t * 0.09) * 0.18;
      }

      gl.uniform2f(uRes, size.w, size.h);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uTime, t);
      const smooth = intro * intro * (3 - 2 * intro);
      gl.uniform1f(uIntro, smooth);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!running || raf || !visible || document.hidden) {
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
        return;
      }
      kick();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible) {
          kick();
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.05 },
    );

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    io.observe(canvas);
    resize();

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    kick();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      ro.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

export default HeroSilk;
