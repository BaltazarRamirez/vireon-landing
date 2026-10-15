import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import About from "../components/landing/About";
import FinalCta from "../components/landing/FinalCta";
import LogoStrip from "../components/landing/LogoStrip";
import Manifesto from "../components/landing/Manifesto";
import Metrics from "../components/landing/Metrics";
import Process from "../components/landing/Process";
import Services from "../components/landing/Services";
import Showcase from "../components/landing/Showcase";
import Voices from "../components/landing/Voices";
import ProjectModal from "../components/ProjectModal";
import SiteFooter from "../components/SiteFooter";
import { refreshScrollTriggers } from "../lib/gsap";

function LandingPage({ onSectionNav }) {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    refreshScrollTriggers();

    const onLoad = () => refreshScrollTriggers();
    window.addEventListener("load", onLoad);

    let lastHeight = document.body.scrollHeight;
    let timer;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const height = document.body.scrollHeight;
        if (Math.abs(height - lastHeight) < 2) return;
        refreshScrollTriggers();
        lastHeight = document.body.scrollHeight;
      }, 200);
    });
    observer.observe(document.body);

    return () => {
      window.removeEventListener("load", onLoad);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <HeroSection />
      <LogoStrip />
      <Manifesto />
      <Services />
      <Showcase onOpenProject={setSelectedProject} />
      <Voices />
      <Metrics />
      <Process />
      <About />
      <FinalCta />

      <SiteFooter onSectionNav={onSectionNav} />

      <ProjectModal
        key={selectedProject?.id ?? "closed"}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

export default LandingPage;
