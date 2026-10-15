import { Img, staticFile } from "remotion";

export const UI = {
  bg: "#f5f8fb",
  surface: "#ffffff",
  border: "#e4ebf2",
  muted: "#64748b",
  fg: "#0f172a",
  primary: "#0ea5e9",
  primaryDark: "#0284c7",
  primarySoft: "#e0f2fe",
  success: "#16a34a",
  successSoft: "#dcfce7",
  warning: "#d97706",
  warningSoft: "#fef3c7",
  danger: "#dc2626",
  dangerSoft: "#fee2e2",
  info: "#2563eb",
  infoSoft: "#dbeafe",
  slate: "#f8fafc",
};

const NAV = [
  "Dashboard",
  "Pacientes",
  "Agenda",
  "Sesiones",
  "Profesionales",
  "Obras Sociales",
  "Autorizaciones",
  "Pagos",
  "Administración",
  "Reportes",
  "Usuarios",
  "Configuración",
];

const AREA = {
  kinesiologia: { label: "Kinesiología", bg: "#ecfeff", color: "#0e7490" },
  neurologia: { label: "Neurología", bg: "#ecfdf5", color: "#047857" },
  traumatologia: { label: "Traumatología", bg: "#f0f9ff", color: "#0369a1" },
};

const TONE = {
  success: { bg: UI.successSoft, color: UI.success },
  warning: { bg: UI.warningSoft, color: UI.warning },
  danger: { bg: UI.dangerSoft, color: UI.danger },
  info: { bg: UI.infoSoft, color: UI.info },
  neutral: { bg: "#f1f5f9", color: "#475569" },
};

function ars(n) {
  return `$ ${Math.round(n).toLocaleString("es-AR")}`;
}

function initials(name) {
  return name
    .replace(/^Dr\.\s|^Lic\.\s/i, "")
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function Badge({ label, tone = "neutral" }) {
  const t = TONE[tone] ?? TONE.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        borderRadius: 999,
        padding: "4px 8px",
        fontSize: 11,
        fontWeight: 600,
        background: t.bg,
        color: t.color,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function AreaChip({ area }) {
  const a = AREA[area];
  if (!a) return null;
  return (
    <span
      style={{
        display: "inline-flex",
        borderRadius: 999,
        padding: "4px 8px",
        fontSize: 11,
        fontWeight: 600,
        background: a.bg,
        color: a.color,
        whiteSpace: "nowrap",
      }}
    >
      {a.label}
    </span>
  );
}

function Avatar({ name }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 999,
        background: "#f1f5f9",
        color: "#475569",
        display: "grid",
        placeItems: "center",
        fontSize: 11,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {initials(name)}
    </div>
  );
}

function Icon({ d, size = 16, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  plus: "M5 12h14M12 5v14",
  search: "M21 21l-4.3-4.3M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z",
  bell: "M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0",
  chevronL: "M15 18l-6-6 6-6",
  chevronR: "M9 18l6-6-6-6",
  eraser: "M7 21h10M4 13l7-7 8 8-7 7H8l-4-4z",
  timer: "M12 8v4l3 2M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z",
  download: "M12 3v12M7 10l5 5 5-5M5 21h14",
  cols: "M4 6h16M4 12h16M4 18h16",
  calendar: "M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
  sheet: "M4 4h16v16H4zM8 4v16M4 10h16M4 16h16",
  more: "M5 12h.01M12 12h.01M19 12h.01",
};

function FakeSelect({ label, width = 132 }) {
  return (
    <div
      style={{
        height: 36,
        width,
        borderRadius: 12,
        border: `1px solid ${UI.border}`,
        background: UI.surface,
        padding: "0 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: UI.muted,
        fontSize: 12,
        flexShrink: 0,
      }}
    >
      {label}
      <span style={{ fontSize: 9, marginLeft: 8 }}>▾</span>
    </div>
  );
}

function SearchBox({ placeholder, flex = true }) {
  return (
    <div
      style={{
        position: "relative",
        flex: flex ? 1 : undefined,
        minWidth: flex ? 0 : 180,
      }}
    >
      <div style={{ position: "absolute", left: 10, top: 10, color: UI.muted }}>
        <Icon d={ICONS.search} size={14} />
      </div>
      <div
        style={{
          height: 36,
          borderRadius: 12,
          border: `1px solid ${UI.border}`,
          background: "rgba(248,250,252,0.9)",
          paddingLeft: 32,
          paddingRight: 10,
          display: "flex",
          alignItems: "center",
          color: "#94a3b8",
          fontSize: 12,
        }}
      >
        {placeholder}
      </div>
    </div>
  );
}

function PrimaryBtn({ icon, label }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: 12,
        background: UI.primary,
        color: "#fff",
        padding: "8px 12px",
        fontSize: 12,
        fontWeight: 600,
        boxShadow: "0 1px 2px rgba(15,23,42,0.08)",
        whiteSpace: "nowrap",
      }}
    >
      {icon ? <Icon d={icon} size={14} color="#fff" /> : null}
      {label}
    </div>
  );
}

