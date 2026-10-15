import { useRef } from "react";
import founderPhoto from "../../assets/founder.jpg";
import { useGsap } from "../../hooks/useGsap";
import SectionHeading from "./SectionHeading";

const VALUES = [
  {
    title: "Desde el problema",
    text: "Partimos de cómo opera tu equipo hoy, no de una plantilla genérica.",
  },
  {
    title: "Producto usable",
    text: "Interfaces simples para que el equipo opere sin fricción desde el primer día.",
  },
  {
    title: "Base para crecer",
    text: "Sistemas listos para sumar sucursales, roles, reportes y nuevas necesidades.",
  },
  {
    title: "Cerca del negocio",
    text: "Trabajamos desde Tucumán. Vamos al local, vemos el turno, el tanque o la agenda, y recién ahí diseñamos.",
  },
];

const FOUNDER = {
  name: "Baltazar Ramirez",
  role: "Founder · Vireon",
  quote:
    "Cada sistema que desarrollamos nace de entender cómo funciona un negocio por dentro. Nuestro trabajo es transformar procesos complejos en herramientas simples de usar.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/baltazar-ramirez-b211aa22a/", external: true },
    { label: "Email", href: "mailto:balturamirez1@gmail.com" },
    { label: "+54 3865 45-4534", href: "tel:+543865454534" },
  ],
};

function About() {
  const rootRef = useRef(null);

  useGsap(rootRef, ({ scope, gsap }) => {
    gsap.from(".ab-value", {
      opacity: 0,
      y: 30,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.12,
      scrollTrigger: { trigger: ".ab-values", start: "top 82%", once: true },
    });
    gsap.from(".ab-rule", {
      scaleX: 0,
      duration: 1.3,
      ease: "expo.inOut",
      stagger: 0.12,
      scrollTrigger: { trigger: ".ab-values", start: "top 82%", once: true },
    });

    const photo = scope.querySelector(".ab-photo");
    gsap.fromTo(
      photo,
      { clipPath: "inset(18% 12% 18% 12% round 2rem)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 2rem)",
        ease: "none",
        scrollTrigger: { trigger: photo, start: "top 90%", end: "top 35%", scrub: true },
      },
    );
    gsap.fromTo(
      ".ab-photo img",
      { scale: 1.3, yPercent: -6 },
      {
        scale: 1,
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
    gsap.from(".ab-card", {
      opacity: 0,
      y: 60,
      duration: 1.3,
      ease: "expo.out",
      scrollTrigger: { trigger: photo, start: "top 55%", once: true },
    });
  });

  return (
    <section ref={rootRef} id="nosotros" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <span data-section-anchor className="block h-0" />
      <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Sobre nosotros"
            title={["Entendemos tu operación", { text: "antes de escribir código.", className: "text-gradient-muted" }]}
            description="No trabajamos por plantilla ni desde otra provincia. Vemos cómo opera tu equipo y diseñamos herramientas claras, listas para el mostrador."
          />
          <ul className="ab-values mt-14 flex flex-col">
            {VALUES.map((value, index) => (
              <li key={value.title} className="ab-value py-6">
                <span className="ab-rule mb-6 block h-px w-full origin-left bg-white/10" />
                <div className="flex gap-6">
                  <span className="text-[13px] text-zinc-600 tabular-nums">0{index + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-white">{value.title}</h3>
                    <p className="mt-2 text-[15px] leading-6 text-zinc-400">{value.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:pt-24">
          <div className="ab-photo relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-900">
            <img
              src={founderPhoto}
              alt={FOUNDER.name}
              loading="lazy"
              className="h-full w-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
          </div>
          <div className="ab-card relative z-10 mx-4 -mt-40 rounded-3xl border border-white/10 bg-black/70 p-7 backdrop-blur-xl sm:mx-8 sm:p-8">
            <p className="text-[17px] leading-7 text-zinc-200">“{FOUNDER.quote}”</p>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-semibold text-white">{FOUNDER.name}</p>
                <p className="text-[13px] text-zinc-500">{FOUNDER.role}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {FOUNDER.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-zinc-300 transition hover:border-white/30 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
