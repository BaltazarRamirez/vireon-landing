import { useState } from "react";
import { Link } from "react-router-dom";
import FlagshipProject from "../components/FlagshipProject";
import ProjectModal from "../components/ProjectModal";
import ProjectsSection from "../components/ProjectsSection";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import {
  featuredProjects,
  flagshipProject,
  placeholderProjects,
} from "../data/projects";

function ProjectsPage({ onSectionNav }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onSectionNav={onSectionNav}
      />

      <div className="relative z-10 pt-32 sm:pt-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-200"
          >
            <span aria-hidden="true">&larr;</span>
            Volver al inicio
          </Link>
        </div>

        <ProjectsSection
          featuredProjects={featuredProjects}
          placeholderProjects={placeholderProjects}
          onOpenProject={setSelectedProject}
          intro={{
            id: "proyectos",
            eyebrow: "Proyectos",
            title: "Sistemas a medida para negocios que necesitan operar mejor.",
            description:
              "Construimos plataformas claras para ordenar ventas, stock, turnos y el día a día de cada operación.",
          }}
        />

        <FlagshipProject
          project={flagshipProject}
          onOpen={setSelectedProject}
        />
      </div>

      <ProjectModal
        key={selectedProject?.id ?? "closed"}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <SiteFooter onSectionNav={onSectionNav} />
    </>
  );
}

export default ProjectsPage;
