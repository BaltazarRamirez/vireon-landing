import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/** Pantalla verde puro para key en CapCut */
const GREEN = "#00FF00";

function ExcelSheet({ size = 220 }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 200 230">
      <rect x="18" y="10" width="164" height="210" rx="14" fill="#1d6f42" />
      <rect x="28" y="28" width="144" height="174" rx="6" fill="#fff" />
      {[0, 1, 2, 3, 4, 5].map((r) => (
        <g key={r}>
          <rect
            x="28"
            y={28 + r * 29}
            width="144"
            height="29"
            fill={r === 0 ? "#c6efce" : r % 2 === 0 ? "#f3faf5" : "#fff"}
          />
          <line
            x1="28"
            y1={57 + r * 29}
            x2="172"
            y2={57 + r * 29}
            stroke="#b7d7c3"
            strokeWidth="1.5"
          />
        </g>
      ))}
      {[52, 96, 140].map((x) => (
        <line
          key={x}
          x1={x}
          y1="28"
          x2={x}
          y2="202"
          stroke="#b7d7c3"
          strokeWidth="1.5"
        />
      ))}
      <rect x="8" y="70" width="48" height="48" rx="8" fill="#107c41" />
      <path
        d="M18 82 L46 106 M46 82 L18 106"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WhatsAppBubble({ size = 200 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="92" fill="#25D366" />
      <path
        d="M100 48c-28.7 0-52 22.4-52 50 0 9.4 2.7 18.2 7.4 25.7L48 152l29.2-7.6C84 148 91.8 150 100 150c28.7 0 52-22.4 52-50S128.7 48 100 48z"
        fill="#fff"
      />
      <path
        d="M84 78c-1.6-3.5-3.3-3.6-4.8-3.7h-4.1c-1.4 0-3.7.5-5.6 2.8-1.9 2.3-7.3 7.1-7.3 17.3s7.5 20 8.5 21.4c1 1.4 14.5 23.2 35.8 31.5 17.8 6.9 21.4 5.5 25.3 5.2 3.9-.3 12.5-5.1 14.3-10 1.8-4.9 1.8-9.1 1.3-10-0.5-.9-1.9-1.4-3.9-2.5s-12.5-6.2-14.4-6.9c-1.9-.7-3.3-1-4.7 1-1.4 2-5.4 6.9-6.6 8.3-1.2 1.4-2.4 1.6-4.4.5-2-.1-8.5-3.1-16.2-10-6-5.3-10-11.9-11.2-13.9-1.2-2-0.1-3.1 0.9-4.1 0.9-.9 2-2.4 3-3.6 1-1.2 1.3-2 2-3.3.7-1.4.3-2.5-.2-3.5z"
        fill="#25D366"
      />
    </svg>
  );
}

function PaperStack({ size = 200 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <rect
        x="36"
        y="28"
        width="120"
        height="150"
        rx="8"
        fill="#e2e8f0"
        transform="rotate(-8 96 103)"
      />
      <rect
        x="40"
        y="32"
        width="120"
        height="150"
        rx="8"
        fill="#f8fafc"
        transform="rotate(4 100 107)"
      />
      <rect x="48" y="40" width="112" height="142" rx="8" fill="#fff" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x="62"
          y={62 + i * 20}
          width={i === 4 ? 56 : 84}
          height="8"
          rx="4"
          fill="#94a3b8"
        />
      ))}
    </svg>
  );
}

function StickyNotes({ size = 200 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <rect
        x="20"
        y="36"
        width="90"
        height="90"
        rx="8"
        fill="#fde047"
        transform="rotate(-10 65 81)"
      />
      <rect x="78" y="48" width="96" height="96" rx="8" fill="#86efac" />
      <rect
        x="50"
        y="110"
        width="88"
        height="70"
        rx="8"
        fill="#fda4af"
        transform="rotate(8 94 145)"
      />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x="94"
          y={70 + i * 16}
          width={60 - i * 10}
          height="6"
          rx="3"
          fill="#166534"
          opacity="0.45"
        />
      ))}
    </svg>
  );
}

function MoneySlash({ size = 140 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 180 180">
      <circle cx="90" cy="90" r="70" fill="#ef4444" />
      <circle cx="90" cy="90" r="42" fill="#fff" />
      <path
        d="M90 58 V122 M74 72 H102 C112 72 118 80 118 90 S112 108 102 108 H74"
        fill="none"
        stroke="#ef4444"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M40 40 L140 140"
        stroke="#fff"
        strokeWidth="14"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChaosIcon({ frame, fps, start, x, y, children, rotate = 0 }) {
  const enter = spring({
    frame: frame - start,
    fps,
    config: { damping: 12, stiffness: 140, mass: 0.7 },
  });
  const shake = frame > start + 20 ? Math.sin((frame - start) / 2.2) * 4 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: enter,
        transform: `translate(${shake}px, ${(1 - enter) * 50}px) scale(${0.7 + enter * 0.3}) rotate(${rotate + shake * 0.4}deg)`,
      }}
    >
      {children}
    </div>
  );
}

