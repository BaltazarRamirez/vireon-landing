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

const VIDEO_SRC = "molinos-cliente.mov";
// Source is 30fps / 157 frames — use almost the full clip
const VIDEO_START_FROM = 0;
const VIDEO_END_AT = 152; // ~5.07s
const VIDEO_DURATION_SEC = (VIDEO_END_AT - VIDEO_START_FROM) / 30;

function SoftBg({ frame }) {
  // Fondo estable: sin luces diagonales móviles (mejor para IG)
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
        gap: 28,
      }}
    >
      <div
        style={{
          opacity: enter,
          transform: `scale(${0.86 + enter * 0.14})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        <Img
          src={staticFile("vireon-logo.svg")}
          style={{ width: 880, height: "auto" }}
        />
        <p
          style={{
            margin: 0,
            opacity: tag,
            transform: `translateY(${(1 - tag) * 16}px)`,
            color: "rgba(165,243,252,0.92)",
            fontSize: 38,
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

function CenterLine({ frame, fps, start, words, accentIndex = -1 }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0 18px",
        maxWidth: 920,
      }}
    >
      {words.map((word, i) => {
        const enter = spring({
          frame: frame - start - i * 5,
          fps,
          config: { damping: 13, stiffness: 140, mass: 0.75 },
        });
        const accent = i === accentIndex;
        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: "inline-block",
              opacity: enter,
              transform: `translateY(${(1 - enter) * 36}px) scale(${0.88 + enter * 0.12})`,
              color: accent ? "#a5f3fc" : "#fff",
              fontSize: 64,
              fontWeight: 650,
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}

function SceneFootage({ frame, fps }) {
  const playbackRate = 1;
  const videoFramesNeeded = Math.ceil(VIDEO_DURATION_SEC * fps);

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Al terminar el video, sale el negro y queda el fondo Vireon
  const mediaOut = interpolate(
    frame,
    [videoFramesNeeded - 14, videoFramesNeeded + 6],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const mediaOpacity = fadeIn * mediaOut;

  const phase1 = interpolate(frame, [10, 22, 70, 85], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase2 = interpolate(frame, [80, 95, 140, 155], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const eyebrow1 = spring({
    frame: frame - 12,
    fps,
    config: { damping: 16, stiffness: 140 },
  });
  const eyebrow2 = spring({
    frame: frame - 85,
    fps,
    config: { damping: 16, stiffness: 140 },
  });

  return (
    <AbsoluteFill>
      {/* Video fijo, sin zoom (evita el temblor) */}
      <AbsoluteFill style={{ opacity: mediaOpacity, overflow: "hidden" }}>
        <OffthreadVideo
          src={staticFile(VIDEO_SRC)}
          startFrom={VIDEO_START_FROM}
          endAt={VIDEO_END_AT}
          playbackRate={playbackRate}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
          muted
        />
      </AbsoluteFill>
      {/* Overlay más grande que el video — cubre todo el frame, fijo y centrado */}
      <AbsoluteFill
        style={{
          opacity: mediaOpacity,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "120%",
            height: "120%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.62) 50%, rgba(0,0,0,0.78) 100%)",
          }}
        />
      </AbsoluteFill>
      {/* Arriba, bajo el perfil / barra de IG Stories */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 40,
          right: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: mediaOpacity,
        }}
      >
        <Img
          src={staticFile("vireon-logo.svg")}
          style={{ width: 360, height: "auto" }}
        />
        <Img
          src={staticFile("client-molinos.webp")}
          style={{
            width: 260,
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 48px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            opacity: phase1 * mediaOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
          }}
        >
          <p
            style={{
              margin: 0,
              opacity: eyebrow1,
              transform: `translateY(${(1 - eyebrow1) * 12}px)`,
              color: "rgba(165,243,252,0.9)",
              fontSize: 28,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Cliente real
          </p>
          <CenterLine
            frame={frame}
            fps={fps}
            start={16}
            words={["Del", "papel", "al", "sistema"]}
            accentIndex={3}
          />
        </div>

        <div
          style={{
            position: "absolute",
            opacity: phase2 * mediaOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
          }}
        >
          <p
            style={{
              margin: 0,
              opacity: eyebrow2,
              transform: `translateY(${(1 - eyebrow2) * 12}px)`,
              color: "rgba(165,243,252,0.9)",
              fontSize: 28,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Molinos Combustibles
          </p>
          <CenterLine
            frame={frame}
            fps={fps}
            start={90}
            words={["Actualizando", "su", "operación"]}
            accentIndex={2}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

function formatArMoney(value) {
  return value.toLocaleString("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function formatArDecimal(value, digits = 1) {
  return value.toLocaleString("es-AR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function AnimatedMetric({ frame, fps, start, label, value, prefix = "", suffix = "", decimals = 0 }) {
  const enter = spring({
    frame: frame - start,
    fps,
    config: { damping: 14, stiffness: 130, mass: 0.75 },
  });
  const progress = interpolate(frame, [start + 4, start + 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const current = value * progress;
  const display =
    decimals > 0
      ? `${prefix}${formatArDecimal(current, decimals)}${suffix}`
      : `${prefix}${formatArMoney(current)}${suffix}`;

  return (
    <div
      style={{
        flex: 1,
        opacity: enter,
        transform: `translateY(${(1 - enter) * 24}px) scale(${0.92 + enter * 0.08})`,
        padding: "16px 12px",
        borderRadius: 20,
        border: "1px solid rgba(165,243,252,0.28)",
        background:
          "linear-gradient(160deg, rgba(8,24,44,0.95), rgba(2,6,23,0.88))",
        boxShadow: "0 12px 36px rgba(0,0,0,0.35)",
        textAlign: "center",
        minWidth: 0,
      }}
    >
      <p
        style={{
          margin: 0,
          color: "rgba(165,243,252,0.85)",
          fontSize: 15,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: "8px 0 0",
          color: "#fff",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {display}
      </p>
    </div>
  );
}

function SceneReports({ frame, fps }) {
  const eyebrow = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 140 },
  });
  const titleIn = spring({
    frame: frame - 6,
    fps,
    config: { damping: 15, stiffness: 120 },
  });
  const card = spring({
    frame: frame - 18,
    fps,
    config: { damping: 16, stiffness: 100, mass: 0.9 },
  });

  // Scroll vertical por el dashboard (sin zoom)
  const scrollY = interpolate(frame, [28, 175], [0, -620], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const scan = interpolate(frame, [28, 160], [-8, 108], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bars = [
    { label: "Gasoil Premium", pct: 48, delay: 52, value: "$ 1.120.400" },
    { label: "Nafta Super", pct: 31, delay: 60, value: "$ 724.800" },
    { label: "Aceites y lubricantes", pct: 21, delay: 68, value: "$ 491.010" },
  ];

  const chips = [
    { label: "Turno mañana", value: "$ 312.500", tone: "#38bdf8", delay: 78 },
    { label: "Turno tarde", value: "$ 2.023.710", tone: "#fb923c", delay: 86 },
    { label: "21 turnos", value: "20 cerrados", tone: "#a5f3fc", delay: 94 },
  ];

  const sellers = [
    { name: "Admin · Pista 1", pct: 62, amount: "$ 1.448.450", delay: 102 },
    { name: "Juan P. · Pista 2", pct: 38, amount: "$ 887.760", delay: 110 },
  ];

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "96px 24px 56px",
        gap: 14,
      }}
    >
      <p
        style={{
          margin: 0,
          opacity: eyebrow,
          transform: `translateY(${(1 - eyebrow) * 14}px)`,
          color: "rgba(165,243,252,0.92)",
          fontSize: 22,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          fontWeight: 600,
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        Reportes en tiempo real
      </p>

      <h2
        style={{
          margin: 0,
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 18}px)`,
          color: "#fff",
          fontSize: 40,
          fontWeight: 650,
          letterSpacing: "-0.035em",
          lineHeight: 1.12,
          textAlign: "center",
          maxWidth: 920,
          flexShrink: 0,
        }}
      >
        Ventas, litros y turnos bajo control
      </h2>

      <div
        style={{
          display: "flex",
          gap: 10,
          width: "100%",
          maxWidth: 1020,
          flexShrink: 0,
        }}
      >
        <AnimatedMetric
          frame={frame}
          fps={fps}
          start={8}
          label="Total vendido"
          value={2336210}
          prefix="$ "
        />
        <AnimatedMetric
          frame={frame}
          fps={fps}
          start={14}
          label="Litros"
          value={1686.3}
          suffix=" L"
          decimals={1}
        />
        <AnimatedMetric
          frame={frame}
          fps={fps}
          start={20}
          label="Ticket promedio"
          value={47678}
          prefix="$ "
        />
      </div>

      {/* Segunda fila de métricas ficticias */}
      <div
        style={{
          display: "flex",
          gap: 10,
          width: "100%",
          maxWidth: 1020,
          flexShrink: 0,
        }}
      >
        <AnimatedMetric
          frame={frame}
          fps={fps}
          start={26}
          label="Clientes activos"
          value={48}
        />
        <AnimatedMetric
          frame={frame}
          fps={fps}
          start={32}
          label="Cuentas ctes."
          value={1246790}
          prefix="$ "
        />
        <AnimatedMetric
          frame={frame}
          fps={fps}
          start={38}
          label="Productos"
          value={147000}
          prefix="$ "
        />
      </div>

      <div
        style={{
          position: "relative",
          flex: 1,
          width: "100%",
          maxWidth: 1020,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          opacity: card,
          transform: `translateY(${(1 - card) * 24}px)`,
        }}
      >
        <div
          style={{
            position: "relative",
            flex: 1,
            minHeight: 0,
            borderRadius: 24,
            overflow: "hidden",
            border: "1px solid rgba(165,243,252,0.28)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
            background: "#f8fafc",
          }}
        >
          <div
            style={{
              width: "100%",
              transform: `translateY(${scrollY}px)`,
              willChange: "transform",
            }}
          >
            <Img
              src={staticFile("molinos-reportes.png")}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
                objectPosition: "top center",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${scan}%`,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, rgba(34,211,238,0.9), transparent)",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(2,6,23,0.06) 0%, transparent 18%, transparent 78%, rgba(2,6,23,0.4) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Chips de turnos */}
        <div
          style={{
            display: "flex",
            gap: 10,
            width: "100%",
            flexShrink: 0,
          }}
        >
          {chips.map((chip) => {
            const enter = spring({
              frame: frame - chip.delay,
              fps,
              config: { damping: 13, stiffness: 140, mass: 0.7 },
            });
            return (
              <div
                key={chip.label}
                style={{
                  flex: 1,
                  opacity: enter,
                  transform: `translateY(${(1 - enter) * 18}px) scale(${0.9 + enter * 0.1})`,
                  padding: "14px 12px",
                  borderRadius: 18,
                  border: `1px solid ${chip.tone}55`,
                  background: "rgba(2,6,23,0.72)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: chip.tone,
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {chip.label}
                </p>
                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#fff",
                    fontSize: 22,
                    fontWeight: 650,
                  }}
                >
                  {chip.value}
                </p>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <p
            style={{
              margin: 0,
              color: "rgba(148,163,184,0.7)",
              fontSize: 16,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              opacity: interpolate(frame, [48, 58], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Desglose demo · datos ficticios
          </p>
          {bars.map((bar) => {
            const enter = spring({
              frame: frame - bar.delay,
              fps,
              config: { damping: 16, stiffness: 130 },
            });
            const fill = interpolate(
              frame,
              [bar.delay + 4, bar.delay + 36],
              [0, bar.pct],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              },
            );
            return (
              <div
                key={bar.label}
                style={{
                  opacity: enter,
                  transform: `translateX(${(1 - enter) * 28}px)`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 5,
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      color: "#cbd5e1",
                      fontSize: 20,
                      fontWeight: 500,
                    }}
                  >
                    {bar.label}
                  </span>
                  <span
                    style={{
                      color: "#a5f3fc",
                      fontSize: 20,
                      fontWeight: 700,
                      fontVariantNumeric: "tabular-nums",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {bar.value} · {formatArDecimal(fill, 0)}%
                  </span>
                </div>
                <div
                  style={{
                    height: 9,
                    borderRadius: 999,
                    background: "rgba(148,163,184,0.18)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${fill}%`,
                      height: "100%",
                      borderRadius: 999,
                      background:
                        "linear-gradient(90deg, #22d3ee, #38bdf8)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Ranking vendedores ficticio */}
        <div
          style={{
            display: "flex",
            gap: 10,
            width: "100%",
            flexShrink: 0,
          }}
        >
          {sellers.map((seller, i) => {
            const enter = spring({
              frame: frame - seller.delay,
              fps,
              config: { damping: 14, stiffness: 130 },
            });
            const fill = interpolate(
              frame,
              [seller.delay + 4, seller.delay + 34],
              [0, seller.pct],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              },
            );
            return (
              <div
                key={seller.name}
                style={{
                  flex: 1,
                  opacity: enter,
                  transform: `translateY(${(1 - enter) * 16}px)`,
                  padding: "14px 14px 12px",
                  borderRadius: 18,
                  border: "1px solid rgba(165,243,252,0.2)",
                  background: "rgba(2,6,23,0.7)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      color: "#e2e8f0",
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    #{i + 1} {seller.name}
                  </span>
                  <span
                    style={{
                      color: "#67e8f9",
                      fontSize: 18,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {seller.amount}
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    borderRadius: 999,
                    background: "rgba(148,163,184,0.18)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${fill}%`,
                      height: "100%",
                      borderRadius: 999,
                      background:
                        i === 0
                          ? "linear-gradient(90deg, #22d3ee, #67e8f9)"
                          : "linear-gradient(90deg, #38bdf8, #818cf8)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

function SceneEnd({ frame, fps }) {
  const logo = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110, mass: 0.85 },
  });
  const line = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 120 },
  });
  const title = spring({
    frame: frame - 18,
    fps,
    config: { damping: 15, stiffness: 120 },
  });
  const cta = spring({
    frame: frame - 28,
    fps,
    config: { damping: 16, stiffness: 130 },
  });
  const client = spring({
    frame: frame - 36,
    fps,
    config: { damping: 16, stiffness: 130 },
  });

  const pulse = 0.98 + Math.sin(frame / 11) * 0.025;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "42%",
          width: 780,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.18), transparent 70%)",
          opacity: logo * 0.85,
          transform: `translate(-50%, -50%) scale(${0.9 + logo * 0.1})`,
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 44,
          width: "100%",
          maxWidth: 920,
          margin: "0 auto",
        }}
      >
        <Img
          src={staticFile("vireon-logo.svg")}
          style={{
            display: "block",
            width: 760,
            maxWidth: "100%",
            height: "auto",
            margin: 0,
            opacity: logo,
            transform: `scale(${0.88 + logo * 0.12})`,
            transformOrigin: "center center",
          }}
        />
        <div
          style={{
            width: 140,
            height: 3,
            margin: 0,
            borderRadius: 999,
            background:
              "linear-gradient(90deg, transparent, #67e8f9, transparent)",
            opacity: line,
            transform: `scaleX(${line})`,
            transformOrigin: "center center",
          }}
        />
        <h2
          style={{
            margin: 0,
            width: "100%",
            opacity: title,
            transform: `translateY(${(1 - title) * 22}px)`,
            color: "#fff",
            fontSize: 58,
            fontWeight: 650,
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
            textAlign: "center",
          }}
        >
          ¿Querés lo mismo para tu negocio?
        </h2>
        <p
          style={{
            margin: 0,
            width: "100%",
            maxWidth: 760,
            opacity: title,
            transform: `translateY(${(1 - title) * 16}px)`,
            color: "#94a3b8",
            fontSize: 34,
            lineHeight: 1.35,
            textAlign: "center",
          }}
        >
          Del papel a un sistema que ordena tu operación.
        </p>
        <div
          style={{
            margin: 0,
            opacity: cta,
            transform: `scale(${(0.94 + cta * 0.06) * pulse})`,
            transformOrigin: "center center",
            padding: "28px 48px",
            borderRadius: 999,
            border: "1px solid rgba(165,243,252,0.5)",
            background:
              "linear-gradient(180deg, rgba(34,211,238,0.28), rgba(34,211,238,0.12))",
            color: "#f8fafc",
            fontSize: 36,
            fontWeight: 650,
            letterSpacing: "0.02em",
            textAlign: "center",
          }}
        >
          Escribinos por WhatsApp
        </div>
        <p
          style={{
            margin: 0,
            width: "100%",
            opacity: client,
            transform: `translateY(${(1 - client) * 12}px)`,
            color: "rgba(148,163,184,0.75)",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          Como Molinos Combustibles
        </p>
        <Img
          src={staticFile("client-molinos.webp")}
          style={{
            display: "block",
            width: 420,
            height: "auto",
            margin: 0,
            opacity: client,
            transform: `translateY(${(1 - client) * 12}px)`,
            objectFit: "contain",
          }}
        />
      </div>
    </AbsoluteFill>
  );
}

export const MolinosStory = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scenes = [
    { start: 0, end: 75, Component: SceneLogo },
    { start: 60, end: 230, Component: SceneFootage },
    { start: 215, end: 430, Component: SceneReports },
    { start: 415, end: 620, Component: SceneEnd },
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
