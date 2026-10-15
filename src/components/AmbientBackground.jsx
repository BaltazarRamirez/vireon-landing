function AmbientBackground({ active = true }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${
        active ? "ambient-active" : "ambient-paused"
      }`}
      aria-hidden="true"
    >
      <div className="ambient-base absolute inset-0" />
      <div className="ambient-vignette absolute inset-0" />
    </div>
  );
}

export default AmbientBackground;
