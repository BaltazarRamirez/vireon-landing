import logo from "../assets/vireon-logo.svg";

function HeroVisual() {
  return (
    <div className="relative mx-auto mb-8 flex h-28 w-full max-w-md items-center justify-center sm:mb-10 sm:h-32">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="animate-hero-aurora h-40 w-40 rounded-full bg-cyan-400/25 blur-3xl sm:h-52 sm:w-52" />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-px w-full max-w-xs bg-linear-to-r from-transparent via-cyan-300/40 to-transparent" />
      </div>
      <img
        src={logo}
        alt="Vireon"
        className="animate-hero-glow relative z-10 h-14 w-auto sm:h-16 lg:h-[4.5rem]"
      />
    </div>
  );
}

export default HeroVisual;
