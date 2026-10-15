import { useRef } from "react";
import { useGsap } from "../../hooks/useGsap";
import SectionHeading from "./SectionHeading";

const VOICES = [
  {
    quote:
      "Toda la clínica en un solo lugar: pacientes, agenda, autorizaciones y obras sociales. Sin planillas sueltas ni vencimientos que se escapan.",
    name: "Vida Plena",
    detail: "Instituto de Rehabilitación Integral",
  },
  {
    quote:
      "Tres sucursales, un sistema. Ventas, stock y cierres de turno se ven juntos, no sucursal por sucursal en un Excel.",
    name: "Llorens Group",
    detail: "Simoca · Villa Quinteros · Concepción",
  },
  {
    quote:
      "120 pedidos por día, con producción y reparto en la misma plataforma. El mostrador, el horno y el repartidor trabajan con el mismo dato.",
    name: "Campos de Trigo",
    detail: "Panadería",
  },
];

function Voices() {
  const rootRef = useRef(null);

  useGsap(rootRef, ({ gsap }) => {
    gsap.from(".vc-card", {
      opacity: 0,
      y: 40,
      duration: 1.15,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true },
    });
  });

  return (
    <section ref={rootRef} id="voces" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow="Lo que cambió"
        title={["La operación,", { text: "en boca de quien la vive.", className: "text-gradient-muted", br: true }]}
      />

      <ul className="mt-14 grid gap-5 lg:grid-cols-3">
        {VOICES.map((voice) => (
          <li
            key={voice.name}
            className="vc-card flex flex-col rounded-[1.75rem] border border-white/[0.08] bg-white/[0.03] p-7"
          >
            <p className="flex-1 text-[16px] leading-7 text-zinc-200">“{voice.quote}”</p>
            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="font-semibold text-white">{voice.name}</p>
              <p className="mt-1 text-[13px] text-zinc-500">{voice.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Voices;
