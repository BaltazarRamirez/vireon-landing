import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/vireon_logo_blanco_transparente_4096.png";
import { navItems } from "../data/nav";
import { WHATSAPP_URL } from "./WhatsAppFloat";

function SiteFooter({ onSectionNav }) {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (event, id) => {
    event.preventDefault();

    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: id });
      return;
    }

    onSectionNav?.(id);
  };

  return (
    <footer className="relative border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 sm:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <img src={logo} alt="Vireon" className="h-8 w-auto opacity-80" />
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Sistemas a medida para ordenar la operación, ganar control y hacer
              crecer el negocio.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-200/80">
                Navegación
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                {navItems.map((item) =>
                  item.type === "route" ? (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.label}
                      href={`/#${item.id}`}
                      onClick={(event) => handleSectionClick(event, item.id)}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {item.label}
                    </a>
                  ),
                )}
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
          <Link
            to="/"
            className="text-sm text-slate-500 transition hover:text-cyan-200"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
