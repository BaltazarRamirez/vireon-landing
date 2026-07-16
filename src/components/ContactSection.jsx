import { useSectionReveal } from "../hooks/useReveal";
import { WHATSAPP_URL } from "./WhatsAppFloat";

function ContactSection() {
  const { sectionRef, visible } = useSectionReveal({
    threshold: 0.18,
    rootMargin: "0px 0px -6% 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      <div
        className={`reveal-card relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 px-5 py-8 shadow-[0_24px_80px_rgba(2,6,23,0.45)] sm:px-8 sm:py-10 lg:px-12 lg:py-14 ${
          visible ? "is-revealed" : ""
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_22rem)]" />
        <div className="pointer-events-none absolute -right-20 -bottom-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p
              id="contacto"
              className="scroll-mt-28 text-xs font-medium uppercase tracking-[0.32em] text-cyan-200/90 sm:scroll-mt-32"
            >
              Empecemos
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:text-4xl md:text-[2.75rem]">
              Contanos qué querés ordenar y armamos el sistema.
            </h2>
            <div
              className="mt-5 h-px w-24 bg-linear-to-r from-cyan-300/70 to-transparent"
              aria-hidden="true"
            />
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-400 sm:text-[17px] sm:leading-8">
              Escribinos por WhatsApp y contanos qué vendés, qué proceso
              necesitás controlar y qué te gustaría automatizar. Respondemos
              rápido y te orientamos sin vueltas.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-[#2fe074]"
            >
              Escribir por WhatsApp
            </a>
            <a
              href="tel:+543865454534"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/40 hover:text-white"
            >
              +54 3865 45-4534
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
