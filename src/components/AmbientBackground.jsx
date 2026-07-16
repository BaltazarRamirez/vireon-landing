function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="ambient-base absolute inset-0" />

      <div className="ambient-beam ambient-beam-1 absolute" />
      <div className="ambient-beam ambient-beam-2 absolute" />
      <div className="ambient-beam ambient-beam-3 absolute" />

      <div className="ambient-stars absolute inset-0">
        {Array.from({ length: 28 }, (_, index) => (
          <span
            key={index}
            className="ambient-star absolute rounded-full bg-cyan-100/80"
            style={{
              top: `${(index * 37) % 100}%`,
              left: `${(index * 53) % 100}%`,
              width: `${1 + (index % 3)}px`,
              height: `${1 + (index % 3)}px`,
              animationDelay: `${(index % 9) * 0.45}s`,
              animationDuration: `${4.5 + (index % 5)}s`,
            }}
          />
        ))}
      </div>

      <div className="ambient-scan absolute inset-x-0" />
      <div className="ambient-vignette absolute inset-0" />
    </div>
  );
}

export default AmbientBackground;