function SceneChaos({ frame, fps }) {
  return (
    <AbsoluteFill>
      <ChaosIcon frame={frame} fps={fps} start={4} x={80} y={420} rotate={-8}>
        <ExcelSheet size={260} />
      </ChaosIcon>
      <ChaosIcon frame={frame} fps={fps} start={12} x={620} y={380} rotate={10}>
        <WhatsAppBubble size={240} />
      </ChaosIcon>
      <ChaosIcon frame={frame} fps={fps} start={20} x={140} y={980} rotate={6}>
        <PaperStack size={250} />
      </ChaosIcon>
      <ChaosIcon frame={frame} fps={fps} start={28} x={640} y={1050} rotate={-12}>
        <StickyNotes size={240} />
      </ChaosIcon>

      {[0, 1, 2].map((i) => {
        const start = 40 + i * 8;
        const t = interpolate(frame, [start, start + 50], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 180 + i * 220,
              top: 150 + t * 180,
              opacity: interpolate(t, [0, 0.2, 1], [0, 1, 0.15]),
              transform: `scale(${0.6 + t * 0.5}) rotate(${-12 + i * 10}deg)`,
            }}
          >
            <MoneySlash size={140} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

function SceneToVireon({ frame, fps }) {
  const wipe = interpolate(frame, [0, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const panel = spring({
    frame: frame - 16,
    fps,
    config: { damping: 14, stiffness: 110 },
  });
  const logo = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Fade out del caos detrás via wipe
  const chaosFade = interpolate(frame, [0, 20], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <div style={{ opacity: chaosFade }}>
        <SceneChaos frame={frame + 70} fps={fps} />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: GREEN,
          clipPath: `circle(${wipe * 140}% at 50% 50%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 260,
          transform: `translate(-50%, 0) scale(${0.85 + logo * 0.15})`,
          opacity: logo,
        }}
      >
        <Img
          src={staticFile("vireon-logo.svg")}
          style={{ width: 640, height: "auto" }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 500,
          height: 1120,
          borderRadius: 28,
          overflow: "hidden",
          opacity: panel,
          transform: `translateY(${(1 - panel) * 60}px)`,
          border: "4px solid rgba(255,255,255,0.4)",
          background: "#0f172a",
        }}
      >
        <Img
          src={staticFile("molinos-reportes.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
          }}
        />
      </div>
    </AbsoluteFill>
  );
}

function SceneGlobalLoss({ frame, fps }) {
  const enter = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const bars = [92, 78, 64, 48, 36, 24];

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 260,
          transform: `translateX(-50%) scale(${0.85 + enter * 0.15})`,
          opacity: enter,
        }}
      >
        <svg width="420" height="420" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="88" fill="#0ea5e9" />
          <ellipse
            cx="100"
            cy="100"
            rx="40"
            ry="88"
            fill="none"
            stroke="#e0f2fe"
            strokeWidth="4"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="88"
            ry="34"
            fill="none"
            stroke="#e0f2fe"
            strokeWidth="4"
          />
          <path
            d="M20 85 Q60 60 100 80 T180 70"
            fill="none"
            stroke="#86efac"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M30 130 Q80 110 120 140 T175 125"
            fill="none"
            stroke="#86efac"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 360,
          left: 100,
          right: 100,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 18,
          height: 420,
        }}
      >
        {bars.map((h, i) => {
          const start = 8 + i * 5;
          const grow = interpolate(frame, [start, start + 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          const drop = interpolate(frame, [55 + i * 4, 95 + i * 4], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.in(Easing.cubic),
          });
          return (
            <div
              key={i}
              style={{
                width: 72,
                height: `${h * grow}%`,
                borderRadius: 14,
                background: "linear-gradient(180deg, #f87171 0%, #b91c1c 100%)",
                opacity: 1 - drop * 0.85,
                transform: `translateY(${drop * 120}px)`,
              }}
            />
          );
        })}
      </div>

      {[0, 1, 2, 3, 4].map((i) => {
        const start = 20 + i * 7;
        const t = interpolate(frame, [start, start + 55], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={`cash-${i}`}
            style={{
              position: "absolute",
              left: 120 + (i % 5) * 170,
              top: 200 + t * 900,
              opacity: interpolate(t, [0, 0.15, 0.85, 1], [0, 1, 1, 0]),
              transform: `rotate(${-20 + i * 8}deg) scale(${1.1 - t * 0.2})`,
            }}
          >
            <svg width="110" height="110" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="#22c55e" />
              <path
                d="M50 28 V72 M38 40 H58 C66 40 70 46 70 52 S66 64 58 64 H38"
                fill="none"
                stroke="#fff"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

export const GreenScreenBroll = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ~14s @ 30fps
  // 0–95 caos | 85–210 transición Vireon | 195–420 pérdida global
  const scenes = [
    { start: 0, end: 100, Component: SceneChaos },
    { start: 85, end: 220, Component: SceneToVireon },
    { start: 205, end: 420, Component: SceneGlobalLoss },
  ];

  return (
    <AbsoluteFill style={{ background: GREEN }}>
      {scenes.map(({ start, end, Component }) => {
        if (frame < start || frame > end) return null;
        const local = frame - start;
        const fadeIn = interpolate(frame, [start, start + 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const fadeOut = interpolate(frame, [end - 8, end], [1, 0], {
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
