import { useRef } from "react";
import { useGsap } from "../../hooks/useGsap";
import { revealWords } from "../../lib/gsap";
import SplitWords from "./SplitWords";
import { DIAGNOSIS_URL, WHATSAPP_URL } from "../WhatsAppFloat";

const CHANNELS = [
  { label: "WhatsApp", value: "Respuesta rápida", href: WHATSAPP_URL, external: true },
  { label: "Teléfono", value: "+54 3865 45-4534", href: "tel:+543865454534" },
  { label: "Email", value: "balturamirez1@gmail.com", href: "mailto:balturamirez1@gmail.com" },
];

function FinalCta() {
  const rootRef = useRef(null);

  useGsap(rootRef, ({ scope, gsap }) => {
    gsap.fromTo(
      ".cta-beam",
      { opacity: 0, scaleX: 0.3, yPercent: 30 },
      {
        opacity: 1,
        scaleX: 1,
        yPercent: 0,
        ease: "none",
        scrollTrigger: { trigger: scope, start: "top bottom", end: "center center", scrub: true },
      },
    );
    revealWords(scope.querySelector(".cta-title"), { start: "top 80%", stagger: 0.06 });
    gsap.from(".cta-fade", {
      opacity: 0,
      y: 24,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.1,
      delay: 0.35,
      scrollTrigger: { trigger: ".cta-title", start: "top 80%", once: true },
    });
  });

  return (
    <section ref={rootRef} id="contacto" className="relative overflow-hidden px-5 pt-32 pb-28 sm:px-8 sm:pt-44 sm:pb-36">
      <span data-section-anchor className="block h-0" />
      <div className="cta-beam pointer-events-none absolute inset-x-0 bottom-0 h-[70%]" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="cta-fade text-[13px] font-medium tracking-[0.24em] text-zinc-500 uppercase">
          Empecemos
        </p>
        <h2 className="cta-title mt-6 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.2rem]">
          <SplitWords
            parts={["¿Listo para ordenar", { text: "tu operación?", className: "text-gradient-muted", br: true, brClassName: "hidden sm:block" }]}
          />
        </h2>
        <p className="cta-fade mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
          En una llamada vemos dónde se pierde tiempo y si hace falta un sistema.
          El diagnóstico no tiene cargo. Si seguimos, lo dejamos operando en tu local.
        </p>
        <div className="cta-fade mt-10 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <a href={DIAGNOSIS_URL} target="_blank" rel="noreferrer" className="btn-primary">
            Pedí un diagnóstico
          </a>
          <a href="mailto:balturamirez1@gmail.com" className="btn-ghost">
            Enviar un email
          </a>
        </div>

        <ul className="cta-fade mt-20 grid w-full gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {CHANNELS.map((channel) => (
            <li key={channel.label} className="bg-black">
              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noreferrer" : undefined}
                className="group flex flex-col items-start gap-1 px-6 py-5 text-left transition hover:bg-white/[0.04]"
              >
                <span className="text-[12px] tracking-[0.16em] text-zinc-500 uppercase">{channel.label}</span>
                <span className="truncate text-[15px] text-zinc-200 group-hover:text-white">{channel.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default FinalCta;
