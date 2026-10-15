import { useRef } from "react";
import { useGsap } from "../../hooks/useGsap";
import SectionHeading from "./SectionHeading";

function Window({ label, status, children }) {
  return (
    <div className="pr-window relative overflow-hidden rounded-2xl border border-white/[0.09] bg-black/60 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="ml-3 text-[12px] text-zinc-500">{label}</span>
        {status ? <span className="ml-auto text-[11px] text-zinc-500">{status}</span> : null}
      </div>
      <div className="relative p-5">{children}</div>
    </div>
  );
}

const AUDIT = [
  { name: "Pedidos por WhatsApp", tag: "Manual" },
  { name: "Stock en planilla", tag: "Cuello de botella", critical: true },
  { name: "Cierre de caja en papel", tag: "Manual" },
  { name: "Reportes a fin de mes", tag: "Sin datos", critical: true },
];

function DiagnosisVisual() {
  return (
    <Window label="Relevamiento" status="4 procesos">
      <span className="pr-scan pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-linear-to-b from-transparent via-white/[0.07] to-transparent" />
      <ul className="flex flex-col gap-2.5">
        {AUDIT.map((item) => (
          <li
            key={item.name}
            className="pr-item flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3"
          >
            <span className="flex items-center gap-3 text-[14px] text-zinc-200">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              {item.name}
            </span>
            <span
              className={`pr-tag rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${
                item.critical
                  ? "bg-rose-400/10 text-rose-300 ring-rose-400/25"
                  : "bg-amber-400/10 text-amber-300 ring-amber-400/20"
              }`}
            >
              {item.tag}
            </span>
          </li>
        ))}
      </ul>
      <div className="pr-item mt-4 flex items-center justify-between text-[12px] text-zinc-500">
        <span>Prioridad sugerida</span>
        <span className="text-zinc-200">Stock → Caja → Reportes</span>
      </div>
    </Window>
  );
}

