import { useCallback, useEffect, useRef, useState, startTransition } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AmbientBackground from "./components/AmbientBackground";
import PageIntro from "./components/PageIntro";
import SmoothScroll from "./components/SmoothScroll";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { scrollToSectionWhenReady } from "./lib/scrollToSection";
import LandingPage from "./pages/LandingPage";
import ProjectsPage from "./pages/ProjectsPage";

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
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [sawIntro, setSawIntro] = useState(false);
  const [skipHomeIntro, setSkipHomeIntro] = useState(
    () => typeof window !== "undefined" && window.location.pathname !== "/",
  );
  const lenisRef = useRef(null);
  const scrollingToSection = useRef(false);
  const introDone = !isHome || sawIntro || skipHomeIntro;

  const finishIntro = useCallback(() => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setSawIntro(true);
        resetScroll(lenisRef.current);
      });
    });
  }, []);

  const goToSection = useCallback((sectionId) => {
    scrollingToSection.current = true;
    window.setTimeout(() => {
      scrollToSectionWhenReady(sectionId, lenisRef.current);
      window.setTimeout(() => {
        scrollingToSection.current = false;
      }, 900);
    }, 40);
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Reload / first paint on home: always start at the top with the intro.
  useEffect(() => {
    if (!isHome || sawIntro) {
      return;
    }

    if (location.hash) {
      navigate("/", { replace: true });
    }

    resetScroll(lenisRef.current);
  }, [isHome, sawIntro, location.hash, navigate]);

  useEffect(() => {
    if (!isHome) {
      startTransition(() => {
        setSkipHomeIntro(true);
      });
    }
  }, [isHome]);

  // Reset scroll on bare route changes only — never while navigating to a section.
  useEffect(() => {
    if (scrollingToSection.current) {
      return undefined;
    }

    if (location.pathname === "/" && location.hash) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      if (!scrollingToSection.current) {
        resetScroll(lenisRef.current);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  // After intro, scroll to the first text of the hashed section and center it.
  useEffect(() => {
    if (!isHome || !location.hash || !introDone) {
      return undefined;
    }

    const id = location.hash.replace("#", "");
    scrollingToSection.current = true;

    const timer = window.setTimeout(() => {
      scrollToSectionWhenReady(id, lenisRef.current);
      window.setTimeout(() => {
        scrollingToSection.current = false;
      }, 900);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [isHome, location.hash, location.key, introDone]);

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
