import { useRef } from "react";
import benjaminPhoto from "../../assets/benjamin.jpg";
import baltazarPhoto from "../../assets/founder.jpg";
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

const TEAM = [
  {
    name: "Baltazar Ramirez",
    role: "Founder · Full Stack Engineer",
    photo: baltazarPhoto,
    photoPosition: "50% 8%",
    quote:
      "Cada sistema que desarrollamos nace de entender cómo funciona un negocio por dentro. Nuestro trabajo es transformar procesos complejos en herramientas simples de usar.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/baltazar-ramirez-b211aa22a/", external: true },
      { label: "Email", href: "mailto:balturamirez1@gmail.com" },
      { label: "+54 3865 45-4534", href: "tel:+543865454534" },
    ],
  },
  {
    name: "Benjamin D. Pinto",
    role: "Co-Founder · Industrial Engineer",
    photo: benjaminPhoto,
    photoPosition: "50% 42%",
    quote:
      "Primero el proceso. Después la herramienta. Si el flujo no está claro, no hay sistema que sirva. Siempre acompañando al equipo para que se sienta parte del proceso.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/benjamin-d%E2%80%99pinto-857015306/", external: true },
      { label: "Email", href: "mailto:benjamindpinto@gmail.com" },
      { label: "+54 381 496-9341", href: "tel:+543814969341" },
    ],
  },
];

function About() {
  const rootRef = useRef(null);

  useGsap(rootRef, ({ scope, gsap }) => {
    gsap.from(".ab-member", {
      opacity: 0,
      y: 48,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.12,
      scrollTrigger: { trigger: ".ab-team", start: "top 82%", once: true },
    });

    scope.querySelectorAll(".ab-photo").forEach((photo) => {
      gsap.fromTo(
        photo,
        { clipPath: "inset(14% 10% 14% 10% round 1.5rem)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
          ease: "none",
          scrollTrigger: { trigger: photo, start: "top 90%", end: "top 40%", scrub: true },
        },
      );
      gsap.fromTo(
        photo.querySelector("img"),
        { scale: 1.12 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    gsap.from(".ab-value", {
      opacity: 0,
      y: 30,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: { trigger: ".ab-values", start: "top 86%", once: true },
    });
    gsap.from(".ab-rule", {
      scaleX: 0,
      duration: 1.3,
      ease: "expo.inOut",
      stagger: 0.1,
      scrollTrigger: { trigger: ".ab-values", start: "top 86%", once: true },
    });
  });

  return (
    <section ref={rootRef} id="nosotros" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <span data-section-anchor className="block h-0" />
      <SectionHeading
        eyebrow="El equipo"
        title={["Entendemos tu operación", { text: "antes de escribir código.", className: "text-gradient-muted" }]}
        description="Ingeniería de procesos y producto, juntos. Vemos cómo opera tu equipo y diseñamos herramientas claras, listas para el mostrador."
      />

      <div className="ab-team mt-10 grid grid-cols-2 items-start gap-3 sm:mt-12 sm:gap-5 lg:gap-6">
        {TEAM.map((member) => (
          <article key={member.name} className="ab-member">
            <div className="ab-photo relative h-[16.5rem] overflow-hidden rounded-[1.25rem] bg-zinc-900 sm:h-[21rem] sm:rounded-[1.75rem] lg:h-[24rem]">
              <img
                src={member.photo}
                alt={member.name}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[45%]"
                style={{ objectPosition: member.photoPosition }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/25 to-transparent" />
            </div>
            <div className="ab-card relative z-10 mx-1.5 -mt-14 rounded-2xl border border-white/10 bg-black/75 p-3.5 backdrop-blur-xl sm:mx-4 sm:-mt-16 sm:rounded-3xl sm:p-6">
              <p className="text-[13px] leading-5 text-zinc-200 sm:text-[15px] sm:leading-7">
                “{member.quote}”
              </p>
              <div className="mt-4">
                <p className="text-[13px] font-semibold text-white sm:text-[15px]">{member.name}</p>
                <p className="mt-0.5 text-[11px] text-zinc-500 sm:text-[13px]">{member.role}</p>
                {member.links.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {member.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noreferrer" : undefined}
                        className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-zinc-300 transition hover:border-white/30 hover:text-white sm:px-3 sm:py-1.5 sm:text-[12px]"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      <ul className="ab-values mt-16 grid sm:mt-20 sm:grid-cols-2 sm:gap-x-12">
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
    </section>
  );
}

export default About;
