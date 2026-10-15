import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const clients = [
  { name: "Llorens", src: "client-llorens.webp" },
  { name: "Campos de Trigo", src: "campos-de-trigo.webp" },
  { name: "Molinos", src: "client-molinos.webp" },
  { name: "Tótem", src: "client-totem.webp" },
];

const projects = [
  {
    name: "Llorens Group",
    src: "client-llorens.webp",
    blurb: "Gestión multisucursal para lubricantes y combustibles.",
  },
  {
    name: "Campos de Trigo",
    src: "campos-de-trigo.webp",
    blurb: "Pedidos, producción y entregas para panadería.",
  },
  {
    name: "Molinos Combustibles",
    src: "client-molinos.webp",
    blurb: "Turnos, caja y stock para estación de servicio.",
  },
  {
    name: "Hotel Tótem",
    src: "client-totem.webp",
    blurb: "Reservas, habitaciones y operación hotelera.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Relevamos cómo opera hoy tu negocio y qué hay que ordenar primero.",
  },
  {
    number: "02",
    title: "Prototipo",
    description:
      "Armamos una primera versión visual para validar flujos y prioridades.",
  },
  {
    number: "03",
    title: "Desarrollo",
    description:
      "Construimos por etapas cortas, con avances visibles para probar y ajustar.",
  },
  {
    number: "04",
    title: "Entrega",
    description:
      "Ponemos el sistema en marcha y acompañamos al equipo en la operación real.",
  },
];

function fadeUp(frame, start, duration = 14) {
  const t = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return {
    opacity: t,
    transform: `translateY(${(1 - t) * 28}px)`,
  };
}

