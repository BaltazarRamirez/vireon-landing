const navItems = ["Servicios", "Proyectos", "Nosotros", "Proceso"];

const stats = [
  { value: "24/7", label: "Sistemas listos para operar" },
  { value: "+40%", label: "Menos tareas manuales" },
  { value: "3x", label: "Decisiones mas rapidas" },
];

const services = [
  {
    title: "Sistemas a medida",
    description:
      "Creamos plataformas internas para ventas, stock, turnos, clientes y operaciones diarias.",
    icon: "01",
  },
  {
    title: "Automatizaciones",
    description:
      "Conectamos herramientas, reducimos carga manual y dejamos procesos repetibles funcionando solos.",
    icon: "02",
  },
  {
    title: "Dashboards comerciales",
    description:
      "Convertimos datos dispersos en paneles claros para entender ventas, margen y rendimiento.",
    icon: "03",
  },
  {
    title: "Integraciones",
    description:
      "Unimos pagos, WhatsApp, planillas, ERPs y APIs para que tu negocio trabaje como una unidad.",
    icon: "04",
  },
];

const projects = [
  {
    name: "Gestor de ventas",
    category: "Comercios",
    description:
      "Panel para pedidos, clientes, estados y seguimiento de caja diaria.",
  },
  {
    name: "Control operativo",
    category: "Pymes",
    description:
      "Sistema interno para tareas, responsables, vencimientos y reportes.",
  },
  {
    name: "Portal de clientes",
    category: "Servicios",
    description:
      "Acceso privado para pagos, solicitudes, documentos y soporte.",
  },
];

const process = [
  "Diagnostico del negocio",
  "Prototipo visual",
  "Desarrollo iterativo",
  "Entrega y mejora continua",
];

