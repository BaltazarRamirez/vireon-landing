import logo from "../assets/vireon-logo.svg";

function HeroVisual({ rich = false }) {
  return (
    <div className="relative mx-auto mb-5 flex flex-col items-center sm:mb-6">
      <div className="relative flex items-center justify-center">
        {rich ? (
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/25 blur-3xl sm:h-36 sm:w-36"
            aria-hidden="true"
          />
        ) : (
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-2xl"
            aria-hidden="true"
          />
        )}
        <img
          src={logo}
          alt="Vireon"
          className={`relative z-10 h-14 w-auto sm:h-16 ${
            rich ? "animate-hero-glow lg:h-[4.25rem]" : ""
          }`}
        />
      </div>
      <div className="mt-4 h-px w-16 bg-linear-to-r from-transparent via-cyan-300/70 to-transparent" />
      <p className="mt-3 text-[11px] font-medium tracking-[0.3em] text-cyan-200/85 uppercase sm:text-xs">
        Desarrollo de software
      </p>
    </div>
  );
}

export default HeroVisual;
