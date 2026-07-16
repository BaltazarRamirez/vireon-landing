import { useCallback, useRef, useState } from "react";
import founderPhoto from "./assets/founder.jpg";
import logo from "./assets/vireon_logo_blanco_transparente_4096.png";
import AboutSection from "./components/AboutSection";
import AmbientBackground from "./components/AmbientBackground";
import ClientsSection from "./components/ClientsSection";
import ContactSection from "./components/ContactSection";
import FounderCard from "./components/FounderCard";
import HeroVisual from "./components/HeroVisual";
import PageIntro from "./components/PageIntro";
import ProcessSection from "./components/ProcessSection";
import ServicesSection from "./components/ServicesSection";
import SmoothScroll from "./components/SmoothScroll";
import WhatsAppFloat, { WHATSAPP_URL } from "./components/WhatsAppFloat";
import { clients } from "./data/clients";

const navItems = ["Servicios", "Clientes", "Nosotros", "Proceso"];

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
  role: "Fundador de Vireon",
  image: founderPhoto,
  bio: "Diseño y desarrollo sistemas a medida para negocios que necesitan ordenar su operación. Me meto en cómo vendés, entregás y gestionás el día a día, y traduzco eso en herramientas claras, útiles y listas para crecer.",
  highlights: ["Sistemas a medida", "Operación real", "Producto usable"],
  phone: "+543865454534",
  phoneLabel: "+54 3865 45-4534",
  email: "balturamirez1@gmail.com",
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

const tools = ["Stock", "Turnos", "Ventas", "Clientes", "Operaciones", "Operarios", "Facturacion", "Reportes"];

function App() {
  const currentYear = new Date().getFullYear();
  const [menuOpen, setMenuOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const lenisRef = useRef(null);

  const finishIntro = useCallback(() => {
    setIntroDone(true);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const goToSection = (sectionId) => {
    setMenuOpen(false);
    window.setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (!target) {
        return;
      }

      const headerOffset = 112;
      const top =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(top, { offset: 0, duration: 1.15 });
        return;
      }

      window.scrollTo({ top, behavior: "smooth" });
    }, 80);
  };

  return (
    <SmoothScroll paused={!introDone} lenisRef={lenisRef}>
    <main className="relative z-10 min-h-screen overflow-x-hidden text-slate-100">
      {!introDone && <PageIntro onFinish={finishIntro} />}

      <AmbientBackground />

      <div
        className={`relative z-10 transition-opacity duration-700 ease-out ${
          introDone ? "page-ready opacity-100" : "opacity-0"
        }`}
      >
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
        <nav className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
          <a
            href="#inicio"
            className="group flex items-center justify-self-start"
            aria-label="Ir al inicio"
            onClick={closeMenu}
          >
            <img
              src={logo}
              alt="Vireon"
              className="h-8 w-auto transition duration-300 group-hover:scale-105 sm:h-9"
            />
          </a>

          <div className="hidden items-center gap-8 justify-self-center rounded-full border border-white/10 bg-white/3 px-6 py-3 text-sm text-slate-300 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(event) => {
                  event.preventDefault();
                  goToSection(item.toLowerCase());
                }}
                className="transition hover:text-cyan-200"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-self-end">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/40 hover:text-white lg:inline-flex"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-[#25D366]"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escribinos
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
          </div>
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
                onClick={(event) => {
                  event.preventDefault();
                  goToSection(item.toLowerCase());
                }}
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
              className="mt-2 inline-flex w-full max-w-xs items-center justify-center gap-2 self-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-200/40 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-[#25D366]"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escribinos
            </a>
          </div>
        </div>
      </header>

      <section
        id="inicio"
        className="relative mx-auto flex min-h-[88vh] max-w-7xl scroll-mt-24 flex-col items-center justify-center px-5 pb-20 pt-28 text-center sm:px-8 sm:pb-24 sm:pt-32 lg:scroll-mt-28"
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
              href="#clientes"
              className="group inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200"
            >
              Ver clientes
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
                      onClick={(event) => {
                        event.preventDefault();
                        goToSection(item.toLowerCase());
                      }}
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
      </div>
    </main>
    </SmoothScroll>
  );
}

export default App;