function PrototypeVisual() {
  return (
    <Window label="Prototipo · v2" status="En revisión">
      <div className="relative flex h-[15.5rem] gap-3">
        <div className="pr-block flex w-16 flex-col gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] p-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`h-2 rounded ${i === 0 ? "bg-white/40" : "bg-white/10"}`} />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="pr-block flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
            <span className="h-2 w-24 rounded bg-white/25" />
            <span className="pr-target rounded-md bg-white px-2.5 py-1 text-[10px] font-semibold text-black">
              Nuevo turno
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="pr-block min-w-0 rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
                <span className="block h-1.5 w-10 max-w-full rounded bg-white/15" />
                <span className="mt-3 block h-3 w-14 max-w-full rounded bg-white/35" />
              </div>
            ))}
          </div>
          <div className="pr-block flex flex-1 flex-col justify-around rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2">
            {[80, 64, 72, 50].map((w) => (
              <span key={w} className="h-1.5 rounded bg-white/10" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>

        <svg
          className="pr-cursor pointer-events-none absolute top-0 left-0 z-10 h-5 w-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M4 2l16 9.5-7 1.6L9.6 20z" fill="#fff" stroke="#000" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
        <span className="pr-approved absolute right-3 bottom-3 z-10 rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-400/30 backdrop-blur">
          ✓ Validado por el equipo
        </span>
      </div>
    </Window>
  );
}

const SPRINTS = [
  { name: "Ventas y stock", value: 100 },
  { name: "Turnos y caja", value: 100 },
  { name: "Reportes", value: 64 },
];

const COMMITS = ["feat: cierre de turno por sucursal", "fix: alerta de stock crítico", "feat: exportar reporte a PDF"];

function DevVisual() {
  return (
    <Window label="Avance del proyecto" status="Sprint 3">
      <div className="flex flex-col gap-4">
        {SPRINTS.map((sprint, index) => (
          <div key={sprint.name} className="pr-item">
            <div className="flex justify-between text-[13px]">
              <span className="text-zinc-300">
                <span className="mr-2 text-zinc-600 tabular-nums">S{index + 1}</span>
                {sprint.name}
              </span>
              <span className={sprint.value === 100 ? "text-emerald-300" : "text-zinc-400"}>
                {sprint.value === 100 ? "Entregado" : "En curso"}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className={`pr-bar h-full origin-left rounded-full ${
                  sprint.value === 100 ? "bg-white" : "bg-linear-to-r from-white/40 to-white"
                }`}
                style={{ width: `${sprint.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 font-mono text-[12px] leading-6">
        {COMMITS.map((commit, index) => (
          <p key={commit} className="pr-line flex gap-3 text-zinc-400">
            <span className="text-zinc-600">{["a4f1e2", "9c03bd", "71de5a"][index]}</span>
            <span className="truncate">{commit}</span>
          </p>
        ))}
        <span className="pr-caret ml-[4.6rem] inline-block h-3.5 w-1.5 translate-y-0.5 bg-white/70" />
      </div>
    </Window>
  );
}

function DeliveryVisual() {
  return (
    <Window label="Producción" status="En vivo">
      <div className="flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="pr-ping absolute inset-0 rounded-full bg-emerald-400" />
          <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        <span className="text-[15px] font-medium text-white">Sistema operando</span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {[
          ["Equipo", "Capacitado"],
          ["Datos", "Migrados"],
          ["Soporte", "Activo"],
        ].map(([label, value]) => (
          <div key={label} className="pr-item rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
            <p className="text-[11px] text-zinc-500">{label}</p>
            <p className="mt-1 text-[13px] font-medium text-zinc-100">{value}</p>
          </div>
        ))}
      </div>
      <div className="pr-item mt-4 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
        <div className="flex justify-between text-[12px]">
          <span className="text-zinc-500">Uso del sistema · primeras semanas</span>
          <span className="text-emerald-300">En crecimiento</span>
        </div>
        <svg viewBox="0 0 300 70" className="mt-3 h-[4.5rem] w-full" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="pr-usage" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="pr-area"
            d="M0 62 C 40 60, 60 52, 90 48 S 150 30, 190 26 S 260 10, 300 6 L 300 70 L 0 70 Z"
            fill="url(#pr-usage)"
          />
          <path
            className="pr-path"
            d="M0 62 C 40 60, 60 52, 90 48 S 150 30, 190 26 S 260 10, 300 6"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </Window>
  );
}

const STEPS = [
  {
    number: "01",
    title: "Diagnóstico",
    text: "Relevamos cómo opera hoy tu negocio: dónde se pierde tiempo, qué información falta y qué hay que ordenar primero.",
    deliverable: "Mapa de procesos y prioridades",
    Visual: DiagnosisVisual,
  },
  {
    number: "02",
    title: "Prototipo",
    text: "Armamos una primera versión visual para validar flujos, pantallas y prioridades antes de desarrollar.",
    deliverable: "Pantallas clave validadas con tu equipo",
    Visual: PrototypeVisual,
  },
  {
    number: "03",
    title: "Desarrollo",
    text: "Construimos por etapas cortas, con avances visibles, para que puedas probar y ajustar con criterio.",
    deliverable: "Módulos funcionando en cada etapa",
    Visual: DevVisual,
  },
  {
    number: "04",
    title: "Entrega",
    text: "Ponemos el sistema en marcha, acompañamos al equipo y seguimos mejorando según la operación real.",
    deliverable: "Sistema en producción y equipo capacitado",
    Visual: DeliveryVisual,
  },
];

function animateVisual(gsap, card) {
  const q = (selector) => card.querySelectorAll(selector);
  const tl = gsap.timeline({
    defaults: { ease: "expo.out" },
    scrollTrigger: { trigger: card, start: "top 65%", once: true },
  });

  tl.from(q(".pr-window"), { opacity: 0, y: 40, rotateX: 12, transformPerspective: 1200, duration: 1.2 })
    .from(q(".pr-meta > *"), { opacity: 0, y: 16, duration: 0.9, stagger: 0.08 }, 0.1)
    .from(q(".pr-seg-fill"), { scaleX: 0, duration: 1, stagger: 0.12, ease: "power3.inOut" }, 0.2);

  if (q(".pr-item").length) {
    tl.from(q(".pr-item"), { opacity: 0, x: 24, duration: 0.9, stagger: 0.09 }, 0.35);
  }
  if (q(".pr-tag").length) {
    tl.from(q(".pr-tag"), { scale: 0.6, opacity: 0, duration: 0.6, ease: "back.out(2.5)", stagger: 0.1 }, 0.75);
    gsap.fromTo(
      q(".pr-scan"),
      { yPercent: -100 },
      { yPercent: 520, duration: 2.8, ease: "power1.inOut", repeat: -1, repeatDelay: 0.8, delay: 1.2 },
    );
  }

  if (q(".pr-block").length) {
    tl.from(q(".pr-block"), {
      opacity: 0,
      scale: 0.85,
      duration: 0.9,
      stagger: { each: 0.07, from: "random" },
    }, 0.3);

    const cursor = card.querySelector(".pr-cursor");
    const target = card.querySelector(".pr-target");
    const stage = cursor.parentElement;
    const approved = card.querySelector(".pr-approved");
    const point = () => {
      const s = stage.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      return { x: t.left - s.left + t.width * 0.4, y: t.top - s.top + t.height * 0.4 };
    };
    gsap.set(approved, { opacity: 0, y: 8 });
    const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.4, paused: true });
    loop
      .set(cursor, { x: 40, y: 200, opacity: 0 })
      .set(approved, { opacity: 0, y: 8 })
      .to(cursor, { opacity: 1, duration: 0.3 })
      .to(cursor, { x: () => point().x, y: () => point().y, duration: 1.3, ease: "power3.inOut" })
      .to(target, { scale: 0.9, duration: 0.12, yoyo: true, repeat: 1 })
      .to(approved, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, "<0.1")
      .to(cursor, { x: "+=60", y: "+=70", opacity: 0, duration: 1, ease: "power2.in" }, "+=0.6")
      .to(approved, { opacity: 0, duration: 0.4 }, "+=0.8");
    tl.add(() => loop.play(), 1.1);
  }

  if (q(".pr-bar").length) {
    tl.from(q(".pr-bar"), { scaleX: 0, duration: 1.5, stagger: 0.2, ease: "power3.inOut" }, 0.4)
      .from(q(".pr-line"), { opacity: 0, x: -10, duration: 0.6, stagger: 0.25 }, 0.9);
    gsap.to(q(".pr-caret"), { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });
  }

  const path = card.querySelector(".pr-path");
  if (path) {
    const length = path.getTotalLength();
    tl.fromTo(
      path,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" },
      0.6,
    ).from(q(".pr-area"), { opacity: 0, duration: 1.2 }, 1.2);
    gsap.fromTo(
      q(".pr-ping"),
      { scale: 1, opacity: 0.7 },
      { scale: 2.6, opacity: 0, duration: 1.6, repeat: -1, ease: "power2.out" },
    );
  }
}

function Process() {
  const rootRef = useRef(null);

  useGsap(rootRef, ({ gsap, desktop }) => {
    const cards = gsap.utils.toArray(".pr-card");

    cards.forEach((card, index) => {
      animateVisual(gsap, card);

      const next = cards[index + 1];
      if (!next || !desktop) {
        return;
      }

      const exit = { trigger: next, start: "top bottom", end: "top 30%", scrub: true };
      gsap.to(card.querySelector(".pr-inner"), {
        scale: 0.9,
        rotateX: -8,
        transformOrigin: "50% 0%",
        ease: "none",
        scrollTrigger: exit,
      });
      gsap.to(card.querySelector(".pr-dim"), { opacity: 0.7, ease: "none", scrollTrigger: exit });
    });
  });

  return (
    <section ref={rootRef} id="proceso" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <span data-section-anchor className="block h-0" />
      <SectionHeading
        eyebrow="Proceso"
        title={["De una necesidad concreta", { text: "a un sistema operando.", className: "text-gradient-muted", br: true, brClassName: "hidden sm:block" }]}
        description="Trabajamos por etapas claras para que veas avance real, valides rápido y tomes decisiones sin perder tiempo."
      />

      <div className="mt-16 flex flex-col gap-6 lg:gap-0">
        {STEPS.map(({ number, title, text, deliverable, Visual }, index) => (
          <div
            key={number}
            className={`pr-card lg:sticky [perspective:1600px] ${
              index < STEPS.length - 1 ? "lg:h-[72vh]" : ""
            }`}
            style={{ top: `calc(var(--site-header-h, 7.5rem) + 2rem + ${index * 1.25}rem)` }}
          >
            <div className="pr-inner bento-card pr-surface grid grid-cols-1 gap-10 p-5 sm:p-10 lg:min-h-[28rem] lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-14">
              <span className="pr-dim pointer-events-none absolute inset-0 z-20 rounded-[inherit] bg-black opacity-0" />
              <span
                className="text-outline pointer-events-none absolute -right-4 -bottom-12 text-[12rem] opacity-50 lg:right-auto lg:left-[38%] leading-none font-semibold tracking-[-0.07em] select-none sm:text-[15rem]"
                aria-hidden="true"
              >
                {number}
              </span>

              <div className="pr-meta relative flex h-full min-w-0 flex-col">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5" aria-hidden="true">
                    {STEPS.map((step, segIndex) => (
                      <span key={step.number} className="relative h-1 w-7 overflow-hidden rounded-full bg-white/10">
                        {segIndex <= index ? (
                          <span className="pr-seg-fill absolute inset-0 origin-left rounded-full bg-white" />
                        ) : null}
                      </span>
                    ))}
                  </div>
                  <span className="text-[12px] tracking-[0.16em] text-zinc-500 uppercase tabular-nums">
                    Etapa {number} de 04
                  </span>
                </div>

                <h3 className="mt-8 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
                  {title}
                </h3>
                <p className="mt-5 max-w-md text-[16px] leading-7 text-zinc-400">{text}</p>

                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-black/40 px-4 py-3.5 backdrop-blur lg:mt-auto">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-[10px] font-bold text-black">
                    ✓
                  </span>
                  <div>
                    <p className="text-[11px] tracking-[0.16em] text-zinc-500 uppercase">Entregable</p>
                    <p className="mt-0.5 text-[14px] text-zinc-200">{deliverable}</p>
                  </div>
                </div>
              </div>

              <div className="relative min-w-0 [perspective:1400px]">
                <div className="pr-visual-glow pointer-events-none absolute -inset-6 rounded-[2rem]" aria-hidden="true" />
                <Visual />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Process;