function GhostBtn({ icon, label }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: 12,
        border: `1px solid ${UI.border}`,
        background: UI.surface,
        color: UI.fg,
        padding: "8px 12px",
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {icon ? <Icon d={icon} size={14} color={UI.fg} /> : null}
      {label}
    </div>
  );
}

function KpiCard({ title, value, delta, tone, deltaUp = true, icon }) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: `1px solid ${UI.border}`,
        background: UI.surface,
        padding: "12px 12px 10px",
        boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <div>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: UI.muted }}>
            {title}
          </p>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: 22,
              fontWeight: 700,
              color: UI.fg,
              letterSpacing: "-0.03em",
            }}
          >
            {value}
          </p>
          {delta ? (
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 11,
                fontWeight: 600,
                color: deltaUp ? UI.success : UI.danger,
              }}
            >
              {delta}{" "}
              <span style={{ fontWeight: 400, color: UI.muted }}>vs ant.</span>
            </p>
          ) : null}
        </div>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 12,
            background: tone.bg,
            color: tone.color || UI.primary,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <Icon d={icon || ICONS.calendar} size={16} color={tone.color || UI.primary} />
        </div>
      </div>
    </div>
  );
}

function PageTitle({ title, subtitle, actions }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 14,
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: 24,
            fontWeight: 650,
            letterSpacing: "-0.03em",
            color: UI.fg,
          }}
        >
          {title}
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: 12, color: UI.muted, maxWidth: 520 }}>
          {subtitle}
        </p>
      </div>
      <div style={{ display: "flex", gap: 8 }}>{actions}</div>
    </div>
  );
}

function FilterBar({ children }) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: `1px solid ${UI.border}`,
        background: UI.surface,
        padding: 10,
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
        boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
      }}
    >
      {children}
    </div>
  );
}

