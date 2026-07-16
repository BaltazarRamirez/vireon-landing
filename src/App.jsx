import { useCallback, useEffect, useRef, useState, startTransition } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import AmbientBackground from "./components/AmbientBackground";
import PageIntro from "./components/PageIntro";
import SmoothScroll from "./components/SmoothScroll";
import WhatsAppFloat from "./components/WhatsAppFloat";
import LandingPage from "./pages/LandingPage";
import ProjectsPage from "./pages/ProjectsPage";

function getNavScrollOffset() {
  const header = document.querySelector("header");
  const headerHeight = header?.getBoundingClientRect().height ?? 120;
  // Extra gap so the first text sits clear of the sticky header.
  return Math.round(headerHeight + 28);
}

function getSectionScrollTarget(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) {
    return null;
  }

  return (
    section.querySelector("[data-section-anchor]") ||
    section
  );
}

function scrollToSection(sectionId, lenis) {
  const target = getSectionScrollTarget(sectionId);
  if (!target) {
    return;
  }

  const offset = getNavScrollOffset();

  if (lenis) {
    lenis.scrollTo(target, {
      offset: -offset,
      duration: 1.15,
    });
    return;
  }

  const top =
    target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

function resetScroll(lenis) {
  if (lenis) {
    lenis.resize();
    lenis.scrollTo(0, { immediate: true });
    return;
  }

  window.scrollTo(0, 0);
}

function AppShell() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [sawIntro, setSawIntro] = useState(
    () => typeof window !== "undefined" && Boolean(window.location.hash),
  );
  const [skipHomeIntro, setSkipHomeIntro] = useState(
    () => typeof window !== "undefined" && window.location.pathname !== "/",
  );
  const lenisRef = useRef(null);
  const introDone = !isHome || sawIntro || skipHomeIntro;

  const finishIntro = useCallback(() => {
    // Let PageIntro unmount/paint settle before lighting up the page.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setSawIntro(true);
      });
    });
  }, []);

  const goToSection = useCallback((sectionId) => {
    window.setTimeout(() => {
      scrollToSection(sectionId, lenisRef.current);
    }, 80);
  }, []);

  useEffect(() => {
    if (!isHome) {
      startTransition(() => {
        setSkipHomeIntro(true);
      });
    }
  }, [isHome]);

  // Reset scroll on route changes, except when home opens with a section hash.
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      resetScroll(lenisRef.current);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  // Scroll to the section whenever the hash changes on home.
  useEffect(() => {
    if (!isHome || !location.hash) {
      return undefined;
    }

    const id = location.hash.replace("#", "");
    const timer = window.setTimeout(() => {
      scrollToSection(id, lenisRef.current);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [isHome, location.hash, location.key]);

  return (
    <SmoothScroll paused={!introDone} lenisRef={lenisRef}>
      <main className="relative z-10 min-h-screen overflow-x-clip text-slate-100">
        {isHome && !introDone && <PageIntro onFinish={finishIntro} />}

        <AmbientBackground active={introDone} />

        {introDone ? (
          <div className="page-ready relative z-10 animate-[fadeIn_0.45s_ease-out]">
            <Routes>
              <Route
                path="/"
                element={
                  <LandingPage onSectionNav={goToSection} ready />
                }
              />
              <Route
                path="/proyectos"
                element={<ProjectsPage onSectionNav={goToSection} />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        ) : null}

        {introDone ? <WhatsAppFloat /> : null}
      </main>
    </SmoothScroll>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
