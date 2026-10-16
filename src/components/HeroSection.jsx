import { useRef } from "react";
import { Link } from "react-router-dom";
import { heroScreen } from "../data/screens";
import { useGsap } from "../hooks/useGsap";
import { countUp } from "../lib/gsap";
import AppScreen from "./landing/AppScreen";
import ScaledFrame from "./landing/ScaledFrame";
import SiteLogo from "./SiteLogo";
import { DIAGNOSIS_URL } from "./WhatsAppFloat";

const STRUCK = ["WhatsApp.", "Excel.", "Planillas."];

const TICKS = [
  "Pedido #318 · Campos de Trigo",
  "Check-in 204 · Hotel Tótem",
  "Cierre de turno · Llorens Simoca",
  "Sesión registrada · Vida Plena",
  "Tanque 2 · Molinos Combustibles",
];

function animateScreen(gsap, root, delay) {
  const tl = gsap.timeline({ delay, defaults: { ease: "expo.out" } });

  tl.from(root.querySelectorAll(".as-card"), {
    opacity: 0,
    y: 18,
    duration: 0.9,
    stagger: 0.05,
  });

  root.querySelectorAll(".as-count").forEach((el, index) => {
    tl.add(countUp(el, { duration: 1.8 }), 0.15 + index * 0.06);
  });

  const line = root.querySelector(".as-line");
  if (line) {
    const length = line.getTotalLength();
    tl.fromTo(
      line,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" },
      0.2,
    )
      .from(root.querySelector(".as-area"), { opacity: 0, duration: 1.4 }, 0.9)
      .from(root.querySelector(".as-dot"), { scale: 0, transformOrigin: "center", duration: 0.6 }, 1.9);
  }

  tl.from(root.querySelectorAll(".as-bar"), { scaleX: 0, duration: 1.4, stagger: 0.08 }, 0.35).from(
    root.querySelectorAll(".as-row"),
    { opacity: 0, x: -14, duration: 0.8, stagger: 0.06 },
    0.45,
  );

  return tl;
}

