export function SectionRevealIntro({
  id,
  eyebrow,
  title,
  description,
  visible,
}) {
  return (
    <div id={id} className="max-w-2xl scroll-mt-28 sm:scroll-mt-32">
      <p
        className={`reveal-copy text-xs font-medium uppercase tracking-[0.32em] text-cyan-200/90 ${
          visible ? "is-revealed" : ""
        }`}
        style={{ transitionDelay: visible ? "60ms" : "0ms" }}
      >
        {eyebrow}
      </p>
      <h2
        className={`reveal-title mt-3 text-3xl font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:mt-4 sm:text-4xl md:text-[2.75rem] ${
          visible ? "is-revealed" : ""
        }`}
        style={{ transitionDelay: visible ? "180ms" : "0ms" }}
      >
        {title}
      </h2>
      <div
        className={`reveal-rule mt-5 h-px w-24 origin-left bg-linear-to-r from-cyan-300/70 to-transparent sm:mt-6 ${
          visible ? "is-revealed" : ""
        }`}
        style={{ transitionDelay: visible ? "320ms" : "0ms" }}
        aria-hidden="true"
      />
      <p
        className={`reveal-copy mt-4 max-w-xl text-base leading-7 text-slate-400 sm:mt-5 sm:text-[17px] sm:leading-8 ${
          visible ? "is-revealed" : ""
        }`}
        style={{ transitionDelay: visible ? "420ms" : "0ms" }}
      >
        {description}
      </p>
    </div>
  );
}

export function RevealItem({
  visible,
  index = 0,
  baseDelay = 0,
  step = 140,
  children,
  className = "",
  setRef,
}) {
  return (
    <div
      ref={setRef}
      data-reveal-index={index}
      className={`reveal-card ${visible ? "is-revealed" : ""} ${className}`}
      style={{
        transitionDelay: visible ? `${baseDelay + index * step}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
