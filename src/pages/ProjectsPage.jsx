import { useEffect, useState } from "react";
import FinalCta from "../components/landing/FinalCta";
import ProjectCases from "../components/landing/ProjectCases";
import ProjectsHero from "../components/landing/ProjectsHero";
import ProjectModal from "../components/ProjectModal";
import SiteFooter from "../components/SiteFooter";
import { refreshScrollTriggers } from "../lib/gsap";

function ProjectsPage({ onSectionNav }) {
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
        if (Math.abs(height - lastHeight) < 2) {
          return;
        }
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
      <ProjectsHero />
      <ProjectCases onOpenProject={setSelectedProject} />
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

export default ProjectsPage;
