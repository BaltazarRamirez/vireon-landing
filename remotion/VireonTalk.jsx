import {
  AbsoluteFill,
  Easing,
  Img,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const VIDEO_SRC = "vireon-nuevo.mp4";
const VIDEO_DURATION_SEC = 45.77;

function SoftBg({ frame }) {
  const breathe = 0.5 + Math.sin(frame / 40) * 0.08;
  return (
    <AbsoluteFill>
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
          opacity: breathe,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage:
            "linear-gradient(rgba(125,211,252,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.22) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 18%, transparent 76%)",
        }}
      />
    </AbsoluteFill>
  );
}

function SceneLogo({ frame, fps }) {
  const enter = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });
  const tag = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 130 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity: enter,
          transform: `scale(${0.86 + enter * 0.14})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        <Img
          src={staticFile("vireon-logo.svg")}
          style={{ width: 820, height: "auto" }}
        />
        <p
          style={{
            margin: 0,
            opacity: tag,
            transform: `translateY(${(1 - tag) * 14}px)`,
            color: "rgba(165,243,252,0.92)",
            fontSize: 34,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Sistemas a medida
        </p>
      </div>
    </AbsoluteFill>
  );
}

function SceneTalk({ frame, fps }) {
  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Captions provisorias — las cambiamos cuando me pases el guión exacto
  const captions = [
    { start: 20, end: 95, text: "Hola, soy Vireon" },
    { start: 100, end: 200, text: "Software a medida para tu negocio" },
    { start: 210, end: 320, text: "Ordenamos tu operación real" },
    { start: 330, end: 450, text: "Del papel al sistema" },
    { start: 460, end: 600, text: "Clientes que ya están operando" },
    { start: 620, end: 780, text: "¿Querés lo mismo para tu negocio?" },
  ];

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <OffthreadVideo
          src={staticFile(VIDEO_SRC)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
          }}
          muted
        />
      </AbsoluteFill>

      {/* Overlay oscuro suave para legibilidad (sin blur) */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.45) 0%, rgba(2,6,23,0.12) 28%, rgba(2,6,23,0.12) 58%, rgba(2,6,23,0.72) 100%)",
        }}
      />

      {/* Logo arriba, debajo del perfil de IG */}
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 40,
          right: 40,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Img
          src={staticFile("vireon-logo.svg")}
          style={{ width: 280, height: "auto" }}
        />
        <div
          style={{
            padding: "10px 18px",
            borderRadius: 999,
            border: "1px solid rgba(165,243,252,0.35)",
            background: "rgba(2,6,23,0.55)",
            color: "#a5f3fc",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Sistemas a medida
        </div>
      </div>

      {/* Captions centradas abajo */}
      {captions.map((cap) => {
        const opacity = interpolate(
          frame,
          [cap.start, cap.start + 10, cap.end - 10, cap.end],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const y = interpolate(frame, [cap.start, cap.start + 10], [22, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        const enter = spring({
          frame: frame - cap.start,
          fps,
          config: { damping: 14, stiffness: 140 },
        });

        return (
          <div
            key={`${cap.start}-${cap.text}`}
            style={{
              position: "absolute",
              left: 36,
              right: 36,
              bottom: 160,
              textAlign: "center",
              opacity: opacity * enter,
              transform: `translateY(${y}px)`,
            }}
          >
            <p
              style={{
                margin: 0,
                display: "inline-block",
                padding: "18px 28px",
                borderRadius: 22,
                border: "1px solid rgba(165,243,252,0.28)",
                background: "rgba(2,6,23,0.72)",
                color: "#fff",
                fontSize: 40,
                fontWeight: 650,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
              }}
            >
              {cap.text}
            </p>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

function SceneEnd({ frame, fps }) {
  const logo = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110, mass: 0.85 },
  });
  const title = spring({
    frame: frame - 12,
    fps,
    config: { damping: 15, stiffness: 120 },
  });
  const cta = spring({
    frame: frame - 22,
    fps,
    config: { damping: 16, stiffness: 130 },
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 48px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          textAlign: "center",
          width: "100%",
          maxWidth: 920,
        }}
      >
        <Img
          src={staticFile("vireon-logo.svg")}
          style={{
            width: 760,
            height: "auto",
            opacity: logo,
            transform: `scale(${0.88 + logo * 0.12})`,
          }}
        />
        <h2
          style={{
            margin: 0,
            opacity: title,
            transform: `translateY(${(1 - title) * 20}px)`,
            color: "#fff",
            fontSize: 56,
            fontWeight: 650,
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
          }}
        >
          Contanos qué querés ordenar
        </h2>
        <div
          style={{
            opacity: cta,
            transform: `scale(${0.94 + cta * 0.06})`,
            padding: "28px 48px",
            borderRadius: 999,
            border: "1px solid rgba(165,243,252,0.5)",
            background:
              "linear-gradient(180deg, rgba(34,211,238,0.28), rgba(34,211,238,0.12))",
            color: "#f8fafc",
            fontSize: 34,
            fontWeight: 650,
          }}
        >
          Escribinos por WhatsApp
        </div>
      </div>
    </AbsoluteFill>
  );
}

export const VireonTalk = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Intro + video completo (~46s) + cierre
  const videoFrames = Math.ceil(VIDEO_DURATION_SEC * fps);
  const scenes = [
    { start: 0, end: 70, Component: SceneLogo },
    { start: 55, end: 55 + videoFrames, Component: SceneTalk },
    {
      start: 55 + videoFrames - 20,
      end: 55 + videoFrames + 160,
      Component: SceneEnd,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
        background: "#020617",
      }}
    >
      <SoftBg frame={frame} />
      {scenes.map(({ start, end, Component }) => {
        if (frame < start || frame > end) return null;
        const local = frame - start;
        const fadeIn = interpolate(frame, [start, start + 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const fadeOut = interpolate(frame, [end - 10, end], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <AbsoluteFill
            key={start}
            style={{ opacity: Math.min(fadeIn, fadeOut) }}
          >
            <Component frame={local} fps={fps} />
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
