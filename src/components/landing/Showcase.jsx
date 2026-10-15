import { useRef } from "react";
import { featuredProjects, flagshipProject } from "../../data/projects";
import { projectScreens } from "../../data/screens";
import { useGsap } from "../../hooks/useGsap";
import AppScreen from "./AppScreen";
import ScaledFrame from "./ScaledFrame";
import SectionHeading from "./SectionHeading";

const byId = (id) => featuredProjects.find((project) => project.id === id);
const withGallery = (id, slug) => ({ project: byId(id), gallery: byId(id).gallery, slug });

const SHOWCASE = [
  { project: flagshipProject, screen: projectScreens.hotelus },
  withGallery("vida-plena", "vidaplena/dashboard"),
  withGallery("llorens-group", "llorens/reportes"),
  { project: byId("molinos-combustibles"), image: "/molinos-reportes.png", slug: "molinos/reportes" },
  withGallery("campos-de-trigo", "campos/panel"),
  { project: byId("hotel-totem-boutique"), screen: projectScreens["hotel-totem-boutique"] },
];

function GalleryWindow({ images, slug }) {
  return (
    <div className="flex h-full w-full flex-col bg-[#09090b]">
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-white/[0.06] px-4">
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="mx-auto rounded-md border border-white/[0.06] bg-white/[0.03] px-24 py-1 text-[12px] text-zinc-500">
          app.vireon.dev/{slug}
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {images.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className={`sc-shot-i absolute inset-0 h-full w-full object-cover object-top ${
              index > 0 ? "[clip-path:inset(0_0_0_100%)]" : ""
            }`}
          />
        ))}
        <div className="absolute right-5 bottom-5 z-10 flex gap-1.5 rounded-full border border-white/10 bg-black/70 px-2.5 py-2 backdrop-blur">
          {images.map((image, index) => (
            <span key={image.src} className="relative h-1 w-6 overflow-hidden rounded-full bg-white/20">
              <span
                className={`sc-dot absolute inset-0 origin-left rounded-full bg-white ${
                  index > 0 ? "scale-x-0" : ""
                }`}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenshotWindow({ src, alt, slug }) {
  return (
    <div className="flex h-full w-full flex-col bg-[#09090b]">
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-white/[0.06] px-4">
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="mx-auto rounded-md border border-white/[0.06] bg-white/[0.03] px-24 py-1 text-[12px] text-zinc-500">
          app.vireon.dev/{slug}
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#f4f7fb]">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="sc-shot absolute top-0 left-1/2 w-[86%] max-w-none -translate-x-1/2"
        />
      </div>
    </div>
  );
}

function ShowcasePanel({ item, index, total, onOpen }) {
  const { project } = item;

  return (
    <article className="sc-panel flex w-full shrink-0 flex-col gap-8 lg:w-[min(84vw,1180px)] lg:flex-row lg:items-center lg:gap-12">
      <div className="sc-info lg:w-[34%]">
        <p className="text-[12px] font-medium tracking-[0.2em] text-zinc-500 uppercase tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {project.category}
        </p>
        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2.6rem] sm:leading-[1.05]">
          {project.name}
        </h3>
        <p className="mt-4 text-[15px] leading-7 text-zinc-400">{project.tagline}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.slice(0, 5).map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[12px] text-zinc-400"
            >
              {tag}
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => onOpen(project)} className="btn-ghost group mt-8">
          Ver el caso
          <span className="ml-2 transition group-hover:translate-x-0.5">&rarr;</span>
        </button>
      </div>

      <div className="sc-stage lg:w-[66%] lg:max-w-[calc((100vh-22rem)*1.5)] [perspective:1800px]">
        <div className="sc-screen device-frame origin-[0%_50%]">
          <ScaledFrame width={1200} height={item.gallery ? 680 : item.image ? 760 : 800}>
            {item.gallery ? (
              <GalleryWindow images={item.gallery} slug={item.slug} />
            ) : item.image ? (
              <ScreenshotWindow src={item.image} alt={`Sistema ${project.name}`} slug={item.slug} />
            ) : (
              <AppScreen screen={item.screen} />
            )}
          </ScaledFrame>
        </div>
      </div>
    </article>
  );
}

function galleryTimeline(gsap, panel) {
  const shots = panel.querySelectorAll(".sc-shot-i");
  if (shots.length < 2) {
    return null;
  }

  const dots = panel.querySelectorAll(".sc-dot");
  const tl = gsap.timeline({ defaults: { ease: "none" } });
  shots.forEach((shot, index) => {
    if (index === 0) {
      return;
    }
    tl.fromTo(
      shot,
      { clipPath: "inset(0% 0% 0% 100%)", scale: 1.06 },
      { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1 },
      ">+0.35",
    ).fromTo(dots[index], { scaleX: 0 }, { scaleX: 1, duration: 1 }, "<");
  });
  return tl;
}

function skipShowcase() {
  const target = document.getElementById("metricas");
  if (!target) {
    return;
  }

  const top = Math.max(0, Math.round(target.getBoundingClientRect().top + window.scrollY));
  window.dispatchEvent(new CustomEvent("lenis:scrollTo", { detail: { top } }));
}

function Showcase({ onOpenProject }) {
  const rootRef = useRef(null);

  useGsap(rootRef, ({ scope, desktop, gsap, ScrollTrigger }) => {
    const panels = gsap.utils.toArray(".sc-panel");

    gsap.to(".sc-skip-icon", {
      y: 5,
      duration: 0.95,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

    if (!desktop) {
      panels.forEach((panel) => {
        const gallery = galleryTimeline(gsap, panel);
        if (gallery) {
          ScrollTrigger.create({
            trigger: panel.querySelector(".sc-screen"),
            start: "top 65%",
            end: "bottom 10%",
            scrub: true,
            animation: gallery,
          });
        }
        gsap.from(panel.querySelector(".sc-screen"), {
          opacity: 0,
          y: 70,
          rotateX: 16,
          transformPerspective: 1200,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: panel, start: "top 80%", once: true },
        });
      });
      return undefined;
    }

    const track = scope.querySelector(".sc-track");
    const distance = () => track.scrollWidth - window.innerWidth;
    const bar = scope.querySelector(".sc-progress-fill");

    const scroll = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: scope.querySelector(".sc-pin"),
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${distance()}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
      },
    });

    panels.forEach((panel, index) => {
      const screen = panel.querySelector(".sc-screen");
      const info = panel.querySelector(".sc-info");

      if (index > 0) {
        gsap.fromTo(
          screen,
          { rotateY: -28, scale: 0.82, opacity: 0.35 },
          {
            rotateY: 0,
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scroll,
              start: "left 95%",
              end: "left 25%",
              scrub: true,
            },
          },
        );
        gsap.from(info, {
          opacity: 0,
          x: 80,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scroll,
            start: "left 85%",
            end: "left 35%",
            scrub: true,
          },
        });
      }

      gsap.to(screen, {
        rotateY: 18,
        scale: 0.86,
        opacity: 0.3,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: panel,
          containerAnimation: scroll,
          start: "right 55%",
          end: "right 0%",
          scrub: true,
        },
      });

      const gallery = galleryTimeline(gsap, panel);
      if (gallery) {
        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: scroll,
          start: "left 40%",
          end: "left -22%",
          scrub: true,
          animation: gallery,
        });
      }

      const shot = panel.querySelector(".sc-shot");
      if (shot) {
        gsap.to(shot, {
          yPercent: -58,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scroll,
            start: "left 60%",
            end: "right 40%",
            scrub: true,
          },
        });
      }
    });

    return undefined;
  });

  return (
    <section ref={rootRef} id="clientes" className="relative">
      <span data-section-anchor className="block h-0" />
      <div className="sc-pin relative flex flex-col overflow-hidden lg:h-screen lg:pt-[calc(var(--site-header-h,7.5rem)+2rem)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 pt-24 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:pt-0">
          <SectionHeading
            eyebrow="Casos reales"
            title={["Sistemas que ya están", { text: "operando todos los días.", className: "text-gradient-muted" }]}
          />
          <div className="flex shrink-0 items-end justify-between gap-8 pb-1 lg:w-64 lg:flex-col lg:items-stretch lg:justify-end">
            <div className="hidden lg:block">
              <div className="h-px w-full bg-white/10">
                <div className="sc-progress-fill h-px w-full origin-left scale-x-0 bg-white" />
              </div>
              <p className="mt-3 text-[12px] text-zinc-500">Deslizá para recorrer los proyectos</p>
            </div>
            <button
              type="button"
              onClick={skipShowcase}
              className="group inline-flex items-center gap-3 text-[13px] text-zinc-400 transition hover:text-white"
            >
              Saltar esta sección
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 transition group-hover:border-white/40 group-hover:bg-white/16">
                <svg
                  className="sc-skip-icon h-4 w-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 6.5 8 11.5 13 6.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div className="sc-viewport mt-12 flex-1 lg:mt-10 lg:flex lg:items-center">
          <div className="sc-track flex flex-col gap-20 px-5 pb-24 sm:px-8 lg:flex-row lg:gap-[8vw] lg:pr-[10vw] lg:pb-0 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
            {SHOWCASE.map((item, index) => (
              <ShowcasePanel
                key={item.project.id}
                item={item}
                index={index}
                total={SHOWCASE.length}
                onOpen={onOpenProject}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Showcase;
