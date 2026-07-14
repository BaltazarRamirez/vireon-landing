import { useState } from "react";
import logo from "./assets/vireon_logo_blanco_transparente_4096.png";
import FeaturedProjectCard from "./components/FeaturedProjectCard";
import HeroVisual from "./components/HeroVisual";
import ProcessTimeline from "./components/ProcessTimeline";
import ProjectModal from "./components/ProjectModal";
import ServicesList from "./components/ServicesList";
import WhatsAppFloat, { WHATSAPP_URL } from "./components/WhatsAppFloat";
import { featuredProjects, placeholderProjects } from "./data/projects";

const navItems = ["Servicios", "Proyectos", "Nosotros", "Proceso"];

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

const projects = placeholderProjects;

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

const tools = ["Stock", "Turnos", "Ventas", "Clientes", "Operaciones", "Operarios", "Facturacion", "Reportes"];

function App() {
  const currentYear = new Date().getFullYear();
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-glow absolute -left-48 top-24 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="animate-glow delay-300 absolute -right-40 top-0 h-120 w-120 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.06)_1px,transparent_1px)] bg-size-[72px_72px] mask-[radial-gradient(circle_at_top,black,transparent_72%)]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#inicio"
            className="group flex items-center"
            aria-label="Ir al inicio"
            onClick={closeMenu}
          >
            <img
              src={logo}
              alt="Vireon"
              className="h-8 w-auto transition duration-300 group-hover:scale-105 sm:h-9"
            />
          </a>

          <div className="hidden items-center gap-8 rounded-full border border-white/10 bg-white/3 px-6 py-3 text-sm text-slate-300 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition hover:text-cyan-200"
              >
                {item}
              </a>
            ))}
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(103,232,249,0.45)] transition duration-300 hover:-translate-y-0.5 hover:bg-white lg:inline-flex"
          >
            Hablemos
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-cyan-200/40 lg:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 block h-0.5 w-4 rounded-full bg-current transition duration-300 ${
                  menuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-4 rounded-full bg-current transition duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-4 rounded-full bg-current transition duration-300 ${
                  menuOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </nav>

        <div
          className={`overflow-hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
            menuOpen
              ? "max-h-96 opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-cyan-200"
              >
                {item}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className="mt-2 inline-flex w-full max-w-xs items-center justify-center self-center rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              Hablemos por WhatsApp
            </a>
          </div>
        </div>
      </header>

      <section
        id="inicio"
        className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-5 pb-20 pt-28 text-center sm:px-8 sm:pb-24 sm:pt-32"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[18%] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[100px]" />
          <div className="absolute top-[30%] left-[20%] h-64 w-64 rounded-full bg-blue-600/15 blur-[90px]" />
          <div className="absolute top-[35%] right-[18%] h-56 w-56 rounded-full bg-sky-400/10 blur-[80px]" />
        </div>

        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
          <HeroVisual />

          <p className="animate-rise text-xs font-medium uppercase tracking-[0.34em] text-cyan-200/80 sm:text-sm">
            Sistemas a medida
          </p>

          <h1 className="animate-rise delay-100 mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Software que ordena y potencia tu operación.
          </h1>

          <p className="animate-rise delay-200 mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            Diseñamos plataformas claras para ventas, stock y automatización,
            pensadas para que tu equipo trabaje mejor desde el primer día.
          </p>

          <div className="animate-rise delay-300 mt-9 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <a
              href="#proyectos"
              className="group inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200"
            >
              Ver proyectos
              <span className="ml-2 inline-block transition duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-center text-sm font-semibold text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/40 hover:text-white"
            >
              Hablar por WhatsApp
            </a>
          </div>
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

      <section
        id="servicios"
        className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
      >
        <SectionIntro
          eyebrow="Servicios"
          title="Herramientas claras para ordenar, controlar y hacer crecer tu operación."
          description="No vendemos software genérico. Construimos soluciones a medida que bajan a tierra tu operación y la vuelven más simple de gestionar."
        />

        <ServicesList services={services} />
      </section>

      <section
        id="proyectos"
        className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
      >
        <SectionIntro
          eyebrow="Proyectos"
          title="Sistemas reales, pensados para operar y crecer."
          description="Cada solución nace de un problema concreto: centralizar información, ganar control y darle al equipo una herramienta clara para el día a día."
        />

        <div className="mt-8 flex w-full flex-col gap-5 sm:mt-12">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              onOpen={() => setSelectedProject(project)}
            />
          ))}

          {projects.map((project, index) => (
            <article
              key={project.name}
              className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 px-5 py-5 shadow-[0_18px_60px_rgba(2,6,23,0.45)] transition duration-500 hover:-translate-y-1.5 hover:border-cyan-200/50 sm:px-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_16rem)] opacity-70 transition duration-500 group-hover:opacity-100" />
              <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="rounded-full border border-cyan-200/25 bg-cyan-300/10 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-100">
                      {project.category}
                    </span>
                    <span className="text-xs text-slate-500">0{index + 1}</span>
                  </div>
                  <h3 className="mt-2.5 text-xl font-semibold text-white sm:text-2xl">
                    {project.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                    {project.description}
                  </p>
                </div>

                <div className="w-full rounded-2xl border border-white/10 bg-white/4 p-3 sm:max-w-48">
                  <div className="mb-2.5 h-2 w-16 rounded-full bg-cyan-200/40" />
                  <div className="space-y-2">
                    <div className="h-2 rounded-full bg-white/10" />
                    <div className="h-2 w-10/12 rounded-full bg-white/10" />
                    <div className="h-2 w-7/12 rounded-full bg-cyan-300/30" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ProjectModal
        key={selectedProject?.id ?? "closed"}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <section
        id="nosotros"
        className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
      >
        <SectionIntro
          eyebrow="Sobre nosotros"
          title="Entendemos tu operación antes de construir el sistema."
          description="Nos metemos en cómo vendés, entregás y organizás el día a día. A partir de eso diseñamos herramientas claras, útiles y listas para crecer con tu negocio."
        />

        <div className="mt-8 grid gap-4 sm:mt-12 lg:grid-cols-3">
          {[
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
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-slate-950/55 px-5 py-6 transition duration-500 hover:-translate-y-1 hover:border-cyan-200/40 sm:px-6"
            >
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="proceso"
        className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
      >
        <SectionIntro
          eyebrow="Proceso"
          title="De una necesidad concreta a un sistema listo para operar."
          description="Trabajamos por etapas claras para que veas avance real, valides rápido y tomes decisiones sin perder tiempo."
        />

        <ProcessTimeline steps={process} />
      </section>

      <section
        id="contacto"
        className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 px-5 py-8 shadow-[0_24px_80px_rgba(2,6,23,0.45)] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_22rem)]" />
          <div className="pointer-events-none absolute -right-20 -bottom-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-cyan-200/90">
                Empecemos
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:text-4xl md:text-[2.75rem]">
                Contanos qué querés ordenar y armamos el sistema.
              </h2>
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

      <WhatsAppFloat />

      <footer className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-sm">
              <img
                src={logo}
                alt="Vireon"
                className="h-8 w-auto opacity-80"
              />
              <p className="mt-4 text-sm leading-7 text-slate-400">
                Sistemas a medida para ordenar la operación, ganar control y
                hacer crecer el negocio.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-200/80">
                  Navegación
                </p>
                <div className="mt-4 flex flex-col gap-2.5">
                  {navItems.map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-200/80">
                  Contacto
                </p>
                <div className="mt-4 flex flex-col gap-2.5">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="tel:+543865454534"
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    +54 3865 45-4534
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              &copy; {currentYear} Vireon. Todos los derechos reservados.
            </p>
            <a
              href="#inicio"
              className="text-sm text-slate-500 transition hover:text-cyan-200"
            >
              Volver arriba
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionIntro({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <p className="animate-rise text-xs font-medium uppercase tracking-[0.32em] text-cyan-200/90">
        {eyebrow}
      </p>
      <h2 className="animate-rise delay-100 mt-3 text-3xl font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:mt-4 sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      <p className="animate-rise delay-200 mt-4 max-w-xl text-base leading-7 text-slate-400 sm:mt-5 sm:text-[17px] sm:leading-8">
        {description}
      </p>
    </div>
  );
}

export default App;
