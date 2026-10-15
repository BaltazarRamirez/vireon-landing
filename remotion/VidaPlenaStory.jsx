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
import { ClinicApp, carouselSlides } from "./VidaPlenaApp.jsx";

const at = (n, fps) => Math.round((n * fps) / 30);

const navSections = [
  { label: "Dashboard" },
  { label: "Pacientes" },
  { label: "Agenda" },
  { label: "Sesiones" },
  { label: "Profesionales" },
  { label: "Obras Sociales" },
  { label: "Autorizaciones" },
  { label: "Pagos" },
  { label: "Administración" },
  { label: "Reportes" },
  { label: "Usuarios" },
  { label: "Configuración" },
];

const kpis = [
  { title: "Pacientes activos", value: 21, subtitle: "en tratamiento", delta: "+8.5%", up: true, tone: "#e0f2fe", ink: "#0284c7" },
  { title: "Turnos de hoy", value: 12, subtitle: "agenda del día", delta: "+6.7%", up: true, tone: "#ede9fe", ink: "#7c3aed" },
  { title: "Sesiones del mes", value: 148, subtitle: "3 hoy", delta: "+12.1%", up: true, tone: "#dcfce7", ink: "#16a34a" },
  { title: "Alertas operativas", value: 5, subtitle: "autorizaciones / órdenes", delta: "-2", up: false, tone: "#fef3c7", ink: "#d97706" },
];

const secondary = [
  { label: "Nuevos este mes", value: 3 },
  { label: "Profesionales", value: 6 },
  { label: "Pagos pendientes", value: 4 },
  { label: "OS por cobrar", value: 5 },
];

const agenda = [
  { time: "09:00", name: "Juan C. Benitez", meta: "Lic. Ana Gómez · Cons. 1", area: "Kinesiología", tone: "#0ea5e9" },
  { time: "09:30", name: "María Sosa", meta: "Dr. Pablo Herrera · Cons. 3", area: "Neurología", tone: "#6366f1" },
  { time: "10:00", name: "Sofía Pereyra", meta: "Kinesiología · Cons. 2", area: "Kinesiología", tone: "#0ea5e9" },
  { time: "10:30", name: "Patricia Domínguez", meta: "Dr. Martín Rossi · Cons. 4", area: "Traumatología", tone: "#0284c7" },
  { time: "11:00", name: "Nicolás Rojas", meta: "Kinesiología · Cons. 2", area: "Kinesiología", tone: "#0ea5e9" },
];

const actions = [
  { label: "Nuevo paciente", desc: "Alta rápida", tone: "#e0f2fe", ink: "#0369a1" },
  { label: "Nuevo turno", desc: "Agenda del día", tone: "#ede9fe", ink: "#6d28d9" },
  { label: "Registrar sesión", desc: "Asistencia", tone: "#dcfce7", ink: "#15803d" },
  { label: "Liquidación OS", desc: "Facturación", tone: "#fef3c7", ink: "#b45309" },
];

const alerts = [
  { name: "María Sosa", meta: "Swiss Medical · AUT-2026-1002", used: 10, total: 12 },
  { name: "Juan C. Benitez", meta: "OSDE · AUT-2026-1001", used: 7, total: 10 },
];

function SoftBg({ frame, fps }) {
  const breathe = 0.5 + Math.sin(frame / (fps * 1.27)) * 0.1;

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(165deg, #01040d 0%, #04141c 38%, #06241f 72%, #020617 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(14,165,233,0.2), transparent 58%)",
          opacity: breathe,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 80%, rgba(22,163,74,0.12), transparent 42%), radial-gradient(ellipse at 82% 18%, rgba(14,165,233,0.1), transparent 40%)",
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
    frame: frame - at(10, fps),
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
          gap: 32,
        }}
      >
        <Img
          src={staticFile("vireon-logo.svg")}
          style={{ width: 860, height: "auto" }}
        />
        <p
          style={{
            margin: 0,
            opacity: tag,
            transform: `translateY(${(1 - tag) * 16}px)`,
            color: "rgba(134,239,172,0.92)",
            fontSize: 34,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Nuevo sistema clínico
        </p>
      </div>
    </AbsoluteFill>
  );
}