const tools = ["React", "Dashboards", "Automatizacion", "APIs", "UX", "Datos"];

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-glow absolute -left-48 top-24 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="animate-glow delay-300 absolute -right-40 top-0 h-120 w-120 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.06)_1px,transparent_1px)] bg-size-[72px_72px] mask-[radial-gradient(circle_at_top,black,transparent_72%)]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#inicio"
            className="group flex items-center gap-3"
            aria-label="Ir al inicio"
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan-300/40 bg-cyan-400/10 shadow-[0_0_35px_rgba(34,211,238,0.35)] transition duration-300 group-hover:scale-105 group-hover:bg-cyan-400/20">
              <span className="h-4 w-4 rounded-md bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,0.9)]" />
            </span>
            <span className="text-lg font-black tracking-[0.22em] text-white">
              VIREON
            </span>
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
            href="#contacto"
            className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(103,232,249,0.45)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            Hablemos
          </a>
        </nav>
      </header>

      <section
        id="inicio"
        className="relative mx-auto grid wh gap-12 px-5 pb-24 pt-36 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-32 lg:pt-44"
      >
        <div className="relative z-10">
          <div className="animate-rise inline-flex items-center gap-3 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 shadow-[0_0_30px_rgba(14,165,233,0.15)]">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,1)]" />
            Sistemas digitales para pymes y comercios
          </div>

          <h1 className="animate-rise delay-100 mt-8 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            Software que hace que tu negocio se vea y funcione de otra liga.
          </h1>

          <p className="animate-rise delay-200 mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            En Vireon disenamos sistemas modernos para ordenar operaciones,
            automatizar tareas y darle a tu pyme una experiencia digital que tus
            clientes y tu equipo sientan premium desde el primer click.
          </p>

          <div className="animate-rise delay-300 mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#proyectos"
              className="group rounded-full bg-white px-7 py-4 text-center font-bold text-slate-950 shadow-[0_0_45px_rgba(255,255,255,0.22)] transition duration-300 hover:-translate-y-1 hover:bg-cyan-200"
            >
              Ver proyectos
              <span className="ml-2 inline-block transition duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="#servicios"
              className="rounded-full border border-cyan-200/30 bg-white/5 px-7 py-4 text-center font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-200/70 hover:bg-cyan-300/10"
            >
              Que hacemos
            </a>
          </div>

          <div className="animate-rise delay-500 mt-12 grid max-w-2xl grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/4 p-4 backdrop-blur-xl"
              >
                <p className="text-2xl font-black text-cyan-200">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-rise delay-200 relative z-10">
          <div className="animate-float relative rounded-4xl border border-cyan-200/20 bg-slate-950/75 p-4 shadow-[0_30px_120px_rgba(8,47,73,0.7)] backdrop-blur-2xl">
            <div className="absolute -inset-1 -z-10 rounded-[2.2rem] bg-linear-to-br from-cyan-300/35 via-blue-600/25 to-transparent blur-2xl" />
            <div className="rounded-[1.6rem] border border-white/10 bg-linear-to-br from-slate-900 to-blue-950/80 p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">
                    Vireon OS
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-white">
                    Panel operativo
                  </h2>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  Online
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/4 p-5">
                  <p className="text-sm text-slate-400">Ventas del mes</p>
                  <p className="mt-3 text-4xl font-black text-white">$8.4M</p>
                  <div className="mt-5 h-2 rounded-full bg-slate-800">
                    <div className="h-2 w-4/5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-cyan-300/10 p-5">
                  <p className="text-sm text-cyan-100">Automatizaciones</p>
                  <p className="mt-3 text-4xl font-black text-white">18</p>
                  <p className="mt-5 text-sm leading-6 text-slate-300">
                    Flujos activos reduciendo carga operativa todos los dias.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-white/3.5 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-bold text-white">Pedidos en vivo</p>
                  <p className="text-sm text-cyan-200">+32% esta semana</p>
                </div>
                {[78, 48, 92, 64, 84, 52, 88].map((height, index) => (
                  <span
                    key={height + index}
                    className="mr-2 inline-block w-[10%] rounded-t-xl bg-linear-to-t from-blue-700 to-cyan-300 align-bottom shadow-[0_0_18px_rgba(34,211,238,0.25)]"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
            </div>
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
        className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8"
      >
        <SectionIntro
          eyebrow="Servicios"
          title="Sistemas pensados para vender mas, ordenar mejor y escalar sin caos."
          description="No hacemos software para decorar. Hacemos herramientas que bajan a tierra tu operacion y la vuelven mas clara, rapida y medible."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-4xl border border-white/10 bg-white/4.5 p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-cyan-200/50 hover:bg-cyan-300/8 hover:shadow-[0_30px_80px_rgba(8,145,178,0.18)]"
            >
              <div className="mb-8 inline-flex rounded-2xl border border-cyan-200/25 bg-cyan-300/10 px-4 py-3 text-sm font-black text-cyan-100 transition group-hover:scale-105 group-hover:bg-cyan-300/20">
                {service.icon}
              </div>
              <h3 className="text-2xl font-black text-white">
                {service.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-400">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="proyectos"
        className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8"
      >
        <SectionIntro
          eyebrow="Proyectos"
          title="Un espacio para mostrar lo que Vireon puede construir."
          description="Dejo estos casos como placeholders para que despues podamos convertir cada uno en un componente real, con imagenes, metricas y capturas."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.name}
              className="group relative min-h-104 overflow-hidden rounded-4xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_20px_80px_rgba(2,6,23,0.5)] transition duration-500 hover:-translate-y-2 hover:border-cyan-200/50"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_18rem)] opacity-70 transition duration-500 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="rounded-full border border-cyan-200/25 bg-cyan-300/10 px-3 py-1 font-bold text-cyan-100">
                      {project.category}
                    </span>
                    <span className="text-slate-500">0{index + 1}</span>
                  </div>
                  <h3 className="mt-10 text-3xl font-black text-white">
                    {project.name}
                  </h3>
                  <p className="mt-4 leading-7 text-slate-400">
                    {project.description}
                  </p>
                </div>

                <div className="mt-10 rounded-3xl border border-white/10 bg-white/4 p-4">
                  <div className="mb-4 h-3 w-28 rounded-full bg-cyan-200/40" />
                  <div className="space-y-3">
                    <div className="h-3 rounded-full bg-white/10" />
                    <div className="h-3 w-10/12 rounded-full bg-white/10" />
                    <div className="h-3 w-7/12 rounded-full bg-cyan-300/30" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="nosotros"
        className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8"
      >
        <div className="grid gap-8 rounded-[2.5rem] border border-white/10 bg-white/4.5 p-6 backdrop-blur-2xl md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-200">
              Sobre nosotros
            </p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.04em] text-white md:text-6xl">
              Vireon nace para que las pymes tengan software con nivel startup.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-slate-300">
            <p>
              Nos metemos en la operacion real: como vendes, como entregas,
              donde se pierde tiempo y que informacion necesitas para decidir
              mejor.
            </p>
            <p>
              A partir de eso disenamos sistemas claros, rapidos y escalables.
              Sin vueltas innecesarias, con una interfaz que el equipo pueda
              usar y con una base tecnica preparada para crecer.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {["Estrategia", "Producto", "Tecnologia"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-cyan-200/20 bg-cyan-300/10 p-4 text-sm font-bold text-cyan-100"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="proceso"
        className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8"
      >
        <SectionIntro
          eyebrow="Proceso"
          title="De una idea desordenada a un sistema listo para operar."
          description="Trabajamos por etapas cortas para que veas avance real, pruebes rapido y podamos ajustar con criterio."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {process.map((step, index) => (
            <div
              key={step}
              className="relative rounded-4xl border border-white/10 bg-slate-950/60 p-6"
            >
              <span className="text-sm font-black text-cyan-200">
                0{index + 1}
              </span>
              <h3 className="mt-6 text-2xl font-black text-white">{step}</h3>
              <p className="mt-4 leading-7 text-slate-400">
                Validamos lo importante antes de avanzar y convertimos cada
                etapa en una decision concreta.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="contacto"
        className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] border border-cyan-200/25 bg-linear-to-br from-cyan-300 via-blue-500 to-blue-900 p-8 text-slate-950 shadow-[0_40px_120px_rgba(14,165,233,0.35)] md:p-14">
          <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-950/70">
              Empecemos
            </p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tighter md:text-6xl">
              Hagamos que tu negocio tenga el sistema que se merece.
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-950/80">
              Contame que vendes, que proceso queres ordenar y que te gustaria
              automatizar. Armamos una primera version potente y la vamos
              puliendo con foco comercial.
            </p>
            <a
              href="mailto:hola@vireon.com"
              className="mt-9 inline-flex rounded-full bg-slate-950 px-7 py-4 font-black text-white transition duration-300 hover:-translate-y-1 hover:bg-blue-950"
            >
              Contactar a Vireon
            </a>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500 sm:px-8">
        <p>
          &copy; {currentYear} Vireon. Sistemas para pymes, comercios y equipos
          que quieren crecer.
        </p>
      </footer>
    </main>
  );
}

function SectionIntro({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-200">
        {eyebrow}
      </p>
      <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.04em] text-white md:text-6xl">
        {title}
      </h2>
      <p className="mt-6 text-lg leading-8 text-slate-400">{description}</p>
    </div>
  );
}

export default App;
