import { useRef } from "react";
import { featuredProjects, flagshipProject } from "../../data/projects";
import { projectScreens } from "../../data/screens";
import { useGsap } from "../../hooks/useGsap";
import { countUp } from "../../lib/gsap";
import AppScreen from "./AppScreen";
import ScaledFrame from "./ScaledFrame";

const byId = (id) => featuredProjects.find((project) => project.id === id);

const CASES = [
  {
    project: flagshipProject,
    screen: projectScreens.hotelus,
    slug: "hotelus/cadena",
    featured: true,
  },
  {
    project: byId("vida-plena"),
    gallery: byId("vida-plena").gallery,
    slug: "vidaplena/dashboard",
  },
  {
    project: byId("llorens-group"),
    gallery: byId("llorens-group").gallery,
    slug: "llorens/reportes",
  },
  {
    project: byId("molinos-combustibles"),
    image: "/molinos-reportes.png",
    slug: "molinos/reportes",
  },
  {
    project: byId("campos-de-trigo"),
    gallery: byId("campos-de-trigo").gallery,
    slug: "campos/panel",
  },
  {
    project: byId("hotel-totem-boutique"),
    screen: projectScreens["hotel-totem-boutique"],
    slug: "totem/hotel",
  },
];

function Chrome({ slug, children }) {
  return (
    <div className="flex h-full w-full flex-col bg-[#09090b]">
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-white/[0.06] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="mx-auto max-w-[70%] truncate rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] text-zinc-500 sm:px-8">
          app.vireon.dev/{slug}
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function GalleryVisual({ images, slug }) {
  return (
    <Chrome slug={slug}>
      {images.map((image, index) => (
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className={`pj-shot-i absolute inset-0 h-full w-full object-cover object-top ${
            index > 0 ? "[clip-path:inset(0_0_0_100%)]" : ""
          }`}
        />
      ))}
      {images.length > 1 ? (
        <div className="absolute right-4 bottom-4 z-10 flex gap-1.5 rounded-full border border-white/10 bg-black/70 px-2.5 py-2 backdrop-blur">
          {images.map((image, index) => (
            <span key={image.src} className="relative h-1 w-5 overflow-hidden rounded-full bg-white/20">
              <span
                className={`pj-dot absolute inset-0 origin-left rounded-full bg-white ${
                  index > 0 ? "scale-x-0" : ""
                }`}
              />
            </span>
          ))}
        </div>
      ) : null}
    </Chrome>
  );
}

function ImageVisual({ src, alt, slug }) {
  return (
    <Chrome slug={slug}>
      <div className="relative h-full overflow-hidden bg-[#f4f7fb]">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="pj-shot absolute top-0 left-1/2 w-[88%] max-w-none -translate-x-1/2"
        />
      </div>
    </Chrome>
  );
}

function CaseVisual({ item }) {
  const height = item.gallery ? 680 : item.image ? 740 : 800;

  return (
    <div className="pj-stage relative [perspective:1600px]">
      <div className="pr-visual-glow pointer-events-none absolute -inset-8 rounded-[2rem]" aria-hidden="true" />
      <div className="pj-screen device-frame origin-[50%_100%]">
        <ScaledFrame width={1200} height={height}>
          {item.gallery ? (
            <GalleryVisual images={item.gallery} slug={item.slug} />
          ) : item.image ? (
            <ImageVisual src={item.image} alt={`Sistema ${item.project.name}`} slug={item.slug} />
          ) : (
            <AppScreen screen={item.screen} />
          )}
        </ScaledFrame>
      </div>
    </div>
  );
}

function CaseInfo({ item, index, onOpen }) {
  const { project, featured } = item;
  const number = featured ? "Producto" : String(index).padStart(2, "0");

  return (
    <div className="pj-info relative min-w-0">
      <p className="text-[12px] font-medium tracking-[0.2em] text-zinc-500 uppercase tabular-nums">
        {number} · {project.category}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-[2.7rem] sm:leading-[1.05]">
        {project.name}
      </h2>
      <p className="mt-4 max-w-md text-[15px] leading-7 text-zinc-400">{project.tagline}</p>

      {featured && project.highlights ? (
        <ul className="mt-6 grid grid-cols-2 gap-2">
          {project.highlights.map((itemText) => (
            <li
              key={itemText}
              className="pj-highlight rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-2.5 text-[13px] text-zinc-300"
            >
              {itemText}
            </li>
          ))}
        </ul>
      ) : null}

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
        {featured ? "Ver Hotelus" : "Ver el caso"}
        <span className="ml-2 transition group-hover:translate-x-0.5">&rarr;</span>
      </button>
    </div>
  );
}

function animateGallery(gsap, card) {
  const shots = card.querySelectorAll(".pj-shot-i");
  if (shots.length < 2) {
    return;
  }

  const dots = card.querySelectorAll(".pj-dot");
  const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.1, paused: true });
  shots.forEach((shot, index) => {
    if (index === 0) {
      return;
    }
    loop
      .fromTo(
        shot,
        { clipPath: "inset(0% 0% 0% 100%)", scale: 1.04 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.05, ease: "power3.inOut" },
      )
      .fromTo(dots[index], { scaleX: 0 }, { scaleX: 1, duration: 1.05, ease: "power3.inOut" }, "<");
  });
  loop.set(
    shots,
    {
      clipPath: (i) => (i === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)"),
      scale: 1,
    },
    "+=1.2",
  );
  loop.set(dots, { scaleX: (i) => (i === 0 ? 1 : 0) });

  return loop;
}