function PillGroup({ items, active = 0 }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        borderRadius: 12,
        background: "#f1f5f9",
        padding: 4,
        flexShrink: 0,
      }}
    >
      {items.map((item, i) => (
        <div
          key={item}
          style={{
            borderRadius: 8,
            padding: "6px 10px",
            fontSize: 11,
            fontWeight: 600,
            background: i === active ? "#fff" : "transparent",
            color: i === active ? UI.primaryDark : UI.muted,
            boxShadow: i === active ? "0 1px 2px rgba(15,23,42,0.08)" : "none",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function Th({ children, right }) {
  return (
    <th
      style={{
        padding: "8px 10px",
        textAlign: right ? "right" : "left",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: UI.muted,
      }}
    >
      {children}
    </th>
  );
}

function Td({ children, muted, nowrap }) {
  return (
    <td
      style={{
        padding: "8px 10px",
        fontSize: 12,
        color: muted ? UI.muted : UI.fg,
        whiteSpace: nowrap ? "nowrap" : undefined,
        borderTop: `1px solid ${UI.border}`,
      }}
    >
      {children}
    </td>
  );
}

export function ClinicApp({ active, children, scrollY = 0 }) {
  return (
    <div
      style={{
        width: 1040,
        height: 1580,
        borderRadius: 28,
        overflow: "hidden",
        background: UI.bg,
        boxShadow:
          "0 40px 90px rgba(2,6,23,0.45), 0 0 0 1px rgba(255,255,255,0.12)",
        display: "flex",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
      }}
    >
      <aside
        style={{
          width: 200,
          background: UI.surface,
          borderRight: `1px solid ${UI.border}`,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: "18px 12px 14px",
            borderBottom: `1px solid ${UI.border}`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Img
            src={staticFile("logo-vidaplena.png")}
            style={{ width: 148, height: "auto" }}
          />
        </div>
        <div style={{ padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map((label) => {
            const on = label === active;
            return (
              <div
                key={label}
                style={{
                  borderRadius: 12,
                  padding: "8px 10px",
                  fontSize: 13,
                  fontWeight: 600,
                  background: on ? UI.primarySoft : "transparent",
                  color: on ? UI.primaryDark : "#475569",
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
        <p
          style={{
            margin: "auto 12px 16px",
            color: UI.muted,
            fontSize: 11,
            lineHeight: 1.4,
          }}
        >
          Instituto de Rehabilitación Integral
        </p>
      </aside>

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <header
          style={{
            height: 64,
            background: "rgba(255,255,255,0.95)",
            borderBottom: `1px solid ${UI.border}`,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 16px",
            flexShrink: 0,
          }}
        >
          <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: UI.fg }}>
            {active}
          </p>
          <div style={{ flex: 1, maxWidth: 240, marginLeft: "auto" }}>
            <SearchBox placeholder="Buscar pacientes, turnos..." flex />
          </div>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              border: `1px solid ${UI.border}`,
              display: "grid",
              placeItems: "center",
              color: UI.muted,
            }}
          >
            <Icon d={ICONS.bell} size={14} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 12,
              border: `1px solid ${UI.border}`,
              padding: "4px 10px 4px 4px",
              background: UI.surface,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: UI.primarySoft,
                color: UI.primaryDark,
                display: "grid",
                placeItems: "center",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              EG
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 650, color: UI.fg }}>
                Edith Gimenez
              </p>
              <p style={{ margin: 0, fontSize: 10, color: UI.muted }}>
                Administrador
              </p>
            </div>
          </div>
        </header>

        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          <div
            style={{
              padding: "16px 16px 40px",
              transform: `translateY(${scrollY}px)`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

const agendaRows = [
  { time: "08:00", name: "Matías Bravo", pro: "Lic. Valentina Ruiz", area: "kinesiologia", room: "Consultorio 2", status: "Atendido", tone: "success" },
  { time: "09:00", name: "Juan Carlos Benitez", pro: "Lic. Ana Gómez", area: "kinesiologia", room: "Consultorio 1", status: "Confirmado", tone: "success" },
  { time: "09:30", name: "María Sosa", pro: "Dr. Pablo Herrera", area: "neurologia", room: "Consultorio 3", status: "Presente", tone: "info" },
  { time: "10:00", name: "Sofía Pereyra", pro: "Lic. Valentina Ruiz", area: "kinesiologia", room: "Consultorio 2", status: "Confirmado", tone: "success" },
  { time: "10:30", name: "Patricia Domínguez", pro: "Dr. Martín Rossi", area: "traumatologia", room: "Consultorio 4", status: "Pendiente", tone: "warning" },
  { time: "11:00", name: "Nicolás Rojas", pro: "Lic. Valentina Ruiz", area: "kinesiologia", room: "Consultorio 2", status: "Confirmado", tone: "success" },
  { time: "11:30", name: "Hernán Vidal", pro: "Dr. Sebastián López", area: "traumatologia", room: "Consultorio 4", status: "Atendido", tone: "success" },
  { time: "14:00", name: "Ricardo Quiroga", pro: "Dr. Martín Rossi", area: "traumatologia", room: "Consultorio 4", status: "Confirmado", tone: "success" },
  { time: "15:00", name: "Valeria Molina", pro: "Dr. Pablo Herrera", area: "neurologia", room: "Consultorio 3", status: "Pendiente", tone: "warning" },
  { time: "16:00", name: "Elena Castro", pro: "Dr. Pablo Herrera", area: "neurologia", room: "Consultorio 3", status: "Confirmado", tone: "success" },
  { time: "16:30", name: "Florencia Navarro", pro: "Lic. Valentina Ruiz", area: "kinesiologia", room: "Consultorio 2", status: "Pendiente", tone: "warning" },
  { time: "17:00", name: "Eduardo Silva", pro: "Dr. Sebastián López", area: "traumatologia", room: "Consultorio 4", status: "Confirmado", tone: "success" },
];

export function ScreenAgenda() {
  return (
    <>
      <PageTitle
        title="Agenda"
        subtitle="Turnos pendientes: confirmá asistencia y registrá la sesión cuando ya se realizó"
        actions={<PrimaryBtn icon={ICONS.plus} label="Nuevo turno" />}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        <KpiCard title="Turnos del día" value="12" delta="+6.7%" tone={{ bg: "#f0f9ff" }} />
        <KpiCard title="Sesiones realizadas" value="3" delta="+15.2%" tone={{ bg: "#ecfdf5" }} />
        <KpiCard title="Ausencias" value="0" delta="-33.3%" deltaUp={false} tone={{ bg: "#fef2f2" }} />
        <KpiCard title="Reprogramados" value="1" delta="+20%" tone={{ bg: "#fffbeb" }} />
      </div>
      <FilterBar>
        <FakeSelect label="10/09/2026" width={118} />
        <FakeSelect label="Profesional" width={118} />
        <FakeSelect label="Especialidad" width={118} />
        <FakeSelect label="Estado" width={100} />
        <GhostBtn icon={ICONS.eraser} label="Limpiar filtros" />
      </FilterBar>
      <div
        style={{
          overflow: "hidden",
          borderRadius: 16,
          border: `1px solid ${UI.border}`,
          background: UI.surface,
          boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 12px",
            borderBottom: `1px solid ${UI.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <GhostBtn icon={ICONS.chevronL} label="" />
            <GhostBtn label="Hoy" />
            <GhostBtn icon={ICONS.chevronR} label="" />
            <p style={{ margin: "0 0 0 6px", fontSize: 12, fontWeight: 650, color: UI.fg }}>
              10/09/2026
            </p>
          </div>
          <div style={{ display: "flex", overflow: "hidden", borderRadius: 12, border: `1px solid ${UI.border}` }}>
            {["Día", "Semana", "Mes"].map((v, i) => (
              <div
                key={v}
                style={{
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 650,
                  background: i === 0 ? UI.primarySoft : UI.surface,
                  color: i === 0 ? UI.primaryDark : UI.muted,
                }}
              >
                {v}
              </div>
            ))}
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "rgba(248,250,252,0.95)" }}>
            <tr>
              <Th>Hora</Th>
              <Th>Paciente</Th>
              <Th>Especialidad</Th>
              <Th>Consultorio</Th>
              <Th>Estado</Th>
            </tr>
          </thead>
          <tbody>
            {agendaRows.map((row, i) => (
              <tr key={row.time + row.name} style={{ background: i === 0 ? "rgba(224,242,254,0.45)" : undefined }}>
                <Td nowrap>
                  <span style={{ fontWeight: 700 }}>{row.time}</span>
                </Td>
                <Td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar name={row.name} />
                    <div>
                      <p style={{ margin: 0, fontWeight: 650, fontSize: 12 }}>{row.name}</p>
                      <p style={{ margin: 0, fontSize: 10, color: UI.muted }}>{row.pro}</p>
                    </div>
                  </div>
                </Td>
                <Td>
                  <AreaChip area={row.area} />
                </Td>
                <Td muted>{row.room}</Td>
                <Td>
                  <Badge label={row.status} tone={row.tone} />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const professionalRows = [
  { name: "Dr. Martín Rossi", spec: "traumatologia", license: "MN 85421", patients: 4, sessions: 5, month: 4, today: 2, pay: ars(8500), pending: 228000, active: true },
  { name: "Lic. Ana Gómez", spec: "kinesiologia", license: "MP 31245", patients: 5, sessions: 5, month: 4, today: 1, pay: ars(7200), pending: 317400, active: true },
  { name: "Dr. Pablo Herrera", spec: "neurologia", license: "MN 77890", patients: 5, sessions: 7, month: 6, today: 3, pay: "45%", pending: 290900, active: true },
  { name: "Lic. Valentina Ruiz", spec: "kinesiologia", license: "MP 28901", patients: 4, sessions: 7, month: 6, today: 4, pay: ars(7000), pending: 261000, active: true },
  { name: "Dr. Sebastián López", spec: "traumatologia", license: "MN 90112", patients: 3, sessions: 3, month: 2, today: 2, pay: "Combinado", pending: 0, active: true },
  { name: "Lic. Camila Ferreyra", spec: "kinesiologia", license: "MP 33456", patients: 0, sessions: 2, month: 2, today: 0, pay: `${ars(12000)}/h`, pending: 914000, active: true },
];

export function ScreenProfessionals() {
  return (
    <>
      <PageTitle
        title="Profesionales"
        subtitle="Equipo clínico, productividad y liquidaciones"
        actions={
          <>
            <GhostBtn icon={ICONS.timer} label="Cargar horas" />
            <PrimaryBtn icon={ICONS.plus} label="Nuevo profesional" />
          </>
        }
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        <KpiCard title="Profesionales activos" value="6" delta="6 totales" tone={{ bg: "#f0f9ff" }} />
        <KpiCard title="Pacientes asignados" value="21" delta="desde la base" tone={{ bg: "#f5f3ff" }} />
        <KpiCard title="Horas del mes" value="0 h" delta="cargadas por secretaría" tone={{ bg: "#ecfdf5" }} />
        <KpiCard title="Pagos pendientes" value={ars(2011300)} delta="a liquidar" tone={{ bg: "#fffbeb" }} />
      </div>
      <FilterBar>
        <SearchBox placeholder="Buscar por nombre, matrícula o email..." />
        <PillGroup items={["Todas", "Kinesiología", "Traumatología", "Neurología"]} />
        <FakeSelect label="Estado" width={100} />
      </FilterBar>
      <div
        style={{
          overflow: "hidden",
          borderRadius: 16,
          border: `1px solid ${UI.border}`,
          background: UI.surface,
        }}
      >
        <div style={{ padding: "10px 12px", borderBottom: `1px solid ${UI.border}` }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 650 }}>6 profesionales</p>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "rgba(248,250,252,0.95)" }}>
            <tr>
              <Th>Profesional</Th>
              <Th>Especialidad</Th>
              <Th>Pacientes</Th>
              <Th>Hoy</Th>
              <Th>Pago</Th>
              <Th>Pendiente</Th>
              <Th>Estado</Th>
            </tr>
          </thead>
          <tbody>
            {professionalRows.map((row, i) => (
              <tr key={row.name} style={{ background: i === 0 ? "rgba(224,242,254,0.45)" : undefined }}>
                <Td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar name={row.name} />
                    <div>
                      <p style={{ margin: 0, fontWeight: 650, fontSize: 12 }}>{row.name}</p>
                      <p style={{ margin: 0, fontSize: 10, color: UI.muted }}>{row.license}</p>
                    </div>
                  </div>
                </Td>
                <Td>
                  <AreaChip area={row.spec} />
                </Td>
                <Td muted>{row.patients}</Td>
                <Td muted>{row.today}</Td>
                <Td muted nowrap>{row.pay}</Td>
                <Td>
                  <span style={{ color: "#b45309", fontWeight: 650, fontSize: 12 }}>
                    {ars(row.pending)}
                  </span>
                </Td>
                <Td>
                  <Badge label="Activo" tone="success" />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const patientRows = [
  { first: "Juan Carlos", last: "Benitez", dni: "28456789", phone: "+54 11 6123-4501", area: "kinesiologia", pro: "Lic. Ana Gómez", os: "OSDE", next: "10/09 09:00", status: "Activo", tone: "success" },
  { first: "María", last: "Sosa", dni: "30112456", phone: "+54 11 6234-5601", area: "neurologia", pro: "Dr. Pablo Herrera", os: "Swiss Medical", next: "10/09 09:30", status: "Activo", tone: "success" },
  { first: "Roberto", last: "Álvarez", dni: "22567890", phone: "+54 11 6345-6701", area: "traumatologia", pro: "Dr. Martín Rossi", os: "Galeno", next: "11/09 09:00", status: "Activo", tone: "success" },
  { first: "Sofía", last: "Pereyra", dni: "38901234", phone: "+54 11 6456-7801", area: "kinesiologia", pro: "Lic. Valentina Ruiz", os: "OSDE", next: "10/09 10:00", status: "Activo", tone: "success" },
  { first: "Diego", last: "Morales", dni: "26789012", phone: "+54 11 6567-8901", area: "traumatologia", pro: "Dr. Sebastián López", os: "Prevención Salud", next: "—", status: "Activo", tone: "success" },
  { first: "Elena", last: "Castro", dni: "19876543", phone: "+54 11 6678-9001", area: "neurologia", pro: "Dr. Pablo Herrera", os: "Swiss Medical", next: "10/09 16:00", status: "Activo", tone: "success" },
  { first: "Facundo", last: "Iglesias", dni: "40123456", phone: "+54 11 6789-0101", area: "kinesiologia", pro: "Lic. Ana Gómez", os: "Particular", next: "11/09 11:00", status: "Activo", tone: "success" },
];

export function ScreenPatients() {
  return (
    <>
      <PageTitle
        title="Pacientes"
        subtitle="Gestión integral de pacientes"
        actions={<PrimaryBtn icon={ICONS.plus} label="Nuevo paciente" />}
      />
      <FilterBar>
        <SearchBox placeholder="Buscar por nombre, DNI o teléfono..." />
        <PillGroup items={["Todas", "Traumatología", "Neurología", "Kinesiología"]} />
        <FakeSelect label="Obra social" width={118} />
        <FakeSelect label="Estado" width={100} />
      </FilterBar>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        <KpiCard title="Pacientes activos" value="18" delta="+8.5%" tone={{ bg: "#ecfdf5" }} />
        <KpiCard title="Nuevos este mes" value="5" delta="+12.3%" tone={{ bg: "#f0f9ff" }} />
        <KpiCard title="Altas médicas" value="1" delta="+5.2%" tone={{ bg: "#f0fdfa" }} />
        <KpiCard title="Sesiones pendientes" value="5" delta="+9.4%" tone={{ bg: "#f5f3ff" }} />
      </div>
      <div
        style={{
          overflow: "hidden",
          borderRadius: 16,
          border: `1px solid ${UI.border}`,
          background: UI.surface,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 12px",
            borderBottom: `1px solid ${UI.border}`,
          }}
        >
          <p style={{ margin: 0, fontSize: 13, fontWeight: 650 }}>21 pacientes</p>
          <div style={{ display: "flex", gap: 6 }}>
            <GhostBtn icon={ICONS.download} label="Exportar" />
            <GhostBtn icon={ICONS.cols} label="Columnas" />
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "rgba(248,250,252,0.95)" }}>
            <tr>
              <Th>Nombre</Th>
              <Th>DNI</Th>
              <Th>Área</Th>
              <Th>Profesional</Th>
              <Th>Obra social</Th>
              <Th>Estado</Th>
            </tr>
          </thead>
          <tbody>
            {patientRows.map((row, i) => (
              <tr key={row.dni} style={{ background: i === 0 ? "rgba(224,242,254,0.45)" : undefined }}>
                <Td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar name={`${row.first} ${row.last}`} />
                    <div>
                      <p style={{ margin: 0, fontWeight: 650, fontSize: 12 }}>
                        {row.first} {row.last}
                      </p>
                      <p style={{ margin: 0, fontSize: 10, color: UI.muted }}>{row.phone}</p>
                    </div>
                  </div>
                </Td>
                <Td muted>{row.dni}</Td>
                <Td>
                  <AreaChip area={row.area} />
                </Td>
                <Td muted>{row.pro.replace(/^Dr\.\s|^Lic\.\s/, "")}</Td>
                <Td muted>{row.os}</Td>
                <Td>
                  <Badge label={row.status} tone={row.tone} />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 12px",
            borderTop: `1px solid ${UI.border}`,
            fontSize: 12,
            color: UI.muted,
          }}
        >
          <p style={{ margin: 0 }}>Mostrando 1–7 de 21</p>
          <div style={{ display: "flex", gap: 6 }}>
            <GhostBtn label="Anterior" />
            <GhostBtn label="Siguiente" />
          </div>
        </div>
      </div>
    </>
  );
}

const sessionRows = [
  { date: "10/09/2026", name: "Juan Carlos Benitez", os: "OSDE", area: "kinesiologia", pro: "Lic. Camila Ferreyra", type: "Sesión", value: 18500 },
  { date: "09/09/2026", name: "María Sosa", os: "Swiss Medical", area: "neurologia", pro: "Lic. Camila Ferreyra", type: "Sesión", value: 34400 },
  { date: "10/09/2026", name: "Hernán Vidal", os: "Prevención Salud", area: "traumatologia", pro: "Dr. Sebastián López", type: "Sesión", value: 14500 },
  { date: "09/09/2026", name: "Juan Carlos Benitez", os: "OSDE", area: "kinesiologia", pro: "Lic. Ana Gómez", type: "Sesión", value: 18500 },
  { date: "09/09/2026", name: "María Sosa", os: "Swiss Medical", area: "neurologia", pro: "Dr. Pablo Herrera", type: "Sesión", value: 17200 },
  { date: "08/09/2026", name: "Sofía Pereyra", os: "OSDE", area: "kinesiologia", pro: "Lic. Valentina Ruiz", type: "Sesión", value: 18500 },
  { date: "08/09/2026", name: "Elena Castro", os: "Swiss Medical", area: "neurologia", pro: "Dr. Pablo Herrera", type: "Sesión", value: 17200 },
  { date: "07/09/2026", name: "Patricia Domínguez", os: "Galeno", area: "traumatologia", pro: "Dr. Martín Rossi", type: "Sesión", value: 15800 },
  { date: "07/09/2026", name: "Gabriela Paz", os: "Swiss Medical", area: "neurologia", pro: "Dr. Pablo Herrera", type: "Sesión", value: 17200 },
];

export function ScreenSessions() {
  return (
    <>
      <PageTitle
        title="Sesiones"
        subtitle="Historial de sesiones ya realizadas. Las pendientes se gestionan en Agenda."
        actions={<PrimaryBtn icon={ICONS.calendar} label="Ir a agenda" />}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
        <KpiCard title="Realizadas hoy" value="3" delta="hoy" tone={{ bg: "#ecfdf5" }} />
        <KpiCard title="Realizadas del mes" value="16" delta="mes actual" tone={{ bg: "#f0f9ff" }} />
        <KpiCard title="Facturación del mes" value={ars(298400)} delta="29 en total" tone={{ bg: "#fffbeb" }} />
      </div>
      <FilterBar>
        <SearchBox placeholder="Buscar paciente, profesional u OS..." />
        <PillGroup items={["Todas", "Hoy", "Este mes"]} />
        <FakeSelect label="Profesional" width={118} />
      </FilterBar>
      <div
        style={{
          overflow: "hidden",
          borderRadius: 16,
          border: `1px solid ${UI.border}`,
          background: UI.surface,
        }}
      >
        <div style={{ padding: "10px 12px", borderBottom: `1px solid ${UI.border}` }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 650 }}>29 sesiones realizadas</p>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "rgba(248,250,252,0.95)" }}>
            <tr>
              <Th>Fecha</Th>
              <Th>Paciente</Th>
              <Th>Área</Th>
              <Th>Profesional</Th>
              <Th>Estado</Th>
              <Th>Valor</Th>
            </tr>
          </thead>
          <tbody>
            {sessionRows.map((row, i) => (
              <tr key={row.date + row.name + row.pro} style={{ background: i === 0 ? "rgba(224,242,254,0.45)" : undefined }}>
                <Td muted nowrap>{row.date}</Td>
                <Td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar name={row.name} />
                    <div>
                      <p style={{ margin: 0, fontWeight: 650, fontSize: 12 }}>{row.name}</p>
                      <p style={{ margin: 0, fontSize: 10, color: UI.muted }}>{row.os}</p>
                    </div>
                  </div>
                </Td>
                <Td>
                  <AreaChip area={row.area} />
                </Td>
                <Td muted>{row.pro.replace(/^Dr\.\s|^Lic\.\s/, "")}</Td>
                <Td>
                  <Badge label="Realizada" tone="success" />
                </Td>
                <Td nowrap>
                  <span style={{ fontWeight: 650 }}>{ars(row.value)}</span>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 12px",
            borderTop: `1px solid ${UI.border}`,
            fontSize: 12,
            color: UI.muted,
          }}
        >
          <p style={{ margin: 0 }}>Página 1 de 4</p>
          <div style={{ display: "flex", gap: 6 }}>
            <GhostBtn label="Anterior" />
            <GhostBtn label="Siguiente" />
          </div>
        </div>
      </div>
    </>
  );
}

const reportKpis = [
  { title: "Pacientes activos", value: "18", tone: "#f0f9ff" },
  { title: "Pacientes nuevos", value: "5", tone: "#f5f3ff" },
  { title: "Sesiones realizadas", value: "29", tone: "#ecfdf5" },
  { title: "Ausentismo", value: "1", tone: "#fffbeb" },
  { title: "Ingresos estimados", value: ars(530200), tone: "#f0fdfa" },
  { title: "Pagos pendientes", value: ars(2011300), tone: "#fef2f2" },
  { title: "Auth. vencidas", value: "5", tone: "#fff7ed" },
  { title: "Productividad", value: "1.6", tone: "#eef2ff" },
];

const monthBars = [
  { m: "Abr", v: 28 },
  { m: "May", v: 36 },
  { m: "Jun", v: 44 },
  { m: "Jul", v: 52 },
  { m: "Ago", v: 61 },
  { m: "Sep", v: 29 },
];

const proBars = [
  { name: "Herrera", v: 7 },
  { name: "Ruiz", v: 7 },
  { name: "Rossi", v: 5 },
  { name: "Gómez", v: 5 },
  { name: "López", v: 3 },
  { name: "Ferreyra", v: 2 },
];

const osSlices = [
  { name: "OSDE", v: 6, color: "#0055A5" },
  { name: "Swiss", v: 5, color: "#C8102E" },
  { name: "Galeno", v: 5, color: "#008C8C" },
  { name: "Prevención", v: 3, color: "#E91E8C" },
  { name: "Particular", v: 2, color: "#64748B" },
];

const ranking = [
  { name: "Dr. Pablo Herrera", patients: 5, sessions: 7, income: 290900, level: "Alto", tone: "success" },
  { name: "Lic. Valentina Ruiz", patients: 4, sessions: 7, income: 261000, level: "Medio", tone: "info" },
  { name: "Dr. Martín Rossi", patients: 4, sessions: 5, income: 228000, level: "Medio", tone: "info" },
  { name: "Lic. Ana Gómez", patients: 5, sessions: 5, income: 317400, level: "Base", tone: "neutral" },
];

export function ScreenReports() {
  const maxMonth = 61;
  const maxPro = 7;
  return (
    <>
      <PageTitle
        title="Reportes"
        subtitle="Indicadores operativos y productividad del centro"
        actions={
          <>
            <GhostBtn icon={ICONS.file} label="Exportar PDF" />
            <GhostBtn icon={ICONS.sheet} label="Exportar Excel" />
          </>
        }
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        {reportKpis.map((kpi) => (
          <KpiCard key={kpi.title} title={kpi.title} value={kpi.value} tone={{ bg: kpi.tone }} />
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <div
          style={{
            borderRadius: 16,
            border: `1px solid ${UI.border}`,
            background: UI.surface,
            padding: 14,
          }}
        >
          <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700 }}>Sesiones y ausentismo por mes</p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
            {monthBars.map((bar) => (
              <div
                key={bar.m}
                style={{
                  flex: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: "78%",
                    height: Math.max(10, (bar.v / maxMonth) * 96),
                    borderRadius: "8px 8px 0 0",
                    background: UI.primary,
                  }}
                />
                <span style={{ fontSize: 10, color: UI.muted }}>{bar.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            borderRadius: 16,
            border: `1px solid ${UI.border}`,
            background: UI.surface,
            padding: 14,
          }}
        >
          <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700 }}>Sesiones por profesional</p>
          {proBars.map((bar) => (
            <div key={bar.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ width: 62, fontSize: 11, color: "#475569" }}>{bar.name}</span>
              <div style={{ flex: 1, height: 10, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${(bar.v / maxPro) * 100}%`,
                    height: "100%",
                    background: UI.primaryDark,
                    borderRadius: 99,
                  }}
                />
              </div>
              <span style={{ width: 16, fontSize: 11, fontWeight: 700, color: UI.fg }}>{bar.v}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            borderRadius: 16,
            border: `1px solid ${UI.border}`,
            background: UI.surface,
            padding: 14,
          }}
        >
          <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700 }}>Pacientes por área</p>
          {[
            { name: "Kinesiología", v: 8, color: "#0ea5e9" },
            { name: "Traumatología", v: 6, color: "#0284c7" },
            { name: "Neurología", v: 4, color: "#6366f1" },
          ].map((bar) => (
            <div key={bar.name} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#334155" }}>{bar.name}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: bar.color }}>{bar.v}</span>
              </div>
              <div style={{ height: 8, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: `${(bar.v / 8) * 100}%`, height: "100%", background: bar.color }} />
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            borderRadius: 16,
            border: `1px solid ${UI.border}`,
            background: UI.surface,
            padding: 14,
          }}
        >
          <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700 }}>Pacientes por obra social</p>
          {osSlices.map((item) => (
            <div
              key={item.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
                background: UI.slate,
                borderRadius: 8,
                padding: "6px 8px",
                fontSize: 11,
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: 99, background: item.color }} />
              <span style={{ flex: 1, fontWeight: 650 }}>{item.name}</span>
              <span style={{ color: UI.muted }}>{item.v}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          overflow: "hidden",
          borderRadius: 16,
          border: `1px solid ${UI.border}`,
          background: UI.surface,
        }}
      >
        <div style={{ padding: "12px 14px", borderBottom: `1px solid ${UI.border}` }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>Ranking de productividad</p>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "rgba(248,250,252,0.95)" }}>
            <tr>
              <Th>#</Th>
              <Th>Profesional</Th>
              <Th>Pacientes</Th>
              <Th>Sesiones</Th>
              <Th>Ingreso estimado</Th>
              <Th>Nivel</Th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((row, i) => (
              <tr key={row.name}>
                <Td muted>{i + 1}</Td>
                <Td>
                  <span style={{ fontWeight: 650 }}>{row.name}</span>
                </Td>
                <Td muted>{row.patients}</Td>
                <Td muted>{row.sessions}</Td>
                <Td>
                  <span style={{ fontWeight: 700 }}>{ars(row.income)}</span>
                </Td>
                <Td>
                  <Badge label={row.level} tone={row.tone} />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export const carouselSlides = [
  { key: "agenda", label: "Agenda", Screen: ScreenAgenda },
  { key: "profesionales", label: "Profesionales", Screen: ScreenProfessionals },
  { key: "pacientes", label: "Pacientes", Screen: ScreenPatients },
  { key: "sesiones", label: "Sesiones", Screen: ScreenSessions },
  { key: "reportes", label: "Reportes", Screen: ScreenReports },
];
