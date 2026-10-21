import { useRef } from "react";
import { useGsap } from "../../hooks/useGsap";
import SectionHeading from "./SectionHeading";

const VOICES = [
  {
    quote:
      "Lo que más nos complicaba eran las autorizaciones. Se vencían y nos enterábamos tarde. Ahora administración y los profesionales ven lo mismo, y eso ya no se escapa.",
    name: "Vida Plena",
    detail: "Instituto de Rehabilitación Integral",
  },
  {
    quote:
      "Con tres sucursales, para saber cómo había cerrado cada una había que pedir el Excel. Ahora miro ventas, stock y el turno junto, el mismo día.",
    name: "Llorens Group",
    detail: "Simoca · Villa Quinteros · Concepción",
  },
  {
    quote:
      "Son como 120 pedidos por día. Antes se armaba todo a mano y se mezclaba el mostrador con el reparto. Ahora cada uno ve su parte y no se pisan.",
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
        eyebrow="Clientes"
        title={["Lo que nos dicen", { text: "cuando ya está andando.", className: "text-gradient-muted" }]}
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
