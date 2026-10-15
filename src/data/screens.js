// Placeholder product screens rendered in code until real screenshots arrive.
// To swap one for a real capture, set `image` on the matching showcase item.

export const heroScreen = {
  brand: "Vireon OS",
  slug: "operacion",
  nav: ["Resumen", "Ventas", "Stock", "Turnos", "Clientes", "Reportes", "Usuarios"],
  title: "Resumen de operación",
  subtitle: "Martes 14 de octubre · 3 sucursales activas",
  kpis: [
    { label: "Ventas del día", value: 2336210, prefix: "$ ", delta: "+12,4%" },
    { label: "Pedidos", value: 124, delta: "+8 vs ayer" },
    { label: "Ticket promedio", value: 47677, prefix: "$ ", delta: "+3,1%" },
    { label: "Stock crítico", value: 3, suffix: " productos", delta: "Revisar", tone: "warn" },
  ],
  chart: {
    title: "Ventas de la semana",
    total: "$ 9,8 M",
    points: [38, 52, 46, 68, 59, 86, 74],
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
  },
  bars: {
    title: "Por sucursal",
    items: [
      { label: "Concepción", value: 82, display: "$ 1,1 M" },
      { label: "Simoca", value: 64, display: "$ 860 K" },
      { label: "Villa Quinteros", value: 41, display: "$ 376 K" },
    ],
  },
  table: {
    title: "Últimos movimientos",
    cols: ["Hora", "Concepto", "Sucursal", "Monto", "Estado"],
    rows: [
      ["12:48", "Venta #4821", "Concepción", "$ 38.400", ["Cobrado", "ok"]],
      ["12:41", "Ingreso de stock", "Simoca", "120 u.", ["Recibido", "info"]],
      ["12:36", "Venta #4820", "Villa Quinteros", "$ 12.900", ["Cobrado", "ok"]],
      ["12:22", "Cierre de turno", "Concepción", "$ 412.000", ["Cerrado", "info"]],
      ["12:15", "Pedido #318", "Simoca", "$ 64.300", ["Pendiente", "warn"]],
    ],
  },
};

