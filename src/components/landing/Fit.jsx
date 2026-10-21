import { useRef } from "react";
import { useGsap } from "../../hooks/useGsap";
import { DIAGNOSIS_URL } from "../WhatsAppFloat";
import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    n: "01",
    title: "El dato entra",
    text: "Un pedido, un turno, una reserva. Si queda solo en el chat, el equipo lo vuelve a preguntar.",
    hint: "Mostrador · Recepción · WhatsApp",
  },
  {
    n: "02",
    title: "Se usa en el local",
    text: "Producción, caja, agenda o limpieza. Si cada uno tiene una versión, se trabaja dos veces.",
    hint: "Horno · Playero · Consultorio",
  },
  {
    n: "03",
    title: "El día cierra",
    text: "Ventas, ocupación, liquidación. Si hay que armar el cierre a mano, el control llega tarde.",
    hint: "Caja · Reportes · Obras sociales",
  },
];

function Fit() {
  const rootRef = useRef(null);

  useGsap(rootRef, ({ gsap }) => {
    gsap.from(".ft-step", {
      opacity: 0,
      y: 40,
      duration: 1.15,
      ease: "expo.out",
      stagger: 0.12,
      scrollTrigger: { trigger: ".ft-steps", start: "top 82%", once: true },
    });
    gsap.from(".ft-rule", {
      scaleX: 0,
      duration: 1.4,
      ease: "expo.inOut",
      scrollTrigger: { trigger: ".ft-steps", start: "top 82%", once: true },
    });
  });

  return (
    <section ref={rootRef} className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow="El mismo dato"
        title={["Tres momentos.", { text: "Una sola operación.", className: "text-gradient-muted", br: true }]}
        description="No importa el rubro. El día se ordena cuando el dato entra, se usa y se cierra en el mismo lugar. Y cuando la herramienta responde al ritmo del local."
      />

      <div className="ft-steps relative mt-14">
        <span className="ft-rule pointer-events-none absolute top-8 right-8 left-8 hidden h-px origin-left bg-white/10 lg:block" />
        <ol className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          {STEPS.map((step) => (
            <li key={step.n} className="ft-step relative">
              <p className="text-[13px] text-zinc-600 tabular-nums">{step.n}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                {step.title}
              </h3>
              <p className="mt-4 max-w-sm text-[15px] leading-7 text-zinc-400">{step.text}</p>
              <p className="mt-5 text-[12px] tracking-[0.08em] text-zinc-600 uppercase">
                {step.hint}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-lg text-[15px] leading-7 text-zinc-500">
          Un sistema es ese hilo, de punta a punta. Rápido, porque el mostrador no espera.
        </p>
        <a href={DIAGNOSIS_URL} target="_blank" rel="noreferrer" className="btn-ghost group w-fit">
          Pedí un diagnóstico
          <span className="ml-2 transition group-hover:translate-x-0.5">&rarr;</span>
        </a>
      </div>
    </section>
  );
}

export default Fit;