function CinematicBackground({ frame }) {
  const glow = 0.55 + Math.sin(frame / 26) * 0.2;
  const shaftA = Math.sin(frame / 48) * 40;
  const shaftB = Math.cos(frame / 52) * 50;
  const meshX = frame * 0.35;
  const meshY = frame * 0.55;
  const scan = ((frame * 2.2) % 130) - 15;

  const frames = [
    { x: 48, y: 120, w: 180, h: 180, delay: 0 },
    { x: 820, y: 220, w: 140, h: 140, delay: 18 },
    { x: 90, y: 1480, w: 160, h: 160, delay: 30 },
    { x: 860, y: 1520, w: 130, h: 130, delay: 8 },
  ];

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(165deg, #01040d 0%, #04111f 38%, #071a2e 72%, #020617 100%)",
        }}
      />

      {/* Soft center wash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(14,116,144,0.22), transparent 55%)",
          opacity: glow,
        }}
      />

      {/* Diagonal light shafts */}
      <div
        style={{
          position: "absolute",
          left: `calc(18% + ${shaftA}px)`,
          top: "-10%",
          width: 180,
          height: "130%",
          background:
            "linear-gradient(180deg, transparent, rgba(34,211,238,0.12), rgba(56,189,248,0.08), transparent)",
          transform: "rotate(18deg)",
          filter: "blur(18px)",
          opacity: 0.7,
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: `calc(10% + ${shaftB}px)`,
          top: "-15%",
          width: 140,
          height: "140%",
          background:
            "linear-gradient(180deg, transparent, rgba(59,130,246,0.14), rgba(34,211,238,0.06), transparent)",
          transform: "rotate(-14deg)",
          filter: "blur(22px)",
          opacity: 0.55,
          mixBlendMode: "screen",
        }}
      />

      {/* Tech mesh */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          backgroundImage:
            "linear-gradient(rgba(125,211,252,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.28) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          backgroundPosition: `${meshX}px ${meshY}px`,
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 78%)",
        }}
      />

      {/* Floating geometric frames */}
      {frames.map((f, i) => {
        const bob = Math.sin(frame / 28 + i) * 10;
        const opacity = 0.2 + ((Math.sin(frame / 20 + i * 1.4) + 1) / 2) * 0.25;
        return (
          <div
            key={`geo-${i}`}
            style={{
              position: "absolute",
              left: f.x,
              top: f.y + bob,
              width: f.w,
              height: f.h,
              border: "1px solid rgba(165,243,252,0.22)",
              borderRadius: 28,
              transform: `rotate(${i % 2 === 0 ? 8 : -6}deg)`,
              opacity,
              boxShadow: "inset 0 0 40px rgba(34,211,238,0.06)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 14,
                top: 14,
                width: 18,
                height: 18,
                borderLeft: "2px solid rgba(34,211,238,0.55)",
                borderTop: "2px solid rgba(34,211,238,0.55)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 14,
                bottom: 14,
                width: 18,
                height: 18,
                borderRight: "2px solid rgba(56,189,248,0.45)",
                borderBottom: "2px solid rgba(56,189,248,0.45)",
              }}
            />
          </div>
        );
      })}

      {/* Corner HUD brackets */}
      {[
        { top: 48, left: 40, rotate: 0 },
        { top: 48, right: 40, rotate: 90 },
        { bottom: 48, left: 40, rotate: -90 },
        { bottom: 48, right: 40, rotate: 180 },
      ].map((pos, i) => {
        const { rotate, ...box } = pos;
        return (
          <div
            key={`hud-${i}`}
            style={{
              position: "absolute",
              ...box,
              width: 54,
              height: 54,
              borderLeft: "2px solid rgba(34,211,238,0.35)",
              borderTop: "2px solid rgba(34,211,238,0.35)",
              transform: `rotate(${rotate}deg)`,
              opacity: 0.35 + glow * 0.25,
            }}
          />
        );
      })}

      {/* Soft scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `${scan}%`,
          height: 90,
          background:
            "linear-gradient(180deg, transparent, rgba(125,211,252,0.08), transparent)",
          opacity: 0.55,
          pointerEvents: "none",
        }}
      />

      {/* Rising data bits */}
      {Array.from({ length: 12 }, (_, i) => {
        const x = 10 + ((i * 21) % 80);
        const speed = 0.35 + (i % 4) * 0.12;
        const y = 110 - (((frame * speed + i * 23) % 130) % 130);
        const opacity = interpolate(y, [0, 20, 80, 110], [0, 0.5, 0.5, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={`bit-${i}`}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: i % 3 === 0 ? 18 : 3,
              height: i % 3 === 0 ? 3 : 18,
              borderRadius: 999,
              background: "rgba(103,232,249,0.75)",
              boxShadow: "0 0 10px rgba(34,211,238,0.4)",
              opacity,
            }}
          />
        );
      })}

      {/* Bottom glow platform */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "8%",
          width: 820,
          height: 180,
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse at center, rgba(34,211,238,0.18), transparent 70%)",
          filter: "blur(8px)",
          opacity: 0.5 + glow * 0.3,
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 36%, rgba(1,4,13,0.72) 78%, rgba(0,2,8,0.9) 100%)",
        }}
      />
    </AbsoluteFill>
  );
}

function SceneBrand({ frame, fps }) {
  const logo = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 110 },
  });
  const tag = fadeUp(frame, 10, 12);
  const glow = 0.4 + Math.sin(frame / 14) * 0.25;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 48,
      }}
    >
      <div
        style={{
          transform: `scale(${0.92 + logo * 0.14})`,
          opacity: logo,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          filter: `drop-shadow(0 0 ${28 + glow * 30}px rgba(34,211,238,0.4))`,
        }}
      >
        <Img
          src={staticFile("vireon-logo.svg")}
          style={{ width: 780, height: "auto" }}
        />
        <p
          style={{
            ...tag,
            margin: 0,
            color: "rgba(165,243,252,0.92)",
            fontSize: 38,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Sistemas a medida
        </p>
      </div>
    </AbsoluteFill>
  );
}

