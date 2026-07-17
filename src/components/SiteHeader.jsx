import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/vireon-logo.svg";
import { navItems } from "../data/nav";
import { useActiveNav } from "../hooks/useActiveSection";
import PromoTopBar from "./PromoTopBar";
import { WHATSAPP_URL } from "./WhatsAppFloat";

const whatsappIcon = (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 text-[#25D366]"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function SiteHeader({ menuOpen, setMenuOpen, onSectionNav }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isItemActive, markSection } = useActiveNav();
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) {
      return undefined;
    }

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--site-header-h",
        `${Math.round(header.getBoundingClientRect().height)}px`,
      );
    };

    syncHeaderHeight();
    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(header);
    window.addEventListener("resize", syncHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeaderHeight);
    };
  }, []);

  const handleSectionClick = (event, id) => {
    event.preventDefault();
    closeMenu();
    markSection(id);

    if (location.pathname === "/" && location.hash === `#${id}`) {
      onSectionNav?.(id);
      return;
    }

    navigate({ pathname: "/", hash: id });
  };

  const linkClass =
    "transition hover:text-cyan-200 data-[active=true]:text-cyan-200";
  const mobileLinkClass =
    "rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-cyan-200 data-[active=true]:bg-white/5 data-[active=true]:text-cyan-200";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/95 lg:bg-slate-950/55 lg:backdrop-blur-2xl">
      <PromoTopBar />
      <nav className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
        <Link
          to="/"
          className="group flex items-center justify-self-start"
          aria-label="Ir al inicio"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt="Vireon"
            className="h-5 w-auto transition duration-300 group-hover:scale-105 sm:h-6 lg:h-7"
          />
        </Link>

        <div className="hidden items-center gap-8 justify-self-center rounded-full border border-white/10 bg-white/3 px-6 py-3 text-sm text-slate-300 lg:flex">
          {navItems.map((item) =>
            item.type === "route" ? (
              <Link
                key={item.label}
                to={item.to}
                data-active={isItemActive(item)}
                className={linkClass}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={`/#${item.id}`}
                data-active={isItemActive(item)}
                onClick={(event) => handleSectionClick(event, item.id)}
                className={linkClass}
              >
                {item.label}
              </a>
            ),
          )}
        </div>

        <div className="flex items-center justify-self-end">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/40 hover:text-white lg:inline-flex"
          >
            {whatsappIcon}
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
        className={`overflow-hidden border-t border-white/10 bg-slate-950/95 transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-96 opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
          {navItems.map((item) =>
            item.type === "route" ? (
              <Link
                key={item.label}
                to={item.to}
                data-active={isItemActive(item)}
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={`/#${item.id}`}
                data-active={isItemActive(item)}
                onClick={(event) => handleSectionClick(event, item.id)}
                className={mobileLinkClass}
              >
                {item.label}
              </a>
            ),
          )}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
            className="mt-2 inline-flex w-full max-w-xs items-center justify-center gap-2 self-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-200/40 hover:text-white"
          >
            {whatsappIcon}
            Escribinos
          </a>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
