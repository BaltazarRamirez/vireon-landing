import FeaturedProjectCard from "./FeaturedProjectCard";
import { useItemReveal, useSectionReveal } from "../hooks/useReveal";
import {
  RevealItem,
  SectionRevealIntro,
} from "./sectionReveal";

function ProjectsSection({
  featuredProjects,
  placeholderProjects,
  intro,
  onOpenProject,
}) {
  const { sectionRef, visible } = useSectionReveal();
  const allCount = featuredProjects.length + placeholderProjects.length;
  const { visibleItems, setItemRef } = useItemReveal(allCount, {
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-5 pt-8 pb-10 sm:px-8 sm:pt-10 sm:pb-12 lg:pb-14"
    >
      <SectionRevealIntro {...intro} visible={visible} />

      <div className="mt-8 flex w-full flex-col gap-5 sm:mt-12">
        {featuredProjects.map((project, index) => (
          <RevealItem
            key={project.id}
            index={index}
            visible={visibleItems[index]}
            setRef={setItemRef(index)}
            baseDelay={40}
            step={0}
          >
            <FeaturedProjectCard
              project={project}
              onOpen={() => onOpenProject(project)}
            />
          </RevealItem>
        ))}

        {placeholderProjects.map((project, index) => {
          const revealIndex = featuredProjects.length + index;

          return (
            <RevealItem
              key={project.name}
              index={revealIndex}
              visible={visibleItems[revealIndex]}
              setRef={setItemRef(revealIndex)}
              baseDelay={40}
              step={0}
            >
              <article className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 px-5 py-5 shadow-[0_18px_60px_rgba(2,6,23,0.45)] transition duration-500 hover:-translate-y-1.5 hover:border-cyan-200/50 sm:px-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_16rem)] opacity-70 transition duration-500 group-hover:opacity-100" />
                <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="rounded-full border border-cyan-200/25 bg-cyan-300/10 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-100">
                        {project.category}
                      </span>
                      <span className="text-xs text-slate-500">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-xl font-semibold text-white sm:text-2xl">
                      {project.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                      {project.description}
                    </p>
                  </div>

                  <div className="w-full rounded-2xl border border-white/10 bg-white/4 p-3 sm:max-w-48">
                    <div className="mb-2.5 h-2 w-16 rounded-full bg-cyan-200/40" />
                    <div className="space-y-2">
                      <div className="h-2 rounded-full bg-white/10" />
                      <div className="h-2 w-10/12 rounded-full bg-white/10" />
                      <div className="h-2 w-7/12 rounded-full bg-cyan-300/30" />
                    </div>
                  </div>
                </div>
              </article>
            </RevealItem>
          );
        })}
      </div>
    </section>
  );
}

export default ProjectsSection;
