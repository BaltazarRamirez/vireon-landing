import SectionAnchor from "./SectionAnchor";
import { WHATSAPP_URL } from "./WhatsAppFloat";

const contactChannels = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    detail: "Respuesta rápida",
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
  return (
    <section
      id="contacto"
      className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      <SectionAnchor />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/70 sm:rounded-[2rem]">
        <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
          <div
            data-reveal-group
            className="flex flex-col justify-center border-b border-white/10 px-5 py-9 sm:px-8 sm:py-11 lg:border-r lg:border-b-0 lg:px-12 lg:py-14"
          >
            <p
              data-reveal
              className="text-xs font-medium uppercase tracking-[0.32em] text-white/50"
            >
              Empecemos
            </p>
            <h2
              data-reveal
              className="mt-4 max-w-xl text-3xl font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:mt-5 sm:text-4xl md:text-[2.65rem]"
            >
              Contanos qué querés ordenar y armamos el sistema.
            </h2>
            <div
              data-reveal="rule"
              className="mt-6 h-px w-28 origin-left bg-linear-to-r from-white/50 via-white/20 to-transparent"
              aria-hidden="true"
            />
            <p
              data-reveal
              className="mt-5 max-w-lg text-base leading-7 text-slate-400 sm:text-[17px] sm:leading-8"
            >
              Contanos qué proceso necesitás controlar o qué te gustaría
              automatizar. Te orientamos e iniciamos con tu idea.
            </p>
            <ul
              data-reveal
              className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-medium tracking-[0.04em] text-slate-500"
            >
              {["Diagnóstico claro", "Propuesta a medida", "Arranque ágil"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-white/70" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div
            data-reveal-group
            className="flex flex-col justify-center gap-3 px-5 py-7 sm:px-8 sm:py-9 lg:px-8 lg:py-12"
          >
            {contactChannels.map((channel) => (
              <a
                key={channel.id}
                href={channel.href}
                data-reveal
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noreferrer" : undefined}
                className={`page-card group relative overflow-hidden rounded-2xl border px-4 py-4 sm:px-5 sm:py-5 ${
                  channel.accent
                    ? "border-white/12 bg-white/8 hover:border-white/30 hover:bg-white/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]"
                }`}
              >
                <div className="relative flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p
                      className={`text-[11px] font-medium tracking-[0.2em] uppercase ${
                        channel.accent ? "text-white/90" : "text-white/40"
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
                        ? "border-white/15 bg-white/10 text-white"
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
