const numberFormat = new Intl.NumberFormat("es-AR");

const toneClass = {
  ok: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  info: "bg-white/[0.06] text-zinc-300 ring-white/10",
  warn: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
};

function buildPaths(points, width, height, pad = 8) {
  const max = Math.max(...points) * 1.1;
  const step = (width - pad * 2) / (points.length - 1);
  const coords = points.map((value, index) => [
    pad + index * step,
    height - (value / max) * (height - pad * 2) - pad,
  ]);

  const line = coords
    .map(([x, y], index) => {
      if (index === 0) {
        return `M ${x} ${y}`;
      }
      const [px, py] = coords[index - 1];
      const cx = (px + x) / 2;
      return `C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`;
    })
    .join(" ");

  const area = `${line} L ${coords.at(-1)[0]} ${height} L ${coords[0][0]} ${height} Z`;
  return { line, area, coords };
}

function Kpi({ kpi }) {
  const display = `${kpi.prefix ?? ""}${numberFormat.format(kpi.value)}${kpi.suffix ?? ""}`;
  return (
    <div className="as-card rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
      <p className="text-[13px] text-zinc-500">{kpi.label}</p>
      <p
        className="as-count mt-2 text-[26px] font-semibold tracking-[-0.03em] text-white tabular-nums"
        data-value={kpi.value}
        data-prefix={kpi.prefix ?? ""}
        data-suffix={kpi.suffix ?? ""}
      >
        {display}
      </p>
      <span
        className={`mt-3 inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${
          kpi.tone === "warn" ? toneClass.warn : toneClass.ok
        }`}
      >
        {kpi.delta}
      </span>
    </div>
  );
}

function Chart({ chart }) {
  const width = 640;
  const height = 170;
  const { line, area, coords } = buildPaths(chart.points, width, height);

  return (
    <div className="as-card flex min-h-0 flex-col rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
      <div className="flex items-baseline justify-between">
        <p className="text-[13px] text-zinc-400">{chart.title}</p>
        <p className="text-[18px] font-semibold tracking-[-0.02em] text-white">
          {chart.total}
        </p>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-4 h-[170px] w-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="as-area-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1="0"
            x2={width}
            y1={height * ratio}
            y2={height * ratio}
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="4 6"
          />
        ))}
        <path className="as-area" d={area} fill="url(#as-area-fill)" />
        <path
          className="as-line"
          d={line}
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle
          className="as-dot"
          cx={coords.at(-2)[0]}
          cy={coords.at(-2)[1]}
          r="5"
          fill="#09090b"
          stroke="#fff"
          strokeWidth="2"
        />
      </svg>
      <div className="mt-3 flex justify-between text-[11px] text-zinc-600">
        {chart.labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function Bars({ bars }) {
  return (
    <div className="as-card flex min-h-0 flex-col rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
      <p className="text-[13px] text-zinc-400">{bars.title}</p>
      <div className="mt-5 flex flex-1 flex-col justify-around gap-4">
        {bars.items.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-[13px]">
              <span className="text-zinc-300">{item.label}</span>
              <span className="text-zinc-500 tabular-nums">{item.display}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="as-bar h-full origin-left rounded-full bg-linear-to-r from-white/50 to-white"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Table({ table, compact }) {
  return (
    <div className="as-card flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]">
      <p className="border-b border-white/[0.06] px-5 py-3.5 text-[13px] text-zinc-400">
        {table.title}
      </p>
      <div className="grid grid-cols-[0.8fr_1.4fr_1.1fr_0.9fr_0.9fr] gap-3 px-5 pt-3 pb-2 text-[11px] tracking-wide text-zinc-600 uppercase">
        {table.cols.map((col) => (
          <span key={col}>{col}</span>
        ))}
      </div>
      {table.rows.slice(0, compact ? 4 : 5).map((row) => (
        <div
          key={row.slice(0, 2).join("-")}
          className="as-row grid grid-cols-[0.8fr_1.4fr_1.1fr_0.9fr_0.9fr] items-center gap-3 border-t border-white/[0.04] px-5 py-[11px] text-[13px]"
        >
          {row.slice(0, 4).map((cell, index) => (
            <span
              key={index}
              className={index === 1 ? "truncate text-zinc-200" : "truncate text-zinc-500 tabular-nums"}
            >
              {cell}
            </span>
          ))}
          <span>
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${toneClass[row[4][1]]}`}
            >
              {row[4][0]}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function AppScreen({ screen }) {
  return (
    <div className="as flex h-full w-full flex-col bg-[#09090b] text-zinc-200 antialiased">
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-white/[0.06] px-4">
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="mx-auto rounded-md border border-white/[0.06] bg-white/[0.03] px-24 py-1 text-[12px] text-zinc-500">
          app.vireon.dev/{screen.slug}
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[220px] shrink-0 flex-col border-r border-white/[0.06] p-4">
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-[13px] font-bold text-black">
              {screen.brand[0]}
            </span>
            <span className="truncate text-[14px] font-semibold text-white">
              {screen.brand}
            </span>
          </div>
          <nav className="mt-6 flex flex-col gap-1">
            {screen.nav.map((item, index) => (
              <span
                key={item}
                className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13px] ${
                  index === 0
                    ? "bg-white/[0.07] text-white"
                    : "text-zinc-500"
                }`}
              >
                <span
                  className={`h-3.5 w-3.5 rounded-[4px] border ${
                    index === 0 ? "border-white/60" : "border-white/15"
                  }`}
                />
                {item}
              </span>
            ))}
          </nav>
          <div className="mt-auto flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5">
            <span className="h-7 w-7 rounded-full bg-linear-to-br from-zinc-400 to-zinc-700" />
            <div className="min-w-0">
              <p className="truncate text-[12px] text-zinc-300">Administración</p>
              <p className="truncate text-[11px] text-zinc-600">En línea</p>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col gap-5 p-7">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[22px] font-semibold tracking-[-0.03em] text-white">
                {screen.title}
              </p>
              <p className="mt-1 text-[13px] text-zinc-500">{screen.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              {["Hoy", "7 días", "Mes"].map((chip, index) => (
                <span
                  key={chip}
                  className={`rounded-lg px-3 py-1.5 text-[12px] ${
                    index === 0
                      ? "bg-white text-black"
                      : "border border-white/[0.08] text-zinc-400"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {screen.kpis.map((kpi) => (
              <Kpi key={kpi.label} kpi={kpi} />
            ))}
          </div>

          {screen.chart ? (
            <>
              <div className="grid grid-cols-[1.6fr_1fr] gap-4">
                <Chart chart={screen.chart} />
                <Bars bars={screen.bars} />
              </div>
              <Table table={screen.table} compact />
            </>
          ) : (
            <div className="grid min-h-0 flex-1 grid-cols-[1.6fr_1fr] gap-4">
              <Table table={screen.table} />
              <Bars bars={screen.bars} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AppScreen;
