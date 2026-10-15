import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/vireon-logo.svg";
import { navItems } from "../data/nav";
import { useActiveNav } from "../hooks/useActiveSection";
import { goToHome } from "../lib/goHome";
import { easeOutExpo } from "../lib/motion";
import { WHATSAPP_URL } from "./WhatsAppFloat";

const whatsappIcon = (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#25D366]" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function itemKey(item) {
  return item.type === "route" ? item.to : item.id;
}

function FloatingNav({ onSectionNav }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isItemActive, markSection } = useActiveNav();
  const reduceMotion = useReducedMotion();
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuForPath, setMenuForPath] = useState(location.pathname);
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  if (menuForPath !== location.pathname) {
    setMenuForPath(location.pathname);
    setMenuOpen(false);
  }

  const closeMenu = () => setMenuOpen(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    const threshold = location.pathname === "/proyectos" ? 140 : 360;
    setVisible(menuOpen || value > threshold);
  });

  useEffect(() => {
    if (!visible) {
      document.documentElement.style.setProperty("--site-header-h", "0px");
      return undefined;
    }

    const sync = () => {
      const bottom = navRef.current?.getBoundingClientRect().bottom ?? 0;
      document.documentElement.style.setProperty("--site-header-h", `${Math.round(bottom)}px`);
    };

    sync();
    const observer = new ResizeObserver(sync);
    if (navRef.current) {
      observer.observe(navRef.current);
    }
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [visible, menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    window.dispatchEvent(new Event("lenis:stop"));
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      window.dispatchEvent(new Event("lenis:start"));
    };
  }, [menuOpen]);

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
    "rounded-full px-3 py-1.5 text-[13px] text-zinc-400 transition hover:text-white data-[active=true]:bg-white/10 data-[active=true]:text-white";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <AnimatePresence>
        {visible ? (
          <motion.nav
            ref={navRef}
            key="floating-nav"
            className="pointer-events-auto w-full max-w-3xl"
            initial={reduceMotion ? false : { y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: -18, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            aria-label="Navegación"
          >
            <div className="flex items-center gap-3 rounded-full border border-white/12 bg-black/75 px-2 py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-2.5">
              <Link
                to="/"
                onClick={(event) => {
                  closeMenu();
                  goToHome(event, navigate, location);
                }}
                className="shrink-0 rounded-full px-3 py-1.5"
                aria-label="Vireon · Inicio"
              >
                <img src={logo} alt="Vireon" className="h-3.5 w-auto sm:h-4" />
              </Link>

              <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
                {navItems.map((item) => {
                  const active = isItemActive(item);
                  if (item.type === "route") {
                    return (
                      <Link key={itemKey(item)} to={item.to} data-active={active} className={linkClass}>
                        {item.label}
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={itemKey(item)}
                      href={`/#${item.id}`}
                      data-active={active}
                      className={linkClass}
                      onClick={(event) => handleSectionClick(event, item.id)}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-black transition hover:bg-zinc-200 lg:inline-flex"
              >
                {whatsappIcon}
                Escribinos
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="ml-auto grid h-9 w-9 place-items-center rounded-full text-white lg:hidden"
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
              >
                <span className="relative block h-3 w-3.5">
                  <span
                    className={`absolute left-0 block h-px w-3.5 bg-current transition ${
                      menuOpen ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute top-1.5 left-0 block h-px w-3.5 bg-current transition ${
                      menuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-px w-3.5 bg-current transition ${
                      menuOpen ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {menuOpen ? (
                <motion.div
                  key="floating-mobile"
                  className="mt-2 overflow-hidden rounded-2xl border border-white/12 bg-black/90 backdrop-blur-xl lg:hidden"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: easeOutExpo }}
                >
                  <div className="flex flex-col gap-1 p-2">
                    {navItems.map((item) => {
                      const active = isItemActive(item);
                      const className =
                        "block rounded-xl px-4 py-2.5 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white data-[active=true]:bg-white/8 data-[active=true]:text-white";

                      if (item.type === "route") {
                        return (
                          <Link
                            key={itemKey(item)}
                            to={item.to}
                            data-active={active}
                            onClick={closeMenu}
                            className={className}
                          >
                            {item.label}
                          </Link>
                        );
                      }

                      return (
                        <a
                          key={itemKey(item)}
                          href={`/#${item.id}`}
                          data-active={active}
                          onClick={(event) => handleSectionClick(event, item.id)}
                          className={className}
                        >
                          {item.label}
                        </a>
                      );
                    })}
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      onClick={closeMenu}
                      className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black"
                    >
                      {whatsappIcon}
                      Escribinos
                    </a>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default FloatingNav;
