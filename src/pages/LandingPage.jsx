import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
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

function LandingPage({ onSectionNav }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onSectionNav={onSectionNav}
      />

      <section
        id="inicio"
        className="relative mx-auto flex min-h-[88vh] max-w-7xl scroll-mt-32 flex-col items-center justify-center px-5 pb-20 pt-36 text-center sm:px-8 sm:pb-24 sm:pt-40 lg:scroll-mt-36"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[18%] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/12 blur-[60px] sm:h-[28rem] sm:w-[28rem] sm:blur-[100px]" />
          <div className="absolute top-[30%] left-[20%] hidden h-64 w-64 rounded-full bg-blue-600/15 blur-[90px] lg:block" />
          <div className="absolute top-[35%] right-[18%] hidden h-56 w-56 rounded-full bg-sky-400/10 blur-[80px] lg:block" />
        </div>

        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
          <HeroVisual />

          <motion.p
            className="text-xs font-medium uppercase tracking-[0.34em] text-cyan-200/80 sm:text-sm"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 160, damping: 18 }}
          >
            Sistemas a medida
          </motion.p>

          {reduceMotion ? (
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Software que ordena y potencia tu operación.
            </h1>
          ) : (
            <motion.h1
              className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
              style={{ perspective: 800 }}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.045,
                    delayChildren: 0.22,
                  },
                },
              }}
            >
              {"Software que ordena y potencia tu operación."
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    className="mr-[0.28em] inline-block"
                    style={{ transformOrigin: "50% 100%" }}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 28,
                        rotateX: 40,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        transition: {
                          type: "spring",
                          stiffness: 170,
                          damping: 16,
                        },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
            </motion.h1>
          )}

          <motion.p
            className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            Diseñamos plataformas claras para ventas, stock y automatización,
            pensadas para que tu equipo trabaje mejor desde el primer día.
          </motion.p>

          <motion.div
            className="animate-rise delay-300 mt-9 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.45,
              type: "spring",
              stiffness: 160,
              damping: 18,
            }}
          >
            <motion.div whileTap={reduceMotion ? undefined : { scale: 0.97 }}>
              <Link
                to="/proyectos"
                className="group inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200"
              >
                Ver proyectos
                <span className="ml-2 inline-block transition duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </motion.div>
            <motion.div whileTap={reduceMotion ? undefined : { scale: 0.97 }}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-center text-sm font-semibold text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/40 hover:text-white"
              >
                Hablar por WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
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
