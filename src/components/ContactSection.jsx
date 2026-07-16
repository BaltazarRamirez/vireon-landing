import { useSectionReveal } from "../hooks/useReveal";
import { WHATSAPP_URL } from "./WhatsAppFloat";

const contactChannels = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    detail: "Respuesta rápida · Sin vueltas",
    href: WHATSAPP_URL,
    external: true,
    value: "Escribir ahora",
    accent: true,
  },
  {
    id: "phone",
    label: "Teléfono",
    detail: "Hablemos directo",
    href: "tel:+543865454534",
    value: "+54 3865 45-4534",
  },
  {
    id: "email",
    label: "Email",
    detail: "Para brief o consultas",
    href: "mailto:balturamirez1@gmail.com",
    value: "balturamirez1@gmail.com",
  },
];

function ContactSection() {
  const { sectionRef, visible } = useSectionReveal({
    threshold: 0.16,
    rootMargin: "0px 0px -6% 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      <div
        className={`reveal-card relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/70 shadow-[0_28px_90px_rgba(2,6,23,0.5)] sm:rounded-[2rem] ${
          visible ? "is-revealed" : ""
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_28rem)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.18),transparent_24rem)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(circle_at_center,black,transparent_78%)]" />
        <div className="pointer-events-none absolute -top-24 right-1/4 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-center border-b border-white/10 px-5 py-9 sm:px-8 sm:py-11 lg:border-r lg:border-b-0 lg:px-12 lg:py-14">
            <p
              id="contacto"
              className={`reveal-copy scroll-mt-28 text-xs font-medium uppercase tracking-[0.32em] text-cyan-200/90 sm:scroll-mt-32 ${
                visible ? "is-revealed" : ""
              }`}
              style={{ transitionDelay: visible ? "80ms" : "0ms" }}
            >
              Empecemos
            </p>

            <h2
              className={`reveal-title mt-4 max-w-xl text-3xl font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:mt-5 sm:text-4xl md:text-[2.65rem] ${
                visible ? "is-revealed" : ""
              }`}
              style={{ transitionDelay: visible ? "180ms" : "0ms" }}
            >
              Contanos qué querés ordenar y armamos el sistema.
            </h2>

            <div
              className={`reveal-rule mt-6 h-px w-28 origin-left bg-linear-to-r from-cyan-300/80 via-cyan-300/40 to-transparent ${
                visible ? "is-revealed" : ""
              }`}
              style={{ transitionDelay: visible ? "300ms" : "0ms" }}
              aria-hidden="true"
            />

            <p
              className={`reveal-copy mt-5 max-w-lg text-base leading-7 text-slate-400 sm:text-[17px] sm:leading-8 ${
                visible ? "is-revealed" : ""
              }`}
              style={{ transitionDelay: visible ? "380ms" : "0ms" }}
            >
              Contanos qué vendés, qué proceso necesitás controlar y qué te
              gustaría automatizar. Te orientamos rápido y sin vueltas.
            </p>

            <ul
              className={`reveal-copy mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-medium tracking-[0.04em] text-slate-500 ${
                visible ? "is-revealed" : ""
              }`}
              style={{ transitionDelay: visible ? "480ms" : "0ms" }}
            >
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cyan-300/70" />
                Diagnóstico claro
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cyan-300/70" />
                Propuesta a medida
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cyan-300/70" />
                Arranque ágil
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center gap-3 px-5 py-7 sm:px-8 sm:py-9 lg:px-8 lg:py-12">
            {contactChannels.map((channel, index) => (
              <a
                key={channel.id}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noreferrer" : undefined}
                className={`reveal-card-soft group relative overflow-hidden rounded-2xl border px-4 py-4 transition duration-300 sm:px-5 sm:py-5 ${
                  visible ? "is-revealed" : ""
                } ${
                  channel.accent
                    ? "border-cyan-200/25 bg-cyan-300/10 hover:border-cyan-200/45 hover:bg-cyan-300/15"
                    : "border-white/10 bg-white/[0.03] hover:border-cyan-200/30 hover:bg-white/[0.05]"
                }`}
                style={{
                  transitionDelay: visible ? `${520 + index * 120}ms` : "0ms",
                }}
              >
                <div className="relative flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p
                      className={`text-[11px] font-medium tracking-[0.2em] uppercase ${
                        channel.accent ? "text-cyan-100/90" : "text-cyan-200/70"
                      }`}
                    >
                      {channel.label}
                    </p>
                    <p className="mt-1.5 truncate text-sm font-semibold text-white sm:text-[15px]">
                      {channel.value}
                    </p>
                    <p className="mt-1 text-[12px] text-slate-500">
                      {channel.detail}
                    </p>
                  </div>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-sm transition duration-300 group-hover:translate-x-0.5 ${
                      channel.accent
                        ? "border-cyan-200/30 bg-cyan-300/15 text-cyan-100"
                        : "border-white/10 bg-white/5 text-slate-300"
                    }`}
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
