import { motion, useReducedMotion } from "motion/react";
import { useRichMotion } from "../hooks/useRichMotion";
import { fadeUpLight } from "../lib/motion";
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

const panelVariantsRich = {
  hidden: {
    opacity: 0,
    y: 48,
    scale: 0.96,
    clipPath: "inset(8% 4% 8% 4% round 2rem)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 2rem)",
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 16,
      clipPath: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const panelVariantsLight = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
      delayChildren: 0.06,
    },
  },
};

const copyVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 180, damping: 18 },
  },
};

const channelListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const channelVariants = {
  hidden: { opacity: 0, x: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 160, damping: 16 },
  },
};

function ContactSection() {
  const reduceMotion = useReducedMotion();
  const rich = useRichMotion();

  if (reduceMotion) {
    return (
      <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/70 sm:rounded-[2rem]">
          <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="border-b border-white/10 px-5 py-9 sm:px-8 lg:border-r lg:border-b-0 lg:px-12 lg:py-14">
              <p
                id="contacto"
                className="text-xs font-medium uppercase tracking-[0.32em] text-cyan-200/90"
              >
                Empecemos
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Contanos qué querés ordenar y armamos el sistema.
              </h2>
            </div>
            <div className="flex flex-col gap-3 px-5 py-7 sm:px-8 lg:px-8 lg:py-12">
              {contactChannels.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.href}
                  className="rounded-2xl border border-white/10 px-4 py-4 text-white"
                >
                  {channel.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
      <motion.div
        className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/70 shadow-[0_28px_90px_rgba(2,6,23,0.5)] sm:rounded-[2rem]"
        variants={rich ? panelVariantsRich : panelVariantsLight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: "0px 0px 10% 0px" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_28rem)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.18),transparent_24rem)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(circle_at_center,black,transparent_78%)]" />

        <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-center border-b border-white/10 px-5 py-9 sm:px-8 sm:py-11 lg:border-r lg:border-b-0 lg:px-12 lg:py-14">
            <motion.p
              id="contacto"
              variants={rich ? copyVariants : fadeUpLight}
              className="scroll-mt-36 text-xs font-medium uppercase tracking-[0.32em] text-cyan-200/90 sm:scroll-mt-40"
            >
              Empecemos
            </motion.p>

            <motion.h2
              variants={rich ? copyVariants : fadeUpLight}
              className="mt-4 max-w-xl text-3xl font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:mt-5 sm:text-4xl md:text-[2.65rem]"
            >
              Contanos qué querés ordenar y armamos el sistema.
            </motion.h2>

            <motion.div
              variants={rich ? copyVariants : fadeUpLight}
              className="mt-6 h-px w-28 origin-left bg-linear-to-r from-cyan-300/80 via-cyan-300/40 to-transparent"
              aria-hidden="true"
            />

            <motion.p
              variants={rich ? copyVariants : fadeUpLight}
              className="mt-5 max-w-lg text-base leading-7 text-slate-400 sm:text-[17px] sm:leading-8"
            >
              Contanos qué vendés, qué proceso necesitás controlar y qué te
              gustaría automatizar. Te orientamos rápido y sin vueltas.
            </motion.p>

            <motion.ul
              variants={rich ? copyVariants : fadeUpLight}
              className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-medium tracking-[0.04em] text-slate-500"
            >
              {["Diagnóstico claro", "Propuesta a medida", "Arranque ágil"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-cyan-300/70" />
                    {item}
                  </li>
                ),
              )}
            </motion.ul>
          </div>

          <motion.div
            className="flex flex-col justify-center gap-3 px-5 py-7 sm:px-8 sm:py-9 lg:px-8 lg:py-12"
            variants={channelListVariants}
          >
            {contactChannels.map((channel) => (
              <motion.a
                key={channel.id}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noreferrer" : undefined}
                variants={rich ? channelVariants : fadeUpLight}
                whileHover={rich ? { y: -3, scale: 1.015 } : undefined}
                whileTap={{ scale: 0.98 }}
                className={`group relative overflow-hidden rounded-2xl border px-4 py-4 sm:px-5 sm:py-5 ${
                  channel.accent
                    ? "border-cyan-200/25 bg-cyan-300/10 hover:border-cyan-200/45 hover:bg-cyan-300/15"
                    : "border-white/10 bg-white/[0.03] hover:border-cyan-200/30 hover:bg-white/[0.05]"
                }`}
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
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default ContactSection;
