import { AbsoluteFill } from "remotion";

/** Solo el SoftBg de MolinosStory, estático, para usar en CapCut u overlays. */
export const MolinosBg = () => {
  return (
    <AbsoluteFill style={{ background: "#020617" }}>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(165deg, #01040d 0%, #04111f 40%, #071a2e 74%, #020617 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 42%, rgba(14,116,144,0.26), transparent 60%)",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 18% 78%, rgba(34,211,238,0.08), transparent 42%), radial-gradient(ellipse at 82% 22%, rgba(56,189,248,0.07), transparent 40%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          backgroundImage:
            "linear-gradient(rgba(125,211,252,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.22) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 18%, transparent 76%)",
        }}
      />
    </AbsoluteFill>
  );
};