function HeroSection() {
  const rootRef = useRef(null);

  useGsap(rootRef, ({ scope, desktop, fine, gsap }) => {
    const device = scope.querySelector(".hero-device");
    const tilt = scope.querySelector(".hero-tilt");
    const ticks = gsap.utils.toArray(".hero-tick");
    const cleanups = [];

    const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
    intro
      .from(".hero-beam", { opacity: 0, scaleX: 0.4, duration: 2.2, ease: "power3.out" }, 0)
      .from(".hero-logo", { opacity: 0, y: -12, duration: 1 }, 0.04)
      .from(".hero-kicker", { opacity: 0, y: 10, duration: 0.8 }, 0.12)
      .from(".hero-mess .sw-i", {
        yPercent: 120,
        duration: 1.15,
        stagger: 0.11,
      }, 0.18)
      .fromTo(
        ".hero-slash",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.55, ease: "power3.in", stagger: 0.14 },
        0.85,
      )
      .to(
        ".hero-mess .sw-i",
        { color: "#71717a", duration: 0.4, stagger: 0.1 },
        0.85,
      )
      .from(".hero-lock .sw-i", {
        yPercent: 120,
        duration: 1.2,
      }, 1.25)
      .from(".hero-lede, .hero-live, .hero-cta, .hero-meta", {
        opacity: 0,
        y: 18,
        duration: 0.95,
        stagger: 0.08,
      }, 1.4)
      .fromTo(
        ".hero-enter",
        { clipPath: "inset(0 0 0 100%)" },
        { clipPath: "inset(0 0 0 0%)", duration: 1.45, ease: "expo.inOut" },
        0.55,
      );

    intro.add(animateScreen(gsap, device, 0), 1.15);

    if (ticks.length) {
      gsap.set(ticks, { yPercent: 110, opacity: 0 });
      gsap.set(ticks[0], { yPercent: 0, opacity: 1 });
      let index = 0;
      const cycle = () => {
        const current = ticks[index];
        const next = ticks[(index + 1) % ticks.length];
        gsap.timeline()
          .to(current, { yPercent: -110, opacity: 0, duration: 0.5, ease: "power3.in" })
          .fromTo(
            next,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            0.08,
          );
        index = (index + 1) % ticks.length;
      };
      const timer = window.setInterval(cycle, 2600);
      cleanups.push(() => window.clearInterval(timer));
    }

    gsap.to(".hero-device", {
      y: desktop ? -36 : -16,
      ease: "none",
      scrollTrigger: { trigger: scope, start: "top top", end: "70% top", scrub: true },
    });

    if (desktop && fine && tilt) {
      const rx = gsap.quickTo(tilt, "rotationX", { duration: 1, ease: "power3.out" });
      const ry = gsap.quickTo(tilt, "rotationY", { duration: 1, ease: "power3.out" });
      const onMove = (event) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        ry(nx * 6);
        rx(-ny * 4);
      };
      const onLeave = () => {
        rx(0);
        ry(0);
      };
      scope.addEventListener("pointermove", onMove);
      scope.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        scope.removeEventListener("pointermove", onMove);
        scope.removeEventListener("pointerleave", onLeave);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  });

  return (
    <section
      ref={rootRef}
      id="inicio"
      className="relative flex min-h-[100svh] flex-col overflow-x-clip pt-8 sm:pt-10"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hero-beam" />
        <div className="hero-lines" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 pt-6 pb-10 sm:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8 lg:pt-4 lg:pb-16">
        <div className="hero-copy">
          <SiteLogo className="hero-logo" />

          <Link
            to="/proyectos"
            className="hero-kicker mt-10 inline-flex items-center gap-2 text-[13px] text-zinc-500 transition hover:text-white sm:mt-12"
          >
            <span className="text-[11px] font-semibold tracking-[0.16em] text-white uppercase">
              Nuevo
            </span>
            Hotelus para hoteles
            <span aria-hidden="true">→</span>
          </Link>

          <h1 className="hero-title mt-6 text-[2.85rem] leading-[0.98] font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-[5.15rem]">
            <span className="sr-only">
              WhatsApp, Excel y planillas. Un sistema.
            </span>
            <span aria-hidden="true">
              {STRUCK.map((word) => (
                <span key={word} className="hero-mess relative block w-fit">
                  <span className="sw">
                    <span className="sw-i">{word}</span>
                  </span>
                  <span className="hero-slash" />
                </span>
              ))}
              <span className="hero-lock mt-1 block w-fit sm:mt-2">
                <span className="sw">
                  <span className="sw-i">Un sistema.</span>
                </span>
              </span>
            </span>
          </h1>

          <p className="hero-lede mt-7 max-w-md text-base leading-7 text-zinc-400 sm:text-[17px] sm:leading-8">
            Mejoramos los procesos de tu empresa y los convertimos en un
            sistema claro: más control, menos desorden, listo para el día a día.
          </p>

          <p className="hero-live mt-5 flex h-7 items-center gap-2.5 overflow-hidden text-[13px] text-zinc-500">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inset-0 animate-ping rounded-full bg-teal-300/70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-teal-300" />
            </span>
            <span className="relative block h-5 flex-1 overflow-hidden">
              {TICKS.map((tick) => (
                <span key={tick} className="hero-tick absolute inset-x-0 top-0 truncate">
                  {tick}
                </span>
              ))}
            </span>
          </p>

          <div className="hero-cta mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row">
            <a
              href={DIAGNOSIS_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Pedí un diagnóstico
            </a>
            <Link to="/proyectos" className="btn-ghost group">
              Ver proyectos
              <span className="ml-2 transition group-hover:translate-x-0.5">&rarr;</span>
            </Link>
          </div>

          <p className="hero-meta mt-6 text-[13px] text-zinc-600">
            Diagnóstico sin cargo · En el local · Desde Tucumán
          </p>
        </div>

        <div className="hero-stage relative [perspective:2200px]">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-tilt [transform-style:preserve-3d]">
            <div className="hero-device relative origin-[80%_50%] [transform-style:preserve-3d]">
              <div className="hero-enter origin-[80%_50%]">
                <div className="device-frame">
                  <ScaledFrame width={1280} height={860}>
                    <AppScreen screen={heroScreen} />
                  </ScaledFrame>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
