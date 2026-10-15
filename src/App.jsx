import { useCallback, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AmbientBackground from "./components/AmbientBackground";
import FloatingNav from "./components/FloatingNav";
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
  const isHome = location.pathname === "/";
  const lenisRef = useRef(null);
  const scrollingToSection = useRef(false);

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

    const top = () => resetScroll(lenisRef.current);
    top();
    const frame = window.requestAnimationFrame(top);
    const onLoad = () => {
      top();
      window.requestAnimationFrame(top);
    };
    window.addEventListener("load", onLoad);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
    };
  }, []);

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

  useEffect(() => {
    if (!isHome || !location.hash) {
      return undefined;
    }

    const wasReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";
    if (wasReload) {
      resetScroll(lenisRef.current);
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
  }, [isHome, location.hash, location.key]);

  return (
    <SmoothScroll paused={false} lenisRef={lenisRef}>
      <main className="relative z-10 min-h-screen overflow-x-clip text-zinc-100">
        <AmbientBackground />
        <div className="page-ready relative z-10">
          <FloatingNav onSectionNav={goToSection} />
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
