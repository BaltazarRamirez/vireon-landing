import { useRef } from "react";
import { featuredProjects } from "../../data/projects";
import { useGsap } from "../../hooks/useGsap";
import { countUp } from "../../lib/gsap";
import SiteLogo from "../SiteLogo";
import SplitWords from "./SplitWords";

const STATS = [
  { value: featuredProjects.length + 1, label: "Sistemas en producción" },
  { value: 5, label: "Rubros distintos" },
  { value: 1, label: "Producto propio" },
];

function ProjectsHero() {
  const rootRef = useRef(null);

  useGsap(rootRef, ({ scope, gsap }) => {
    const title = scope.querySelector(".pj-title");
    const intro = gsap.timeline({ defaults: { ease: "expo.out" } });

    intro
      .from(".pj-beam", { opacity: 0, scaleX: 0.4, duration: 2, ease: "power3.out" }, 0)
      .from(".hero-logo", { opacity: 0, y: -12, duration: 0.9 }, 0.04)
      .from(".pj-eyebrow", { opacity: 0, y: -12, duration: 0.9 }, 0.12)
      .from(title.querySelectorAll(".sw-i"), {
        yPercent: 115,
        rotate: 5,
        duration: 1.25,
        stagger: 0.055,
      }, 0.14)
      .from(".pj-lede", { opacity: 0, y: 20, duration: 1.05 }, 0.52)
      .from(".pj-stat", { opacity: 0, y: 18, duration: 0.95, stagger: 0.08 }, 0.68);

    scope.querySelectorAll(".pj-stat-value").forEach((el, index) => {
      intro.add(countUp(el, { duration: 1.6 }), 0.78 + index * 0.08);
    });
  });

  return (
    <section
      ref={rootRef}
      id="proyectos"
      className="relative overflow-hidden pt-8 pb-16 sm:pt-10 sm:pb-20"
    >
      <span data-section-anchor className="block h-0" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hero-beam pj-beam" />
        <div className="hero-lines opacity-70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex justify-center">
          <SiteLogo className="hero-logo" />
        </div>
        <p className="pj-eyebrow mt-10 text-[13px] font-medium tracking-[0.24em] text-zinc-500 uppercase sm:mt-12">
          Proyectos
        </p>
        <h1 className="pj-title mt-6 max-w-5xl text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.4rem]">
          <SplitWords
            parts={[
              "Sistemas que ya están",
              {
                text: "operando todos los días.",
                className: "text-gradient-muted",
                br: true,
              },
            ]}
          />
        </h1>
        <p className="pj-lede mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
          Casos reales: plataformas a medida para clínicas, estaciones,
          panaderías y hoteles, más Hotelus, nuestro producto propio.
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {STATS.map((stat) => (
            <li key={stat.label} className="pj-stat bg-black px-6 py-5">
              <p
                className="pj-stat-value text-3xl font-semibold tracking-[-0.04em] text-white tabular-nums sm:text-4xl"
                data-value={stat.value}
              >
                {stat.value}
              </p>
              <p className="mt-1.5 text-[13px] text-zinc-500">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ProjectsHero;