function SceneHeadline({ frame, fps }) {
  const words = [
    { text: "Software", line: 0 },
    { text: "que", line: 0 },
    { text: "ordena", line: 0 },
    { text: "y", line: 1 },
    { text: "potencia", line: 1 },
    { text: "tu", line: 2, accent: true },
    { text: "operación.", line: 2, accent: true },
  ];

  const rule = spring({
    frame: frame - 34,
    fps,
    config: { damping: 16, stiffness: 120 },
  });
  const sub = spring({
    frame: frame - 40,
    fps,
    config: { damping: 15, stiffness: 130 },
  });
  const glow = 0.55 + Math.sin(Math.max(0, frame - 36) / 10) * 0.35;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 40px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 860,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.18), transparent 70%)",
          filter: "blur(12px)",
          opacity: 0.85,
        }}
      />

      <div style={{ position: "relative", maxWidth: 980, width: "100%" }}>
        <h1
          style={{
            margin: 0,
            fontSize: 92,
            lineHeight: 1.08,
            letterSpacing: "-0.045em",
            fontWeight: 650,
          }}
        >
          {[0, 1, 2].map((line) => (
            <span
              key={line}
              style={{ display: "block", marginTop: line === 0 ? 0 : 8 }}
            >
              {words
                .filter((w) => w.line === line)
                .map((word, i, arr) => {
                  const idx = words.indexOf(word);
                  const enter = spring({
                    frame: frame - 2 - idx * 4,
                    fps,
                    config: { damping: 14, stiffness: 160, mass: 0.7 },
                  });
                  return (
                    <span
                      key={word.text}
                      style={{
                        display: "inline-block",
                        marginRight: i < arr.length - 1 ? 16 : 0,
                        opacity: enter,
                        transform: `translateY(${(1 - enter) * 40}px) scale(${0.9 + enter * 0.1})`,
                        color: word.accent ? "#a5f3fc" : "#fff",
                        textShadow: word.accent
                          ? `0 0 ${20 * glow}px rgba(34,211,238,${0.55 * glow})`
                          : "0 8px 28px rgba(0,0,0,0.3)",
                      }}
                    >
                      {word.text}
                    </span>
                  );
                })}
            </span>
          ))}
        </h1>

        <div
          style={{
            margin: "34px auto 0",
            height: 3,
            width: 160,
            borderRadius: 999,
            background:
              "linear-gradient(90deg, transparent, #67e8f9, transparent)",
            transform: `scaleX(${rule})`,
            opacity: rule,
          }}
        />

        <p
          style={{
            margin: "34px auto 0",
            color: "#cbd5e1",
            fontSize: 48,
            lineHeight: 1.35,
            maxWidth: 900,
            letterSpacing: "-0.02em",
            fontWeight: 500,
            opacity: sub,
            transform: `translateY(${(1 - sub) * 18}px)`,
          }}
        >
          Tecnología que ordena tu negocio y lo hace crecer.
        </p>
      </div>
    </AbsoluteFill>
  );
}

