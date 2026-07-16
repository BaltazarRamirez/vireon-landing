import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import founderPhoto from "../assets/founder.jpg";
import AboutSection from "../components/AboutSection";
import ClientsSection from "../components/ClientsSection";
import ContactSection from "../components/ContactSection";
import FounderCard from "../components/FounderCard";
import HeroVisual from "../components/HeroVisual";
import ProcessSection from "../components/ProcessSection";
import ServicesSection from "../components/ServicesSection";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { WHATSAPP_URL } from "../components/WhatsAppFloat";
import { clients } from "../data/clients";

const services = [
  {
    number: "01",
    title: "Sistemas a medida",
    description:
      "Diseñamos plataformas internas para ordenar ventas, stock, turnos, clientes y la operación diaria de tu negocio.",
    points: ["Ventas", "Stock", "Turnos", "Clientes"],
  },
  {
    number: "02",
    title: "Automatizaciones",
    description:
      "Eliminamos tareas repetitivas y conectamos procesos para que tu equipo gane tiempo y reduzca errores.",
    points: ["Flujos", "Alertas", "Procesos", "Eficiencia"],
  },
  {
    number: "03",
    title: "Control y reportes",
    description:
      "Convertimos la información del día a día en paneles claros para decidir con datos, no con intuición.",
    points: ["Ventas", "Márgenes", "Ocupación", "Rendimiento"],
  },
  {
    number: "04",
    title: "Integraciones",
    description:
      "Unimos lo que ya usás —pagos, WhatsApp, planillas u otros sistemas— para que todo trabaje como una sola operación.",
    points: ["Pagos", "APIs", "Planillas", "Canales"],
  },
];

const aboutValues = [
  {
    title: "Cercanía operativa",
    description:
      "Trabajamos desde el problema real del negocio, no desde una plantilla genérica.",
  },
  {
    title: "Producto usable",
    description:
      "Interfaces simples para que el equipo pueda operar sin fricción desde el primer día.",
  },
  {
    title: "Base para crecer",
    description:
      "Sistemas preparados para sumar sucursales, roles, reportes y nuevas necesidades.",
  },
];

const founder = {
  name: "Baltazar Ramirez",
  initials: "BR",
  role: "Vireon Founder",
  image: founderPhoto,
  bio: "Diseño y desarrollo sistemas a medida para negocios que necesitan ordenar su operación. Me meto en cómo vendés, entregás y gestionás el día a día, y traduzco eso en herramientas claras, útiles y listas para crecer.",
  highlights: ["Sistemas a medida", "Operación real", "Producto usable"],
  phone: "+543865454534",
  phoneLabel: "+54 3865 45-4534",
  email: "balturamirez1@gmail.com",
  linkedin: "https://www.linkedin.com/in/baltazar-ramirez-b211aa22a/",
  linkedinLabel: "LinkedIn",
};

const process = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Relevamos cómo opera hoy tu negocio: dónde se pierde tiempo, qué información falta y qué hay que ordenar primero.",
  },
  {
    number: "02",
    title: "Prototipo",
    description:
      "Armamos una primera versión visual para validar flujos, pantallas y prioridades antes de desarrollar.",
  },
  {
    number: "03",
    title: "Desarrollo",
    description:
      "Construimos por etapas cortas, con avances visibles, para que puedas probar y ajustar con criterio.",
  },
  {
    number: "04",
    title: "Entrega",
    description:
      "Ponemos el sistema en marcha, acompañamos al equipo y seguimos mejorando según la operación real.",
  },
];

const tools = [
  "Stock",
  "Turnos",
  "Ventas",
  "Clientes",
  "Operaciones",
  "Operarios",
  "Facturacion",
  "Reportes",
];

