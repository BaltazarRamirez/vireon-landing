import { useEffect, useState } from "react";

function ProjectModal({ project, onClose }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.dispatchEvent(new CustomEvent("lenis:stop"));

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.dispatchEvent(new CustomEvent("lenis:start"));
    };
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  const hasGallery = project.gallery?.length > 0;
  const hasMultipleImages = hasGallery && project.gallery.length > 1;
  const currentImage = hasGallery ? project.gallery[activeImage] : null;

  const showPreviousImage = () => {
    setActiveImage((index) =>
      index === 0 ? project.gallery.length - 1 : index - 1,
    );
  };

  const showNextImage = () => {
    setActiveImage((index) =>
      index === project.gallery.length - 1 ? 0 : index + 1,
    );
  };

  return (
    <div
      className="animate-modal-backdrop fixed inset-0 z-100 flex items-end justify-center bg-slate-950/80 p-0 backdrop-blur-md sm:items-center sm:p-5"
      onClick={onClose}
      role="presentation"
      data-lenis-prevent
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-slate-950/90 text-xl text-slate-200 shadow-[0_8px_30px_rgba(2,6,23,0.45)] transition hover:border-cyan-200/40 hover:text-white sm:top-8 sm:right-8"
        aria-label="Cerrar detalle del proyecto"
      >
        &times;
      </button>

      <div
        className="animate-modal-panel relative mt-16 flex max-h-[calc(94vh-4rem)] w-full max-w-6xl flex-col overflow-hidden rounded-t-4xl border border-white/10 bg-slate-950 shadow-[0_40px_120px_rgba(2,6,23,0.75)] sm:mt-0 sm:max-h-[94vh] sm:rounded-4xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        data-lenis-prevent
      >
        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
          data-lenis-prevent
        >
          <div className="relative flex h-56 shrink-0 items-center justify-center overflow-hidden bg-slate-900 sm:h-72">
            {currentImage ? (
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="h-full w-full object-contain"
              />
            ) : project.image ? (
              <img
                src={project.image}
                alt={project.name}
                className="max-h-64 w-auto max-w-[92%] object-contain sm:max-h-72"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-3xl border border-cyan-200/30 bg-cyan-300/10 text-2xl font-semibold tracking-[0.12em] text-cyan-100">
                  {project.name?.[0] || "V"}
                </div>
                <p className="text-sm font-medium text-slate-400">
                  {project.partnership || project.name}
                </p>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />
            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  onClick={showPreviousImage}
                  className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-slate-950/70 text-white transition hover:border-cyan-200/40"
                  aria-label="Imagen anterior"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  onClick={showNextImage}
                  className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-slate-950/70 text-white transition hover:border-cyan-200/40"
                  aria-label="Imagen siguiente"
                >
                  &rarr;
                </button>
              </>
            )}
          </div>

          {hasMultipleImages && (
            <div className="flex gap-3 overflow-x-auto border-b border-white/10 px-5 py-4 sm:px-8">
              {project.gallery.map((image, index) => (
                <button
                  key={image.alt + index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`h-16 w-24 shrink-0 overflow-hidden rounded-2xl border transition ${
                    index === activeImage
                      ? "border-cyan-300/70 shadow-[0_0_20px_rgba(103,232,249,0.25)]"
                      : "border-white/10 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Ver imagen ${index + 1}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="space-y-10 p-5 sm:p-8 lg:p-10">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {project.badge && (
                  <span className="rounded-full border border-cyan-200/35 bg-cyan-300/15 px-3 py-1 text-xs font-semibold text-cyan-100">
                    {project.badge}
                  </span>
                )}
                {project.partnership && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                    {project.partnership}
                  </span>
                )}
                <span className="rounded-full border border-cyan-200/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                  {project.category}
                </span>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2
                id="project-modal-title"
                className="mt-5 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl"
              >
                {project.name}
              </h2>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                {project.fullDescription}
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/4 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/90">
                  El desafío
                </p>
                <p className="mt-4 flex-1 leading-7 text-slate-300">
                  {project.challenge}
                </p>
              </div>

              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/4 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/90">
                  La solución
                </p>
                <p className="mt-4 flex-1 leading-7 text-slate-300">
                  {project.solution}
                </p>
              </div>
            </div>

            {project.locations?.length > 0 && (
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/90">
                  Sucursales
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {project.locations.map((location) => (
                    <span
                      key={location}
                      className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm font-semibold text-white"
                    >
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.roles?.length > 0 && (
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/90">
                  Roles de acceso
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {project.roles.map((role) => (
                    <span
                      key={role}
                      className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm font-semibold text-white"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/90">
                Funcionalidades principales
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-stretch">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex h-full min-h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/3 px-4 py-3 text-sm leading-6 text-slate-300"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
                    <span className="min-w-0 flex-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.products && (
              <div className="rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 to-blue-950/50 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/90">
                  Productos gestionados
                </p>
                <p className="mt-4 leading-7 text-slate-300">{project.products}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
