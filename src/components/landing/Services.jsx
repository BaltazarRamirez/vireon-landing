import { useRef } from "react";
import { useGsap } from "../../hooks/useGsap";
import SectionHeading from "./SectionHeading";

const MODULES = ["Ventas", "Stock", "Turnos", "Clientes", "Caja", "Reportes", "Roles", "Sucursales"];

const FLOW = [
  { title: "Pedido nuevo", meta: "Web · 12:48" },
  { title: "Asignar repartidor", meta: "Automático" },
  { title: "Aviso por WhatsApp", meta: "Enviado al cliente" },
];

const BARS = [42, 58, 49, 71, 64, 88, 79];

const INTEGRATIONS = ["WhatsApp", "Mercado Pago", "Planillas", "Facturación", "APIs"];

function ModulesVisual() {
  return (
    <div className="sv-modules relative mt-10 grid grid-cols-4 gap-2.5">
      {MODULES.map((module, index) => (
        <div
          key={module}
          className={`sv-module flex h-[4.5rem] flex-col justify-between rounded-xl border px-3 py-2.5 ${
            index === 0
              ? "border-white/25 bg-white/[0.09]"
              : "border-white/[0.08] bg-white/[0.03]"
          }`}
        >
          <span className="h-2 w-2 rounded-[3px] border border-white/40" />
          <span className="text-[12px] font-medium text-zinc-300">{module}</span>
        </div>
      ))}
    </div>
  );
}