export const projectScreens = {
  hotelus: {
    brand: "Hotelus",
    slug: "hotelus/cadena",
    nav: ["Panel", "Reservas", "Habitaciones", "Huéspedes", "Limpieza", "Propiedades", "Reportes"],
    title: "Ocupación de la cadena",
    subtitle: "4 propiedades · actualizado hace 1 min",
    kpis: [
      { label: "Ocupación", value: 87, suffix: "%", delta: "+6 pts" },
      { label: "Reservas hoy", value: 42, delta: "+9" },
      { label: "Check-ins", value: 18, delta: "6 pendientes", tone: "warn" },
      { label: "Habitaciones listas", value: 64, suffix: "/72", delta: "89%" },
    ],
    bars: {
      title: "Ocupación por propiedad",
      items: [
        { label: "Hotel Centro", value: 92, display: "92%" },
        { label: "Hotel Norte", value: 84, display: "84%" },
        { label: "Cabañas del Sur", value: 71, display: "71%" },
        { label: "Posada Río", value: 63, display: "63%" },
      ],
    },
    table: {
      title: "Llegadas de hoy",
      cols: ["Huésped", "Propiedad", "Hab.", "Noches", "Estado"],
      rows: [
        ["M. Fernández", "Hotel Centro", "204", "3", ["Check-in", "ok"]],
        ["L. Gómez", "Hotel Norte", "112", "2", ["Confirmada", "info"]],
        ["R. Paz", "Cabañas del Sur", "C4", "5", ["Confirmada", "info"]],
        ["J. Medina", "Hotel Centro", "310", "1", ["Pendiente", "warn"]],
        ["A. Ruiz", "Posada Río", "07", "4", ["Check-in", "ok"]],
      ],
    },
  },
  "llorens-group": {
    brand: "Llorens Group",
    slug: "llorens/ventas",
    nav: ["Panel", "Ventas", "Productos", "Stock", "Sucursales", "Turnos", "Usuarios"],
    title: "Ventas por sucursal",
    subtitle: "Simoca · Villa Quinteros · Concepción",
    kpis: [
      { label: "Ventas del día", value: 1284300, prefix: "$ ", delta: "+9,8%" },
      { label: "Operaciones", value: 96, delta: "+14" },
      { label: "Productos activos", value: 412, delta: "3 sucursales" },
      { label: "Alertas", value: 2, delta: "Stock bajo", tone: "warn" },
    ],
    bars: {
      title: "Facturación por sucursal",
      items: [
        { label: "Concepción", value: 88, display: "$ 612 K" },
        { label: "Simoca", value: 61, display: "$ 421 K" },
        { label: "Villa Quinteros", value: 37, display: "$ 251 K" },
      ],
    },
    table: {
      title: "Cierres de turno",
      cols: ["Turno", "Sucursal", "Responsable", "Total", "Estado"],
      rows: [
        ["Mañana", "Concepción", "D. Ibáñez", "$ 318.200", ["Cerrado", "ok"]],
        ["Mañana", "Simoca", "C. Luna", "$ 204.900", ["Cerrado", "ok"]],
        ["Mañana", "V. Quinteros", "P. Sosa", "$ 121.400", ["Cerrado", "ok"]],
        ["Tarde", "Concepción", "M. Ríos", "$ 96.300", ["Abierto", "info"]],
        ["Tarde", "Simoca", "F. Díaz", "$ 48.700", ["Abierto", "info"]],
      ],
    },
  },
  "campos-de-trigo": {
    brand: "Campos de Trigo",
    slug: "campos/pedidos",
    nav: ["Pedidos", "Producción", "Repartos", "Clientes", "Productos", "Reportes", "Usuarios"],
    title: "Pedidos del día",
    subtitle: "Producción y reparto en tiempo real",
    kpis: [
      { label: "Pedidos", value: 124, delta: "+11 vs ayer" },
      { label: "En producción", value: 38, delta: "31%", tone: "warn" },
      { label: "En reparto", value: 52, delta: "4 repartidores" },
      { label: "Entregados", value: 34, delta: "27%" },
    ],
    bars: {
      title: "Avance por repartidor",
      items: [
        { label: "Ruta Centro", value: 76, display: "19/25" },
        { label: "Ruta Norte", value: 58, display: "11/19" },
        { label: "Ruta Sur", value: 44, display: "8/18" },
        { label: "Ruta Oeste", value: 30, display: "6/20" },
      ],
    },
    table: {
      title: "Pedidos recientes",
      cols: ["Pedido", "Cliente", "Productos", "Reparto", "Estado"],
      rows: [
        ["#1284", "Almacén Don José", "48 u.", "Centro", ["En reparto", "info"]],
        ["#1283", "Kiosco La Esquina", "24 u.", "Norte", ["Producción", "warn"]],
        ["#1282", "Despensa Mary", "36 u.", "Sur", ["Entregado", "ok"]],
        ["#1281", "Bar El Puente", "60 u.", "Centro", ["En reparto", "info"]],
        ["#1280", "Café Plaza", "18 u.", "Oeste", ["Entregado", "ok"]],
      ],
    },
  },
  "hotel-totem-boutique": {
    brand: "Tótem Boutique",
    slug: "totem/hotel",
    nav: ["Panel", "Reservas", "Habitaciones", "Huéspedes", "Limpieza", "Reportes"],
    title: "Estado del hotel",
    subtitle: "Hoy · 18 habitaciones",
    kpis: [
      { label: "Ocupación", value: 78, suffix: "%", delta: "+4 pts" },
      { label: "Ingresos hoy", value: 6, delta: "2 pendientes", tone: "warn" },
      { label: "Salidas hoy", value: 4, delta: "Antes de 11:00" },
      { label: "En limpieza", value: 3, delta: "En curso" },
    ],
    bars: {
      title: "Habitaciones por estado",
      items: [
        { label: "Ocupadas", value: 78, display: "14" },
        { label: "Libres", value: 17, display: "3" },
        { label: "En limpieza", value: 17, display: "3" },
      ],
    },
    table: {
      title: "Movimientos de hoy",
      cols: ["Hab.", "Huésped", "Tipo", "Horario", "Estado"],
      rows: [
        ["101", "S. Álvarez", "Ingreso", "14:00", ["Listo", "ok"]],
        ["104", "N. Torres", "Salida", "10:30", ["Limpieza", "warn"]],
        ["202", "E. Castro", "Ingreso", "15:30", ["Pendiente", "info"]],
        ["205", "V. Molina", "Salida", "11:00", ["Limpieza", "warn"]],
        ["301", "G. Herrera", "Ingreso", "18:00", ["Pendiente", "info"]],
      ],
    },
  },
};
