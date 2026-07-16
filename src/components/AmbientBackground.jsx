function AmbientBackground({ active = true }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${
        active ? "ambient-active" : "ambient-paused"
      }`}
      aria-hidden="true"
    >
      <div className="ambient-base absolute inset-0" />
      <div className="ambient-horizon absolute inset-x-0" />
      {/* 3D floor + dust only on desktop — perspective/rotateX costs on mobile scroll. */}
      <div className="ambient-perspective absolute inset-x-0 bottom-0 hidden lg:block">
        <div className="ambient-floor" />
      </div>
      <div className="ambient-dust absolute inset-0 hidden lg:block">
        {Array.from({ length: 14 }, (_, index) => (
          <span
            key={index}
            className="ambient-mote absolute rounded-full bg-white/70"
            style={{
              left: `${6 + ((index * 17) % 88)}%`,
              top: `${10 + ((index * 23) % 70)}%`,
              width: `${1 + (index % 2)}px`,
              height: `${1 + (index % 2)}px`,
              animationDelay: `${index * 0.7}s`,
              animationDuration: `${10 + (index % 6)}s`,
            }}
          />
        ))}
      </div>
      <div className="ambient-vignette absolute inset-0" />
    </div>
  );
}

export default AmbientBackground;