function FlowVisual() {
  return (
    <div className="relative mt-10 pl-1">
      <span className="sv-flow-line absolute top-4 bottom-4 left-[15px] w-px origin-top bg-linear-to-b from-white/50 via-white/25 to-transparent" />
      <span className="sv-flow-dot absolute left-[11px] h-[9px] w-[9px] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
      <div className="flex flex-col gap-3">
        {FLOW.map((step, index) => (
          <div key={step.title} className="sv-flow-step relative flex items-center gap-4">
            <span className="relative z-10 grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full border border-white/15 bg-black text-[11px] text-zinc-400">
              {index + 1}
            </span>
            <div className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5">
              <p className="text-[13px] font-medium text-zinc-200">{step.title}</p>
              <p className="text-[11px] text-zinc-500">{step.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartVisual() {
  return (
    <div className="mt-10">
      <div className="flex items-baseline justify-between">
        <span className="text-[12px] text-zinc-500">Ventas · últimos 7 días</span>
        <span className="text-[15px] font-semibold text-white">+18,2%</span>
      </div>
      <div className="mt-5 flex h-36 items-end gap-2">
        {BARS.map((value, index) => (
          <span
            key={index}
            className={`sv-bar flex-1 origin-bottom rounded-t-md ${
              index === 5 ? "bg-white" : "bg-white/15"
            }`}
            style={{ height: `${value}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function HubVisual() {
  return (
    <div className="relative mt-8 h-56">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 600 224"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[
          [62, 204],
          [170, 20],
          [300, 204],
          [430, 20],
          [538, 204],
        ].map(([x, y]) => (
          <path
            key={x}
            className="sv-wire"
            d={`M 300 112 C 300 ${y}, ${x} 112, ${x} ${y}`}
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="absolute top-1/2 left-1/2 z-10 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/20 bg-white text-xl font-bold text-black shadow-[0_0_40px_rgba(255,255,255,0.25)]">
        V
      </div>
      {INTEGRATIONS.map((name, index) => {
        const positions = [
          "left-[2%] bottom-[2%]",
          "left-[20%] top-[2%]",
          "left-1/2 -translate-x-1/2 bottom-[2%]",
          "right-[20%] top-[2%]",
          "right-[2%] bottom-[2%]",
        ];
        return (
          <span key={name} className={`absolute ${positions[index]}`}>
            <span className="sv-node inline-block will-change-transform rounded-full border border-white/10 bg-black/80 px-3 py-1.5 text-[12px] text-zinc-300 backdrop-blur">
              {name}
            </span>
          </span>
        );
      })}
    </div>
  );
}

const CARDS = [
  {
    id: "custom",
    span: "lg:col-span-4",
    eyebrow: "01 · Sistemas a medida",
    title: "Una plataforma pensada para cómo trabaja tu negocio.",
    text: "Ventas, stock, turnos, clientes y caja en un solo lugar, con roles para cada persona del equipo.",
    Visual: ModulesVisual,
  },
  {
    id: "automation",
    span: "lg:col-span-2",
    eyebrow: "02 · Automatizaciones",
    title: "Procesos que se hacen solos.",
    text: "Eliminamos tareas repetitivas para que el equipo gane tiempo y cometa menos errores.",
    Visual: FlowVisual,
  },
  {
    id: "reports",
    span: "lg:col-span-2",
    eyebrow: "03 · Control y reportes",
    title: "Decidí con datos, no con intuición.",
    text: "Paneles claros con lo que pasa en tu operación hoy.",
    Visual: ChartVisual,
  },
  {
    id: "integrations",
    span: "lg:col-span-4",
    eyebrow: "04 · Integraciones",
    title: "Todo lo que ya usás, conectado.",
    text: "Pagos, WhatsApp, planillas y otros sistemas trabajando como una sola operación.",
    Visual: HubVisual,
  },
];

function Services() {
  const rootRef = useRef(null);

  useGsap(rootRef, ({ scope, gsap, fine }) => {
    const grid = scope.querySelector(".sv-grid");
    const cards = gsap.utils.toArray(".sv-card");

    gsap.from(cards, {
      opacity: 0,
      y: 110,
      rotateX: 18,
      transformPerspective: 1400,
      transformOrigin: "50% 100%",
      duration: 1.4,
      ease: "expo.out",
      stagger: 0.12,
      scrollTrigger: { trigger: grid, start: "top 82%", once: true },
    });

    const visualTrigger = (el) => ({ trigger: el.closest(".sv-card") ?? el, start: "top 92%", once: true });

    gsap.from(".sv-module", {
      opacity: 0,
      scale: 0.6,
      y: () => gsap.utils.random(-60, 60),
      x: () => gsap.utils.random(-80, 80),
      rotate: () => gsap.utils.random(-25, 25),
      duration: 1.3,
      ease: "expo.out",
      stagger: { each: 0.05, from: "random" },
      scrollTrigger: visualTrigger(scope.querySelector(".sv-modules")),
    });

    gsap.from(".sv-flow-line", {
      scaleY: 0,
      duration: 1.4,
      ease: "power3.inOut",
      scrollTrigger: visualTrigger(scope.querySelector(".sv-flow-line")),
    });
    gsap.from(".sv-flow-step", {
      opacity: 0,
      x: 24,
      duration: 1,
      ease: "expo.out",
      stagger: 0.18,
      scrollTrigger: visualTrigger(scope.querySelector(".sv-flow-line")),
    });
    gsap.fromTo(
      ".sv-flow-dot",
      { top: "8%", opacity: 0 },
      {
        keyframes: [
          { opacity: 1, duration: 0.2 },
          { top: "86%", duration: 2.2, ease: "power1.inOut" },
          { opacity: 0, duration: 0.3 },
        ],
        repeat: -1,
        repeatDelay: 0.6,
        delay: 1.2,
      },
    );

    gsap.from(".sv-bar", {
      scaleY: 0,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.07,
      scrollTrigger: visualTrigger(scope.querySelector(".sv-bar")),
    });

    scope.querySelectorAll(".sv-wire").forEach((wire) => {
      const length = wire.getTotalLength();
      gsap.fromTo(
        wire,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          scrollTrigger: visualTrigger(wire.closest("svg")),
        },
      );
    });
    const nodes = gsap.utils.toArray(".sv-node");
    gsap.from(nodes, {
      opacity: 0,
      scale: 0.7,
      duration: 0.9,
      ease: "back.out(2)",
      stagger: 0.08,
      delay: 0.7,
      scrollTrigger: visualTrigger(nodes[0]),
    });
    nodes.forEach((node, index) => {
      const drift = [
        { x: 6, y: -14 },
        { x: -7, y: 11 },
        { x: 5, y: -12 },
        { x: 8, y: 10 },
        { x: -6, y: -13 },
      ][index];
      gsap.to(node, {
        x: drift.x,
        y: drift.y,
        duration: 2.4 + index * 0.35,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.2 * index,
      });
    });

    if (!fine) {
      return undefined;
    }

    const onMove = (event) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };
    grid.addEventListener("pointermove", onMove);
    return () => grid.removeEventListener("pointermove", onMove);
  });

  return (
    <section ref={rootRef} id="servicios" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <span data-section-anchor className="block h-0" />
      <SectionHeading
        eyebrow="Servicios"
        title={["Todo lo que tu operación necesita,", { text: "en un solo sistema.", className: "text-gradient-muted" }]}
        description="Construimos herramientas a medida que bajan a tierra tu operación y la vuelven simple de gestionar."
      />

      <div className="sv-grid mt-16 grid gap-4 lg:grid-cols-6">
        {CARDS.map(({ id, span, eyebrow, title, text, Visual }) => (
          <article key={id} className={`sv-card bento-card ${span}`}>
            <p className="text-[12px] font-medium tracking-[0.16em] text-zinc-500 uppercase">
              {eyebrow}
            </p>
            <h3 className="mt-4 max-w-md text-2xl leading-tight font-semibold tracking-[-0.03em] text-white">
              {title}
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-6 text-zinc-400">{text}</p>
            <Visual />
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
