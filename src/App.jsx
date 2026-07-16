import { useCallback, useEffect, useRef, useState, startTransition } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import AmbientBackground from "./components/AmbientBackground";
import PageIntro from "./components/PageIntro";
import SmoothScroll from "./components/SmoothScroll";
import WhatsAppFloat from "./components/WhatsAppFloat";
import LandingPage from "./pages/LandingPage";
import ProjectsPage from "./pages/ProjectsPage";

const HEADER_OFFSET = 148;

function scrollToSection(sectionId, lenis) {
  const target = document.getElementById(sectionId);
  if (!target) {
    return;
  }

  if (lenis) {
    lenis.scrollTo(target, {
      offset: -HEADER_OFFSET,
      duration: 1.15,
    });
    return;
  }

  const top =
    target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
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
    setSawIntro(true);
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

  // Keep Lenis in sync when changing pages (e.g. / → /proyectos).
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      resetScroll(lenisRef.current);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname]);

  useEffect(() => {
    if (!isHome || !location.hash) {
      return undefined;
    }

    const id = location.hash.replace("#", "");
    const timer = window.setTimeout(() => {
      scrollToSection(id, lenisRef.current);
    }, 220);

    return () => window.clearTimeout(timer);
  }, [isHome, location.hash, location.pathname]);

  return (
    <SmoothScroll paused={!introDone} lenisRef={lenisRef}>
      <main className="relative z-10 min-h-screen overflow-x-clip text-slate-100">
        {isHome && !introDone && <PageIntro onFinish={finishIntro} />}

        <AmbientBackground />

        <div
          className={`relative z-10 transition-opacity duration-700 ease-out ${
            introDone ? "page-ready opacity-100" : "opacity-0"
          }`}
        >
          <Routes>
            <Route
              path="/"
              element={<LandingPage onSectionNav={goToSection} />}
            />
            <Route
              path="/proyectos"
              element={<ProjectsPage onSectionNav={goToSection} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <WhatsAppFloat />
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
