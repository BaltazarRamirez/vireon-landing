import llorensLogo from "../assets/client-llorens.webp";
import camposDeTrigoLogo from "../assets/campos-de-trigo.webp";
import molinosLogo from "../assets/client-molinos.webp";
import totemLogo from "../assets/client-totem.webp";
import hotelusLogo from "../assets/hotelus-logo.webp";
import camposAnalytics from "../assets/projects/campos-analytics.jpg";
import camposPedidos from "../assets/projects/campos-pedidos.jpg";
import camposPrecios from "../assets/projects/campos-precios.jpg";
import llorensDetalle from "../assets/projects/llorens-detalle.jpg";
import llorensResumen from "../assets/projects/llorens-resumen.jpg";
import llorensStock from "../assets/projects/llorens-stock.jpg";
import vidaPlenaAgenda from "../assets/projects/vidaplena-agenda.jpg";
import vidaPlenaDashboard from "../assets/projects/vidaplena-dashboard.jpg";
import vidaPlenaReportes from "../assets/projects/vidaplena-reportes.jpg";
import vidaPlenaLogo from "../assets/client-vidaplena.png";

export const flagshipProject = {
  id: "hotelus",
  name: "Hotelus",
  partnership: "de Vireon",
  badge: "Producto propio",
  category: "Plataforma hotelera",
  tags: [
    "Multihotel",
    "Cadenas",
    "Reservas",
    "Operación",
    "Ocupación",
    "Multi alojamientos",
  ],
  highlights: [
    "Un hotel o toda una cadena",
    "Multi alojamientos",
    "Operación centralizada",
    "Control en tiempo real",
  ],
  tagline:
    "Plataforma para gestionar hoteles y cadenas de alojamientos desde un solo lugar.",
  description:
    "Pensada para hoteles, grupos y cadenas que necesitan operar uno o muchos alojamientos. Centraliza reservas, habitaciones, huéspedes, disponibilidad, limpieza, ocupación y la operatoria diaria de cada propiedad.",
  fullDescription:
    "Hotelus es la plataforma propia de Vireon para gestión hotelera multipropiedad. Está diseñada para hoteles independientes, grupos y cadenas que administran uno o varios alojamientos y necesitan una herramienta única para controlar la operación. Desde un mismo sistema se gestionan reservas, habitaciones, huéspedes, disponibilidad, ingresos, salidas, limpieza, ocupación y tareas del personal en cada establecimiento, con reportes y visión consolidada a nivel cadena. El objetivo es que cualquier operación hotelera —de un boutique a una red completa— ordene su día a día, reduzca errores y gane control real sobre el negocio.",
  image: hotelusLogo,
  gallery: [],
  features: [
    "Gestión multi hotel y multi alojamiento",
    "Apto para hoteles independientes y cadenas",
    "Reservas por propiedad y a nivel grupo",
    "Control de habitaciones y disponibilidad",
    "Registro y seguimiento de huéspedes",
    "Ingresos, salidas y estados de limpieza",
    "Ocupación por hotel y consolidada",
    "Organización de tareas del personal",
    "Visión global de toda la operación",
    "Base lista para sumar nuevas propiedades",
  ],
  challenge:
    "Cuando hay varios alojamientos o una operación en crecimiento, las herramientas sueltas por hotel dificultan el control, generan errores y no permiten ver el negocio completo.",
  solution:
    "Hotelus unifica la operación: cada propiedad trabaja con claridad y el grupo obtiene control total sobre reservas, ocupación, limpieza y el día a día de todos sus alojamientos.",
};