const heroWords = [
  { text: "Software", accent: false },
  { text: "que", accent: false },
  { text: "ordena", accent: false },
  { text: "y", accent: false },
  { text: "potencia", accent: false },
  { text: "tu", accent: true },
  { text: "operación.", accent: true },
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : false,
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

function LandingPage({ onSectionNav, ready = true }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const play = ready && !reduceMotion;
  const rich = play && isDesktop;

  return (
    <>
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onSectionNav={onSectionNav}
      />

      <section
        id="inicio"
        className="relative flex min-h-[92svh] scroll-mt-32 flex-col items-center justify-center overflow-hidden px-5 pb-24 pt-36 text-center sm:px-8 sm:pb-28 sm:pt-40 lg:scroll-mt-36"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[12%] left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-cyan-400/14 blur-[90px] sm:h-[32rem] sm:w-[32rem] sm:blur-[110px]" />
          <div className="absolute top-[28%] left-[8%] h-52 w-52 rounded-full bg-blue-600/16 blur-[75px] sm:left-[16%] sm:h-72 sm:w-72 sm:blur-[100px]" />
          <div className="absolute top-[32%] right-[6%] h-44 w-44 rounded-full bg-sky-400/12 blur-[65px] sm:right-[14%] sm:h-64 sm:w-64 sm:blur-[90px]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div
            className="absolute inset-x-0 bottom-16 h-px bg-linear-to-r from-transparent via-cyan-300/25 to-transparent sm:bottom-20"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center">
          <HeroVisual ready={ready} rich={rich} />

          {rich ? (
            <motion.h1
              className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:mt-5 sm:text-5xl lg:text-[3.65rem]"
              style={{ perspective: 900 }}
              initial="hidden"
              animate={ready ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.32,
                  },
                },
              }}
            >
              {heroWords.map((word, index) => (
                <motion.span
                  key={`${word.text}-${index}`}
                  className={`mr-[0.28em] inline-block ${
                    word.accent ? "text-cyan-200" : ""
                  }`}
                  style={{ transformOrigin: "50% 100%" }}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 32,
                      rotateX: 48,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: {
                        type: "spring",
                        stiffness: 165,
                        damping: 16,
                      },
                    },
                  }}
                >
                  {word.text}
                </motion.span>
              ))}
            </motion.h1>
          ) : (
            <motion.h1
              className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:mt-5 sm:text-5xl lg:text-[3.65rem]"
              initial={false}
              animate={
                play || reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 14 }
              }
              transition={{ duration: 0.4, delay: play ? 0.08 : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              Software que ordena y potencia{" "}
              <span className="text-cyan-200">tu operación.</span>
            </motion.h1>
          )}

          <motion.p
            className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:mt-7 sm:text-lg sm:leading-8"
            initial={false}
            animate={
              play || reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{
              duration: rich ? 0.65 : 0.35,
              delay: play ? (rich ? 0.58 : 0.16) : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Diseñamos plataformas claras para ventas, stock y automatización,
            pensadas para que tu equipo trabaje mejor desde el primer día.
          </motion.p>

          <motion.div
            className="mt-9 flex w-full max-w-sm flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center"
            initial={false}
            animate={
              play || reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{
              duration: rich ? 0.5 : 0.35,
              delay: play ? (rich ? 0.72 : 0.24) : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              whileHover={rich ? { y: -3 } : undefined}
              whileTap={play ? { scale: 0.98 } : undefined}
            >
              <Link
                to="/proyectos"
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-white px-7 py-3.5 text-center text-sm font-semibold text-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_12px_40px_rgba(34,211,238,0.12)] transition duration-300 hover:bg-cyan-200"
              >
                {rich ? (
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/50 to-transparent transition duration-700 group-hover:translate-x-full" />
                ) : null}
                Ver proyectos
                <span className="ml-2 inline-block transition duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </motion.div>
            <motion.div
              whileHover={rich ? { y: -3 } : undefined}
              whileTap={play ? { scale: 0.98 } : undefined}
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-center text-sm font-semibold text-slate-200 transition duration-300 hover:border-cyan-200/45 hover:bg-white/[0.07] hover:text-white"
              >
                Hablar por WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.button
          type="button"
          onClick={() => onSectionNav?.("servicios")}
          className="absolute bottom-2 left-1/2 hidden h-12 w-12 -translate-x-1/2 items-center justify-center sm:bottom-3 sm:flex"
          initial={false}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Ir a servicios"
        >
          <span className="relative flex h-10 w-10 items-center justify-center">
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-cyan-300/25"
              animate={
                play
                  ? { scale: [1, 1.35, 1.35], opacity: [0.55, 0, 0] }
                  : { opacity: 0 }
              }
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute inset-[3px] rounded-full border border-white/10 bg-slate-950/40 backdrop-blur-sm"
              whileHover={{ borderColor: "rgba(165,243,252,0.35)" }}
            />
            <motion.svg
              viewBox="0 0 24 24"
              className="relative z-10 h-4 w-4 text-cyan-200/90"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={play ? { y: [0, 4, 0] } : {}}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: [0.45, 0, 0.55, 1],
              }}
            >
              <path d="M6 10l6 6 6-6" />
            </motion.svg>
          </span>
        </motion.button>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-white/3 py-4">
        <div className="animate-marquee flex w-max gap-4 whitespace-nowrap text-sm font-bold uppercase tracking-[0.35em] text-cyan-100/80">
          {[...tools, ...tools, ...tools].map((tool, index) => (
            <span key={tool + index} className="mx-6">
              {tool}
            </span>
          ))}
        </div>
      </section>

      <ServicesSection
        services={services}
        intro={{
          id: "servicios",
          eyebrow: "Servicios",
          title:
            "Herramientas claras para ordenar, controlar y hacer crecer tu operación.",
          description:
            "No vendemos software genérico. Construimos soluciones a medida que bajan a tierra tu operación y la vuelven más simple de gestionar.",
        }}
      />

      <ClientsSection
        clients={clients}
        intro={{
          id: "clientes",
          eyebrow: "Nuestros clientes",
          title: "Empresas que ya operan con sistemas hechos a su medida.",
          description:
            "Trabajamos con negocios reales que necesitaban ordenar ventas, stock, turnos y el día a día.",
        }}
      />

      <AboutSection
        items={aboutValues}
        intro={{
          id: "nosotros",
          eyebrow: "Sobre nosotros",
          title: "Entendemos tu operación antes de construir el sistema.",
          description:
            "Nos metemos en cómo vendés, entregás y organizás el día a día. A partir de eso diseñamos herramientas claras, útiles y listas para crecer con tu negocio.",
        }}
      />

      <ProcessSection
        steps={process}
        intro={{
          id: "proceso",
          eyebrow: "Proceso",
          title: "De una necesidad concreta a un sistema listo para operar.",
          description:
            "Trabajamos por etapas claras para que veas avance real, valides rápido y tomes decisiones sin perder tiempo.",
        }}
      />

      <FounderCard founder={founder} />

      <ContactSection />

      <SiteFooter
        onSectionNav={(id) => {
          if (id === "inicio") {
            onSectionNav?.("inicio");
            return;
          }
          onSectionNav?.(id);
        }}
      />
    </>
  );
}

export default LandingPage;