function SceneClient({ frame, fps }) {
  const logo = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110, mass: 0.85 },
  });
  const line = spring({
    frame: frame - at(12, fps),
    fps,
    config: { damping: 16, stiffness: 130 },
  });
  const sub = spring({
    frame: frame - at(18, fps),
    fps,
    config: { damping: 16, stiffness: 130 },
  });

  return (
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          opacity: logo,
          transform: `scale(${0.9 + logo * 0.1})`,
        }}
      >
        <p
          style={{
            margin: 0,
            color: "rgba(165,243,252,0.9)",
            fontSize: 26,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Cliente
        </p>
        <Img
          src={staticFile("logo-vidaplena.png")}
          style={{
            width: 820,
            height: "auto",
            mixBlendMode: "screen",
          }}
        />
        <div
          style={{
            width: 160,
            height: 3,
            borderRadius: 999,
            background:
              "linear-gradient(90deg, transparent, #86efac, transparent)",
            opacity: line,
            transform: `scaleX(${0.4 + line * 0.6})`,
          }}
        />
        <p
          style={{
            margin: 0,
            opacity: sub,
            transform: `translateY(${(1 - sub) * 14}px)`,
            color: "rgba(226,232,240,0.86)",
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          Instituto de Rehabilitación Integral
        </p>
      </div>
    </AbsoluteFill>
  );
}

function countUp(frame, start, value, duration) {
  return Math.round(
    interpolate(frame, [start, start + duration], [0, value], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );
}

function DashboardApp({ frame, fps }) {
  const card = spring({
    frame: frame - at(8, fps),
    fps,
    config: { damping: 16, stiffness: 100, mass: 0.9 },
  });
  const scrollY = interpolate(
    frame,
    [at(80, fps), at(230, fps)],
    [0, -620],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    },
  );

  return (
    <div
      style={{
        width: 980,
        height: 1280,
        borderRadius: 28,
        overflow: "hidden",
        background: "#f5f8fb",
        boxShadow:
          "0 40px 90px rgba(2,6,23,0.45), 0 0 0 1px rgba(255,255,255,0.12)",
        opacity: card,
        transform: `translateY(${(1 - card) * 40}px)`,
        display: "flex",
      }}
    >
      <aside
        style={{
          width: 236,
          background: "#fff",
          borderRight: "1px solid #e4ebf2",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: "22px 16px 16px",
            borderBottom: "1px solid #e4ebf2",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Img
            src={staticFile("logo-vidaplena.png")}
            style={{ width: 168, height: "auto" }}
          />
        </div>
        <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navSections.map((item) => (
            <div
              key={item.label}
              style={{
                borderRadius: 12,
                padding: "10px 12px",
                fontSize: 15,
                fontWeight: 600,
                background: item.label === "Dashboard" ? "#e0f2fe" : "transparent",
                color: item.label === "Dashboard" ? "#0284c7" : "#475569",
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
        <p
          style={{
            margin: "auto 16px 18px",
            color: "#94a3b8",
            fontSize: 12,
            lineHeight: 1.4,
          }}
        >
          Instituto de Rehabilitación Integral
        </p>
      </aside>

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <header
          style={{
            height: 72,
            background: "rgba(255,255,255,0.95)",
            borderBottom: "1px solid #e4ebf2",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 22px",
            flexShrink: 0,
          }}
        >
          <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#0f172a" }}>
            Dashboard
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                background: "#e0f2fe",
                color: "#0284c7",
                display: "grid",
                placeItems: "center",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              EG
            </div>
            <span style={{ fontSize: 14, color: "#334155", fontWeight: 600 }}>
              Edith Gimenez
            </span>
          </div>
        </header>

        <div style={{ flex: 1, overflow: "hidden" }}>
          <div
            style={{
              padding: "20px 18px 40px",
              transform: `translateY(${scrollY}px)`,
            }}
          >
            <div
              style={{
                borderRadius: 18,
                border: "1px solid #e4ebf2",
                background: "linear-gradient(90deg, #f0f9ff, #fff, #ecfdf5)",
                padding: "18px 18px 16px",
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div>
                <p style={{ margin: 0, color: "#0284c7", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Administrador
                </p>
                <p style={{ margin: "6px 0 0", color: "#0f172a", fontSize: 26, fontWeight: 700 }}>
                  Buenos días, Edith
                </p>
                <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 13 }}>
                  jueves, 10 de septiembre · resumen operativo de Vida Plena
                </p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { label: "Turnos hoy", value: 12, color: "#0f172a" },
                  { label: "Sesiones hoy", value: 3, color: "#0f172a" },
                  { label: "Por vencer", value: 5, color: "#d97706" },
                ].map((mini) => (
                  <div
                    key={mini.label}
                    style={{
                      background: "#fff",
                      border: "1px solid #e4ebf2",
                      borderRadius: 12,
                      padding: "8px 10px",
                      minWidth: 86,
                      textAlign: "center",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 11, color: "#64748b" }}>{mini.label}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 20, fontWeight: 700, color: mini.color }}>
                      {mini.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginTop: 12,
              }}
            >
              {kpis.map((kpi, i) => (
                <div
                  key={kpi.title}
                  style={{
                    background: "#fff",
                    border: "1px solid #e4ebf2",
                    borderRadius: 16,
                    padding: "14px 14px 12px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ margin: 0, fontSize: 12, color: "#64748b", fontWeight: 600 }}>
                      {kpi.title}
                    </p>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: kpi.tone,
                      }}
                    />
                  </div>
                  <p style={{ margin: "8px 0 0", fontSize: 34, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.04em" }}>
                    {countUp(frame, at(18 + i * 4, fps), kpi.value, at(22, fps))}
                  </p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "#64748b" }}>{kpi.subtitle}</p>
                  <p style={{ margin: "6px 0 0", fontSize: 12, fontWeight: 650, color: kpi.up ? "#16a34a" : "#dc2626" }}>
                    {kpi.delta}{" "}
                    <span style={{ fontWeight: 400, color: "#94a3b8" }}>vs período ant.</span>
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                marginTop: 10,
              }}
            >
              {secondary.map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: "#fff",
                    border: "1px solid #e4ebf2",
                    borderRadius: 14,
                    padding: "10px 12px",
                  }}
                >
                  <p style={{ margin: 0, fontSize: 11, color: "#64748b" }}>{item.label}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 12,
                background: "#fff",
                border: "1px solid #e4ebf2",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #e4ebf2" }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                  Agenda de hoy
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#64748b" }}>
                  12 turnos programados
                </p>
              </div>
              {agenda.map((row) => (
                <div
                  key={row.time + row.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "11px 14px",
                    borderBottom: "1px solid #e4ebf2",
                  }}
                >
                  <div
                    style={{
                      width: 58,
                      borderRadius: 10,
                      background: "#e0f2fe",
                      color: "#0284c7",
                      textAlign: "center",
                      padding: "7px 0",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {row.time}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 650, color: "#0f172a" }}>
                      {row.name}
                    </p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: "#64748b" }}>
                      {row.meta}
                    </p>
                  </div>
                  <span
                    style={{
                      borderRadius: 999,
                      padding: "4px 8px",
                      background: `${row.tone}18`,
                      color: row.tone,
                      fontSize: 11,
                      fontWeight: 650,
                    }}
                  >
                    {row.area}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 12,
                background: "#fff",
                border: "1px solid #e4ebf2",
                borderRadius: 16,
                padding: 14,
              }}
            >
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                Acciones rápidas
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  marginTop: 10,
                }}
              >
                {actions.map((action) => (
                  <div
                    key={action.label}
                    style={{
                      border: "1px solid #e4ebf2",
                      borderRadius: 12,
                      padding: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: action.tone,
                        marginBottom: 8,
                      }}
                    />
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 650, color: "#0f172a" }}>
                      {action.label}
                    </p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: "#64748b" }}>
                      {action.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: 12,
                background: "#fff",
                border: "1px solid #e4ebf2",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #e4ebf2" }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                  Requieren atención
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#64748b" }}>
                  Autorizaciones y cupos
                </p>
              </div>
              {alerts.map((alert) => (
                <div key={alert.name} style={{ padding: "12px 16px", borderBottom: "1px solid #e4ebf2" }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 650, color: "#0f172a" }}>
                    {alert.name}
                  </p>
                  <p style={{ margin: "2px 0 8px", fontSize: 11, color: "#64748b" }}>
                    {alert.meta}
                  </p>
                  <div style={{ height: 6, borderRadius: 99, background: "#e2e8f0", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${(alert.used / alert.total) * 100}%`,
                        height: "100%",
                        background: "#d97706",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneDashboard({ frame, fps }) {
  const eyebrow = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 140 },
  });
  const titleIn = spring({
    frame: frame - at(6, fps),
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "80px 24px 36px",
        gap: 16,
      }}
    >
      <p
        style={{
          margin: 0,
          opacity: eyebrow,
          color: "rgba(134,239,172,0.92)",
          fontSize: 22,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        Operación del centro
      </p>
      <h2
        style={{
          margin: 0,
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 16}px)`,
          color: "#fff",
          fontSize: 40,
          fontWeight: 650,
          letterSpacing: "-0.035em",
          lineHeight: 1.12,
          textAlign: "center",
          maxWidth: 920,
        }}
      >
        El dashboard real del sistema
      </h2>
      <DashboardApp frame={frame} fps={fps} />
    </AbsoluteFill>
  );
}

function SceneSections({ frame, fps }) {
  const intro = at(16, fps);
  const slideLen = at(108, fps);
  const trans = at(16, fps);
  const last = carouselSlides.length - 1;

  const eyebrow = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 140 },
  });
  const titleIn = spring({
    frame: frame - at(6, fps),
    fps,
    config: { damping: 15, stiffness: 120 },
  });
  const appIn = spring({
    frame: frame - at(10, fps),
    fps,
    config: { damping: 16, stiffness: 100, mass: 0.9 },
  });

  const elapsed = Math.max(0, frame - intro);
  const index = Math.min(Math.floor(elapsed / slideLen), last);
  const local = elapsed - index * slideLen;
  const canSlide = index < last;
  const t = canSlide
    ? interpolate(local, [slideLen - trans, slideLen], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.cubic),
      })
    : 0;
  const nextIndex = Math.min(index + 1, last);
  const current = carouselSlides[index];
  const next = carouselSlides[nextIndex];
  const CurrentScreen = current.Screen;
  const NextScreen = next.Screen;

  const scrollMax = [30, 100, 120, 50, 210][index];
  const scrollCurrent = interpolate(
    local,
    [at(28, fps), slideLen - trans],
    [0, -scrollMax],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    },
  );
  const scrollNext = interpolate(t, [0.35, 1], [0, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const progress = interpolate(local, [0, slideLen], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "44px 20px 16px",
        gap: 10,
      }}
    >
      <p
        style={{
          margin: 0,
          opacity: eyebrow,
          color: "rgba(165,243,252,0.9)",
          fontSize: 18,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Hecho a medida
      </p>
      <h2
        style={{
          margin: 0,
          opacity: titleIn,
          color: "#fff",
          fontSize: 34,
          fontWeight: 650,
          letterSpacing: "-0.035em",
          textAlign: "center",
          lineHeight: 1.12,
        }}
      >
        Recorremos el sistema
      </h2>

      <div
        style={{
          display: "flex",
          gap: 8,
          opacity: titleIn,
        }}
      >
        {carouselSlides.map((slide, i) => {
          const on = i === index || (t > 0.5 && i === nextIndex);
          return (
            <div
              key={slide.key}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 999,
                padding: "8px 14px",
                fontSize: 13,
                fontWeight: 650,
                color: on ? "#082f49" : "rgba(226,232,240,0.72)",
                background: on
                  ? "linear-gradient(90deg, #7dd3fc, #86efac)"
                  : "rgba(255,255,255,0.08)",
              }}
            >
              {slide.label}
              {i === index ? (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    height: 3,
                    width: `${Math.round((canSlide ? Math.min(progress, 1) : 1) * 100)}%`,
                    background: "rgba(8,47,73,0.35)",
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <div
        style={{
          width: 1040,
          height: 1580,
          transform: `translateY(${(1 - appIn) * 36}px)`,
          opacity: appIn,
        }}
      >
        <div
          style={{
            width: 1040,
            height: 1580,
            overflow: "hidden",
            borderRadius: 28,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translateX(${-t * 100}%)`,
            }}
          >
            <ClinicApp active={current.label} scrollY={scrollCurrent}>
              <CurrentScreen />
            </ClinicApp>
          </div>
          {t > 0 ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: `translateX(${(1 - t) * 100}%)`,
              }}
            >
              <ClinicApp active={next.label} scrollY={scrollNext}>
                <NextScreen />
              </ClinicApp>
            </div>
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
}

function SceneEnd({ frame, fps }) {
  const logo = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
  });
  const title = spring({
    frame: frame - at(14, fps),
    fps,
    config: { damping: 15, stiffness: 120 },
  });
  const cta = spring({
    frame: frame - at(24, fps),
    fps,
    config: { damping: 16, stiffness: 130 },
  });
  const client = spring({
    frame: frame - at(34, fps),
    fps,
    config: { damping: 16, stiffness: 130 },
  });
  const pulse = 0.98 + Math.sin(frame / (fps / 2.7)) * 0.025;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 36,
          maxWidth: 920,
        }}
      >
        <Img
          src={staticFile("vireon-logo.svg")}
          style={{
            width: 720,
            height: "auto",
            opacity: logo,
            transform: `scale(${0.88 + logo * 0.12})`,
          }}
        />
        <h2
          style={{
            margin: 0,
            opacity: title,
            transform: `translateY(${(1 - title) * 16}px)`,
            color: "#fff",
            fontSize: 52,
            fontWeight: 650,
            letterSpacing: "-0.04em",
            lineHeight: 1.12,
          }}
        >
          Software que ordena tu operación.
        </h2>
        <div
          style={{
            opacity: cta,
            transform: `scale(${pulse * (0.96 + cta * 0.04)})`,
            borderRadius: 999,
            background: "#fff",
            color: "#020617",
            padding: "22px 42px",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          Escribinos por WhatsApp
        </div>
        <p
          style={{
            margin: 0,
            opacity: client,
            color: "rgba(148,163,184,0.8)",
            fontSize: 22,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Como Vida Plena
        </p>
        <Img
          src={staticFile("logo-vidaplena.png")}
          style={{
            width: 420,
            height: "auto",
            opacity: client,
            mixBlendMode: "screen",
          }}
        />
      </div>
    </AbsoluteFill>
  );
}

export const VidaPlenaStory = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fade = at(10, fps);

  const scenes = [
    { start: at(0, fps), end: at(80, fps), Component: SceneLogo },
    { start: at(65, fps), end: at(175, fps), Component: SceneClient },
    { start: at(160, fps), end: at(430, fps), Component: SceneDashboard },
    { start: at(415, fps), end: at(990, fps), Component: SceneSections },
    { start: at(975, fps), end: at(1155, fps), Component: SceneEnd },
  ];

  return (
    <AbsoluteFill
      style={{
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
        background: "#020617",
      }}
    >
      <SoftBg frame={frame} fps={fps} />
      {scenes.map(({ start, end, Component }) => {
        if (frame < start || frame > end) return null;
        const local = frame - start;
        const fadeIn = interpolate(frame, [start, start + fade], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const fadeOut = interpolate(frame, [end - fade, end], [1, 0], {
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