export const featuredProjects = [
  {
    id: "llorens-group",
    name: "Llorens Group",
    category: "Sistema de gestión",
    tags: ["Turnos", "Facturación", "Stock", "Multisucursal", "Ventas"],
    tagline:
      "Sistema de gestión multisucursal para una empresa de lubricantes y combustibles.",
    description:
      "Plataforma de gestión desarrollada a medida para centralizar las ventas, el stock y la operación de múltiples sucursales. El sistema permite administrar productos, precios, usuarios, cierres de turno y movimientos comerciales desde un único panel.",
    fullDescription:
      "Llorens Group es un sistema de gestión desarrollado a medida para una empresa dedicada a la comercialización de lubricantes, aceites y otros productos relacionados con el sector automotor y de combustibles. La aplicación permite centralizar la operación de diferentes sucursales en una sola plataforma, facilitando el control de ventas, productos, stock, usuarios y movimientos comerciales.",
    locations: ["Simoca", "Villa Quinteros", "Concepción"],
    image: llorensLogo,
    gallery: [
      { src: llorensResumen, alt: "Llorens Group · Resumen mensual de facturación" },
      { src: llorensDetalle, alt: "Llorens Group · Facturación por estación y forma de pago" },
      { src: llorensStock, alt: "Llorens Group · Stock global por estación" },
    ],
    features: [
      "Registro y control de ventas",
      "Administración de productos y lubricantes",
      "Gestión de stock por sucursal",
      "Actualización de precios",
      "Control de usuarios y permisos",
      "Gestión de múltiples puntos de venta",
      "Visualización de movimientos por sucursal",
      "Panel administrativo general",
      "Registro de cierres de turno",
      "Historial de ventas y modificaciones",
      "Alertas y notificaciones sobre operaciones importantes",
      "Diseño adaptable para computadoras, tablets y teléfonos",
    ],
    challenge:
      "La empresa necesitaba centralizar la información de sus diferentes puntos de venta, mejorar el control de productos y disponer de una visión general de todas sus operaciones.",
    solution:
      "Desarrollamos una plataforma personalizada que permite gestionar las ventas, el stock, los usuarios y los movimientos de cada sucursal desde un sistema centralizado, simple y accesible.",
    },
  {
    id: "campos-de-trigo",
    name: "Campos de Trigo",
    category: "Sistema de gestión",
    tags: [
      "Pedidos",
      "Producción",
      "Entregas",
      "Clientes",
      "Roles",
      "Reportes",
    ],
    tagline:
      "Sistema de gestión para una panadería que procesa aproximadamente 120 pedidos diarios.",
    description:
      "Plataforma desarrollada para centralizar pedidos, productos, precios, clientes, repartidores y usuarios. Organiza el trabajo diario de la panadería y reduce los procesos manuales.",
    fullDescription:
      "Para Campos de Trigo desarrollamos un sistema de gestión para una panadería que procesa pedidos, stock de productos y entrega de pedidos a distintos repartidores. La plataforma centraliza la administración de pedidos, productos, precios, clientes, repartidores y usuarios. El objetivo del proyecto es reemplazar procesos manuales, reducir errores y mejorar la organización diaria, permitiendo que todo el equipo trabaje desde una misma plataforma.",
    image: camposDeTrigoLogo,
    gallery: [
      { src: camposAnalytics, alt: "Campos de Trigo · Analytics de ventas" },
      { src: camposPedidos, alt: "Campos de Trigo · Control general de pedidos" },
      { src: camposPrecios, alt: "Campos de Trigo · Catálogo y precios" },
    ],
    features: [
      "Registro y seguimiento de pedidos",
      "Actualización de estados de pedidos",
      "Preparación de la producción diaria",
      "Asignación de entregas a repartidores",
      "Impresión de comprobantes",
      "Administración de productos y precios",
      "Gestión de clientes",
      "Control de usuarios y roles de acceso",
      "Roles para administradores, empleados, y repartidores",
      "Consulta de reportes de ventas",
    ],
    challenge:
      "La panadería necesitaba dejar atrás procesos manuales, reducir errores y organizar mejor el flujo diario de pedidos, producción y entregas entre distintos roles del equipo.",
    solution:
      "Desarrollamos una plataforma centralizada que permite gestionar pedidos, producción, entregas, clientes y usuarios desde un mismo sistema, con roles claros para cada área de la operación.",
    roles: [
      "Administradores",
      "Empleados",
      "Producción",
      "Repartidores",
    ],
  },
  {
    id: "molinos-combustibles",
    name: "Molinos Combustibles",
    category: "Sistema de gestión",
    tags: [
      "Turnos",
      "Caja",
      "Combustibles",
      "Stock",
      "Cuentas corrientes",
      "Reportes",
    ],
    tagline:
      "Sistema de gestión para una estación de servicio, pensado para centralizar y simplificar la operación diaria.",
    description:
      "Plataforma desarrollada para administrar turnos, cierres de caja, ventas de combustibles y productos, stock de tanques y surtidores, precios y cuentas corrientes desde un único sistema.",
    fullDescription:
      "Para Molinos Combustibles desarrollamos un sistema de gestión para una estación de servicio, pensado para centralizar y simplificar la operación diaria del negocio. La plataforma permite administrar turnos y cierres de caja, registrar ventas de combustibles, aceites y otros productos, controlar el stock de tanques y surtidores, actualizar precios y gestionar cuentas corrientes de clientes y productores. También cuenta con distintos roles de acceso para administradores y playeros, además de reportes que facilitan el seguimiento de ventas, movimientos de combustible y estado general de la estación.",
    image: molinosLogo,
    gallery: [],
    features: [
      "Administración de turnos y cierres de caja",
      "Registro de ventas de combustibles",
      "Venta de aceites y otros productos",
      "Control de stock de tanques y surtidores",
      "Actualización de precios",
      "Gestión de cuentas corrientes de clientes",
      "Gestión de cuentas corrientes de productores",
      "Roles de acceso para administradores y playeros",
      "Reportes de ventas y movimientos de combustible",
      "Seguimiento del estado general de la estación",
    ],
    challenge:
      "La estación necesitaba reemplazar registros manuales, reducir errores y ganar mayor control sobre turnos, caja, stock de combustible y cuentas corrientes desde una sola herramienta.",
    solution:
      "Desarrollamos una plataforma centralizada que organiza la operación diaria de la estación: turnos, ventas, stock, precios, cuentas corrientes y reportes, con roles claros para administradores y playeros.",
    roles: ["Administradores", "Playeros"],
    },
  {
    id: "hotel-totem-boutique",
    name: "Hotel Tótem Boutique",
    category: "Sistema de gestión",
    tags: [
      "Reservas",
      "Habitaciones",
      "Huéspedes",
      "Disponibilidad",
      "Limpieza",
      "Ocupación",
    ],
    tagline:
      "Sistema de gestión para un hotel boutique, pensado para centralizar y simplificar la administración diaria.",
    description:
      "Plataforma desarrollada para gestionar habitaciones, reservas, huéspedes, disponibilidad, ingresos, salidas y estados de limpieza desde un único sistema.",
    fullDescription:
      "Para Hotel Tótem Boutique desarrollamos un sistema de gestión para un hotel, pensado para centralizar y simplificar la administración diaria del establecimiento. La plataforma permite gestionar habitaciones, reservas, huéspedes, disponibilidad, ingresos, salidas y estados de limpieza. También facilita el seguimiento de la ocupación y la organización de las tareas del personal. El objetivo del proyecto es reemplazar registros manuales, reducir errores y mejorar el control de la operación del hotel desde una única plataforma.",
    image: totemLogo,
    gallery: [],
    features: [
      "Gestión de habitaciones",
      "Administración de reservas",
      "Registro y seguimiento de huéspedes",
      "Control de disponibilidad",
      "Gestión de ingresos y salidas",
      "Estados de limpieza de habitaciones",
      "Seguimiento de ocupación",
      "Organización de tareas del personal",
    ],
    challenge:
      "El hotel necesitaba dejar atrás registros manuales, reducir errores y mejorar el control diario de reservas, habitaciones, huéspedes y limpieza desde una sola herramienta.",
    solution:
      "Desarrollamos una plataforma centralizada que organiza la operación del hotel: reservas, disponibilidad, ingresos, salidas, estados de limpieza y seguimiento de ocupación, con mayor claridad para el equipo.",
  },
  {
    id: "vida-plena",
    name: "Vida Plena",
    category: "Sistema para clínicas",
    tags: [
      "Pacientes",
      "Agenda",
      "Autorizaciones",
      "Obras sociales",
      "Profesionales",
      "Reportes",
    ],
    tagline:
      "Sistema de gestión integral para un instituto de rehabilitación: pacientes, turnos, autorizaciones y obras sociales en un solo lugar.",
    description:
      "Plataforma que lleva el control total de la clínica: pacientes, agenda por profesional, sesiones, autorizaciones, obras sociales, horas de cada profesional, pagos y reportes de productividad.",
    fullDescription:
      "Para Vida Plena, Instituto de Rehabilitación Integral, desarrollamos un sistema que centraliza toda la operación de la clínica. La plataforma gestiona pacientes en tratamiento, la agenda de turnos organizada por profesional y especialidad, el registro de sesiones y asistencia, las autorizaciones y su vencimiento, las obras sociales y su liquidación, las horas trabajadas por cada profesional, los pagos pendientes y los reportes operativos. El objetivo es que administración y profesionales trabajen sobre la misma información, con alertas claras y sin planillas sueltas.",
    image: vidaPlenaLogo,
    gallery: [
      { src: vidaPlenaDashboard, alt: "Vida Plena · Dashboard operativo de la clínica" },
      { src: vidaPlenaAgenda, alt: "Vida Plena · Agenda de turnos por profesional" },
      { src: vidaPlenaReportes, alt: "Vida Plena · Reportes de sesiones y productividad" },
    ],
    features: [
      "Gestión de pacientes y tratamientos",
      "Agenda de turnos por profesional y especialidad",
      "Registro de sesiones, asistencia y ausentismo",
      "Control de autorizaciones y vencimientos",
      "Gestión y liquidación de obras sociales",
      "Control de horas y productividad de profesionales",
      "Pagos y cobros pendientes",
      "Alertas operativas para administración",
      "Reportes exportables a PDF y Excel",
      "Roles para administración y profesionales",
    ],
    challenge:
      "La clínica necesitaba controlar en un solo lugar turnos, sesiones, autorizaciones de obras sociales y la agenda de cada profesional, evitando vencimientos sin renovar y cobros perdidos.",
    solution:
      "Desarrollamos una plataforma integral que ordena la agenda, registra cada sesión, alerta sobre autorizaciones por vencer y consolida pagos, obras sociales y productividad de los profesionales en reportes claros.",
    roles: ["Administración", "Profesionales", "Recepción"],
  },
];

export const placeholderProjects = [];
