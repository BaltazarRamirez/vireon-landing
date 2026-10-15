import { useRef } from "react";
import { Link } from "react-router-dom";
import { heroScreen } from "../data/screens";
import { useGsap } from "../hooks/useGsap";
import { countUp } from "../lib/gsap";
import AppScreen from "./landing/AppScreen";
import ScaledFrame from "./landing/ScaledFrame";
import SplitWords from "./landing/SplitWords";
import SiteLogo from "./SiteLogo";
import { DIAGNOSIS_URL } from "./WhatsAppFloat";

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
    const title = scope.querySelector(".hero-title");
    const device = scope.querySelector(".hero-device");
    const tilt = scope.querySelector(".hero-tilt");

    const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
    intro
      .from(".hero-beam", { opacity: 0, scaleX: 0.4, duration: 2.2, ease: "power3.out" }, 0)
      .from(".hero-logo", { opacity: 0, y: -12, duration: 1 }, 0.05)
      .from(".hero-pill", { opacity: 0, y: -14, duration: 1 }, 0.18)
      .from(title.querySelectorAll(".sw-i"), {
        yPercent: 115,
        rotate: 5,
        duration: 1.3,
        stagger: 0.06,
      }, 0.15)
      .from(".hero-lede", { opacity: 0, y: 22, duration: 1.1 }, 0.55)
      .from(".hero-cta > *", { opacity: 0, y: 18, duration: 1, stagger: 0.08 }, 0.68)
      .from(".hero-promise", { opacity: 0, y: 14, duration: 0.9, stagger: 0.06 }, 0.9)
      .from(".hero-enter", {
        opacity: 0,
        y: 160,
        rotateX: 22,
        duration: 1.9,
      }, 0.5);

    intro.add(animateScreen(gsap, device, 0), 1.25);

    gsap.fromTo(
      device,
      { rotateX: desktop ? 24 : 14, scale: desktop ? 0.9 : 0.96 },
      {
        rotateX: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scope.querySelector(".hero-stage"),
          start: "top 88%",
          end: desktop ? "top 18%" : "top 30%",
          scrub: 1,
        },
      },
    );

    gsap.to(".hero-copy", {
      y: -80,
      opacity: 0.25,
      ease: "none",
      scrollTrigger: { trigger: scope, start: "top top", end: "45% top", scrub: true },
    });
    gsap.to(".hero-glow", {
      opacity: 1,
      scale: 1.15,
      ease: "none",
      scrollTrigger: {
        trigger: scope.querySelector(".hero-stage"),
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    });

    if (!desktop || !fine || !tilt) {
      return undefined;
    }

    const rx = gsap.quickTo(tilt, "rotationX", { duration: 1, ease: "power3.out" });
    const ry = gsap.quickTo(tilt, "rotationY", { duration: 1, ease: "power3.out" });
    const onMove = (event) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      ry(nx * 7);
      rx(-ny * 4);
    };
    const onLeave = () => {
      rx(0);
      ry(0);
    };

    scope.addEventListener("pointermove", onMove);
    scope.addEventListener("pointerleave", onLeave);
    return () => {
      scope.removeEventListener("pointermove", onMove);
      scope.removeEventListener("pointerleave", onLeave);
    };
  });

  return (
    <section
      ref={rootRef}
      id="inicio"
      className="relative overflow-x-clip pt-8 sm:pt-10"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hero-beam" />
        <div className="hero-lines" />
      </div>

      <div className="hero-copy relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 text-center sm:px-8">
        <SiteLogo className="hero-logo" />
        <Link
          to="/proyectos"
          className="hero-pill group mt-10 inline-flex items-center gap-3 rounded-full bg-white py-2 pr-5 pl-2 text-[14px] font-medium text-black shadow-[0_12px_40px_rgba(255,255,255,0.18)] transition hover:bg-zinc-200 sm:mt-12"
        >
          <span className="rounded-full bg-black px-3 py-1 text-[12px] font-bold tracking-[0.08em] text-white uppercase">
            Nuevo
          </span>
          Hotelus, nuestra plataforma hotelera
          <span className="transition group-hover:translate-x-0.5">
            &rarr;
          </span>
        </Link>

        <h1 className="hero-title mt-8 text-[2.7rem] leading-[1.02] font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.9rem]">
          <SplitWords
            parts={[
              { text: "Sistemas a medida" },
              {
                text: "que ordenan tu operación.",
                className: "text-gradient-muted",
                br: true,
              },
            ]}
          />
        </h1>

        <p className="hero-lede mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
          Sistemas de gestión para clínicas, hoteles, estaciones y comercios.
          Lo diseñamos con vos, lo dejamos operando en el local y nos quedamos
          hasta que el equipo lo use.
        </p>

        <div className="hero-cta mt-10 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
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

        <ul className="mt-8 flex flex-col items-center gap-2 text-[13px] text-zinc-500 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2">
          {["Diagnóstico sin cargo", "Lo dejamos operando en tu local", "Trabajamos desde Tucumán"].map(
            (item) => (
              <li key={item} className="hero-promise flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white/50" aria-hidden="true" />
                {item}
              </li>
            ),
          )}
        </ul>
      </div>

      <div className="hero-stage relative z-0 mx-auto mt-16 max-w-[1240px] px-4 sm:mt-20 sm:px-8 [perspective:2200px]">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-tilt [transform-style:preserve-3d]">
          <div className="hero-device relative origin-[50%_0%] [transform-style:preserve-3d]">
            <div className="hero-enter origin-[50%_0%]">
              <div className="device-frame">
                <ScaledFrame width={1280} height={860}>
                  <AppScreen screen={heroScreen} />
                </ScaledFrame>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-fade" aria-hidden="true" />
      </div>
    </section>
  );
}

export default HeroSection;