function animateMockup(gsap, card) {
  const cards = card.querySelectorAll(".as-card");
  if (!cards.length) {
    return null;
  }

  const tl = gsap.timeline({ paused: true });
  tl.from(cards, { opacity: 0, y: 16, duration: 0.85, stagger: 0.05, ease: "expo.out" });
  card.querySelectorAll(".as-count").forEach((el, index) => {
    tl.add(countUp(el, { duration: 1.5 }), 0.12 + index * 0.05);
  });
  const bars = card.querySelectorAll(".as-bar");
  if (bars.length) {
    tl.from(bars, { scaleX: 0, duration: 1.1, stagger: 0.06, ease: "expo.out" }, 0.25);
  }
  const rows = card.querySelectorAll(".as-row");
  if (rows.length) {
    tl.from(rows, { opacity: 0, x: -10, duration: 0.6, stagger: 0.05, ease: "expo.out" }, 0.35);
  }
  return tl;
}

function ProjectCases({ onOpenProject }) {
  const rootRef = useRef(null);

  useGsap(rootRef, ({ scope, fine, gsap, ScrollTrigger }) => {
    const cases = gsap.utils.toArray(".pj-case");

    cases.forEach((card) => {
      const trigger = { trigger: card, start: "top 88%", once: true };
      gsap.from(card.querySelector(".pj-info > *"), {
        opacity: 0,
        y: 22,
        duration: 1,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: trigger,
      });
      gsap.from(card.querySelector(".pj-screen"), {
        opacity: 0,
        y: 70,
        rotateX: 14,
        transformPerspective: 1400,
        duration: 1.35,
        ease: "expo.out",
        scrollTrigger: trigger,
      });

      const gallery = animateGallery(gsap, card);
      if (gallery) {
        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          once: true,
          onEnter: () => gallery.play(),
        });
      }

      const mockup = animateMockup(gsap, card);
      if (mockup) {
        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          once: true,
          onEnter: () => mockup.play(),
        });
      }

      const shot = card.querySelector(".pj-shot");
      if (shot) {
        gsap.to(shot, {
          yPercent: -36,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      ScrollTrigger.create({
        trigger: card,
        start: "top 42%",
        end: "bottom 42%",
        onToggle: (self) => {
          if (!self.isActive) {
            return;
          }
          scope.querySelectorAll("[data-chip]").forEach((chip) => {
            chip.classList.toggle("is-active", chip.getAttribute("data-chip") === card.id);
          });
        },
      });
    });

    if (!fine) {
      return undefined;
    }

    const cleanups = cases.map((card) => {
      const stage = card.querySelector(".pj-stage");
      const screen = card.querySelector(".pj-screen");
      if (!stage || !screen) {
        return () => {};
      }

      const xTo = gsap.quickTo(screen, "rotateY", { duration: 0.55, ease: "power3" });
      const yTo = gsap.quickTo(screen, "rotateX", { duration: 0.55, ease: "power3" });

      const onMove = (event) => {
        const rect = stage.getBoundingClientRect();
        xTo(((event.clientX - rect.left) / rect.width - 0.5) * 7);
        yTo(((event.clientY - rect.top) / rect.height - 0.5) * -5);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerleave", onLeave);
      return () => {
        stage.removeEventListener("pointermove", onMove);
        stage.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  });

  return (
    <div ref={rootRef}>
      <div className="border-y border-white/[0.06]">
        <nav
          className="pj-index mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 py-3 sm:px-8"
          aria-label="Proyectos"
        >
          {CASES.map((item, index) => (
            <a
              key={item.project.id}
              href={`#caso-${item.project.id}`}
              data-chip={`caso-${item.project.id}`}
              className={`pj-chip ${index === 0 ? "is-active" : ""}`}
            >
              {item.project.name}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {CASES.map((item, index) => {
          const clientNumber = item.featured ? 0 : index;
          const reversed = !item.featured && clientNumber % 2 === 0;

          return (
            <article
              key={item.project.id}
              id={`caso-${item.project.id}`}
              className={`pj-case scroll-mt-[calc(var(--site-header-h,7.5rem)+1.5rem)] border-b border-white/[0.06] py-20 sm:py-28 ${
                item.featured ? "pt-16 sm:pt-24" : ""
              }`}
            >
              {item.featured ? (
                <div className="bento-card pr-surface grid grid-cols-1 items-center gap-10 p-5 sm:p-10 lg:grid-cols-[minmax(17rem,0.78fr)_1.4fr] lg:gap-12">
                  <CaseInfo item={item} index={0} onOpen={onOpenProject} />
                  <CaseVisual item={item} />
                </div>
              ) : (
                <div
                  className={`grid grid-cols-1 items-center gap-10 lg:gap-14 ${
                    reversed ? "lg:grid-cols-[1.35fr_0.8fr]" : "lg:grid-cols-[0.8fr_1.35fr]"
                  }`}
                >
                  <div className={reversed ? "lg:order-2" : ""}>
                    <CaseInfo item={item} index={clientNumber} onOpen={onOpenProject} />
                  </div>
                  <div className={reversed ? "lg:order-1" : ""}>
                    <CaseVisual item={item} />
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectCases;