function SceneProcess({ frame }) {
  // Hold each step, then ease-slide to the next (~3s/step)
  const stepDuration = 90;
  const transitionFrames = 28;
  const holdFrames = stepDuration - transitionFrames;

  const stepFloor = Math.min(
    processSteps.length - 1,
    Math.max(0, Math.floor(frame / stepDuration)),
  );
  const local = frame - stepFloor * stepDuration;

  let track = stepFloor;
  if (stepFloor < processSteps.length - 1 && local > holdFrames) {
    const t = interpolate(local, [holdFrames, stepDuration], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    });
    track = stepFloor + t;
  }

  const stepIndex = Math.min(
    processSteps.length - 1,
    Math.round(track),
  );
  const progress = (track + 0.15) / processSteps.length;
  const eyebrow = fadeUp(frame, 0, 10);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 40px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          ...eyebrow,
          margin: "0 0 18px",
          color: "rgba(165,243,252,0.9)",
          fontSize: 28,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        Proceso
      </p>

      <h2
        style={{
          margin: "0 0 44px",
          color: "#fff",
          fontSize: 46,
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          fontWeight: 650,
          maxWidth: 880,
          opacity: fadeUp(frame, 4, 12).opacity,
          transform: fadeUp(frame, 4, 12).transform,
        }}
      >
        Así llevamos tu idea a un sistema en marcha
      </h2>

      <div
        style={{
          display: "flex",
          gap: 14,
          marginBottom: 36,
          opacity: fadeUp(frame, 8, 10).opacity,
        }}
      >
        {processSteps.map((s, i) => (
          <div
            key={s.number}
            style={{
              width: i === stepIndex ? 40 : 12,
              height: 12,
              borderRadius: 999,
              background:
                i <= stepIndex
                  ? "rgba(34,211,238,0.9)"
                  : "rgba(148,163,184,0.25)",
            }}
          />
        ))}
      </div>

      {/* Carousel stage — continuous slide between steps */}
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            width: `${processSteps.length * 100}%`,
            transform: `translateX(-${(track * 100) / processSteps.length}%)`,
          }}
        >
          {processSteps.map((step, i) => {
            const dist = Math.abs(track - i);
            const focus = interpolate(dist, [0, 1], [1, 0.55], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={step.number}
                style={{
                  width: `${100 / processSteps.length}%`,
                  flexShrink: 0,
                  padding: "0 12px",
                  boxSizing: "border-box",
                  opacity: focus,
                  transform: `scale(${0.92 + focus * 0.08})`,
                }}
              >
                <div
                  style={{
                    padding: "52px 36px",
                    borderRadius: 36,
                    border: "1px solid rgba(165,243,252,0.22)",
                    background:
                      "linear-gradient(160deg, rgba(8,24,44,0.95), rgba(2,6,23,0.88))",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
                  }}
                >
                  <div
                    style={{
                      width: 96,
                      height: 96,
                      margin: "0 auto 28px",
                      borderRadius: "50%",
                      border: "1px solid rgba(165,243,252,0.45)",
                      background: "rgba(34,211,238,0.14)",
                      color: "#a5f3fc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 34,
                      fontWeight: 700,
                      boxShadow: "0 0 36px rgba(34,211,238,0.25)",
                    }}
                  >
                    {step.number}
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      color: "#fff",
                      fontSize: 56,
                      fontWeight: 650,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      margin: "20px auto 0",
                      color: "#94a3b8",
                      fontSize: 32,
                      lineHeight: 1.4,
                      maxWidth: 720,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          marginTop: 44,
          width: 320,
          height: 4,
          borderRadius: 999,
          background: "rgba(148,163,184,0.2)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min(100, progress * 100)}%`,
            height: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg, #22d3ee, #38bdf8)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
}

function SceneProjects({ frame, fps }) {
  const page = frame < 70 ? 0 : 1;
  const pageLocal = page === 0 ? frame : frame - 70;
  const visible = projects.slice(page * 2, page * 2 + 2);
  const pageOpacity =
    page === 0
      ? interpolate(frame, [0, 10, 58, 70], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : interpolate(frame, [70, 82, 130, 145], [0, 1, 1, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  const eyebrow = fadeUp(frame, 0, 10);
  const title = fadeUp(frame, 4, 12);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 40px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          ...eyebrow,
          margin: "0 0 14px",
          color: "rgba(165,243,252,0.9)",
          fontSize: 28,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        Proyectos
      </p>
      <h2
        style={{
          ...title,
          margin: "0 0 32px",
          color: "#fff",
          fontSize: 46,
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          fontWeight: 650,
          maxWidth: 860,
        }}
      >
        Sistemas hechos a la medida de cada negocio
      </h2>

      <div
        style={{
          opacity: pageOpacity,
          width: "100%",
          maxWidth: 960,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {visible.map((project, index) => {
          const enter = spring({
            frame: pageLocal - 2 - index * 6,
            fps,
            config: { damping: 15, stiffness: 140 },
          });
          return (
            <div
              key={`${project.name}-${page}`}
              style={{
                opacity: enter,
                transform: `translateY(${(1 - enter) * 24}px)`,
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "24px 26px",
                borderRadius: 28,
                border: "1px solid rgba(165,243,252,0.18)",
                background:
                  "linear-gradient(120deg, rgba(8,22,42,0.94), rgba(2,6,23,0.82))",
                boxShadow: "0 16px 40px rgba(0,0,0,0.32)",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 132,
                  height: 108,
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(15,23,42,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 14,
                  flexShrink: 0,
                }}
              >
                <Img
                  src={staticFile(project.src)}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    margin: 0,
                    color: "#fff",
                    fontSize: 34,
                    fontWeight: 650,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.name}
                </p>
                <p
                  style={{
                    margin: "8px 0 0",
                    color: "#94a3b8",
                    fontSize: 28,
                    lineHeight: 1.35,
                  }}
                >
                  {project.blurb}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

function SceneClients({ frame, fps }) {
  const fade = interpolate(frame, [0, 10, 48, 60], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const title = fadeUp(frame, 0, 10);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 48px",
        opacity: fade,
      }}
    >
      <p
        style={{
          ...title,
          margin: "0 0 28px",
          color: "rgba(148,163,184,0.7)",
          fontSize: 26,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        Nuestros clientes
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          width: "100%",
          maxWidth: 720,
        }}
      >
        {clients.map((client, index) => {
          const enter = spring({
            frame: frame - index * 3,
            fps,
            config: { damping: 18, stiffness: 150 },
          });
          return (
            <div
              key={client.name}
              style={{
                opacity: 0.5 * enter,
                height: 120,
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(15,23,42,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                filter: "grayscale(1)",
              }}
            >
              <Img
                src={staticFile(client.src)}
                style={{
                  maxWidth: "85%",
                  maxHeight: 70,
                  objectFit: "contain",
                  opacity: 0.65,
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

function SceneCta({ frame, fps }) {
  const enter = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });
  const pulse = 0.98 + Math.sin(frame / 11) * 0.025;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
        textAlign: "center",
      }}
    >
      <div
        style={{
          opacity: enter,
          transform: `scale(${0.94 + enter * 0.1})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          width: "100%",
        }}
      >
        <Img
          src={staticFile("vireon-logo.svg")}
          style={{
            width: 680,
            height: "auto",
            filter: "drop-shadow(0 0 44px rgba(34,211,238,0.45))",
          }}
        />
        <h2
          style={{
            margin: 0,
            color: "#fff",
            fontSize: 74,
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            fontWeight: 650,
            maxWidth: 940,
            textShadow: "0 0 40px rgba(34,211,238,0.2)",
          }}
        >
          Contanos qué querés ordenar
        </h2>
        <div
          style={{
            padding: "30px 52px",
            borderRadius: 999,
            border: "1px solid rgba(165,243,252,0.55)",
            background:
              "linear-gradient(180deg, rgba(34,211,238,0.28), rgba(34,211,238,0.12))",
            boxShadow: `0 0 ${40 * pulse}px rgba(34,211,238,0.45)`,
            color: "#f8fafc",
            fontSize: 38,
            fontWeight: 650,
            transform: `scale(${pulse})`,
          }}
        >
          Escribinos por WhatsApp
        </div>
      </div>
    </AbsoluteFill>
  );
}

export const Story = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ~29s @ 30fps — proceso carrusel lento
  const scenes = [
    { start: 0, end: 75, Component: SceneBrand },
    { start: 60, end: 165, Component: SceneHeadline },
    { start: 150, end: 530, Component: SceneProcess },
    { start: 515, end: 670, Component: SceneProjects },
    { start: 655, end: 720, Component: SceneClients },
    { start: 705, end: 870, Component: SceneCta },
  ];

  return (
    <AbsoluteFill
      style={{
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
        background: "#020617",
      }}
    >
      <CinematicBackground frame={frame} />

      {scenes.map(({ start, end, Component }) => {
        if (frame < start || frame > end) return null;

        const local = frame - start;
        const fadeIn = interpolate(frame, [start, start + 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const fadeOut = interpolate(frame, [end - 10, end], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <AbsoluteFill
            key={start}
            style={{ opacity: Math.min(fadeIn, fadeOut) }}
          >
            <Component frame={local} fps={fps} />
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
