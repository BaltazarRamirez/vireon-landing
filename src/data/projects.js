import llorensLogo from "../assets/client-llorens.webp";
import camposDeTrigoLogo from "../assets/campos-de-trigo.webp";
import molinosLogo from "../assets/client-molinos.webp";
import totemLogo from "../assets/client-totem.webp";
import hotelusLogo from "../assets/hotelus-logo.png";

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
    gallery: [],
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
    products:
      "Aceites, líquidos refrigerantes, aceites para motores de dos tiempos y otros productos comercializados por la empresa.",
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
      "Campos de Trigo es un sistema de gestión desarrollado para una panadería que procesa aproximadamente 120 pedidos diarios. La plataforma centraliza la administración de pedidos, productos, precios, clientes, repartidores y usuarios. El objetivo del proyecto es reemplazar procesos manuales, reducir errores y mejorar la organización diaria, permitiendo que todo el equipo trabaje desde una misma plataforma.",
    image: camposDeTrigoLogo,
    gallery: [],
    features: [
      "Registro y seguimiento de pedidos",
      "Actualización de estados de pedidos",
      "Preparación de la producción diaria",
      "Asignación de entregas a repartidores",
      "Impresión de comprobantes",
      "Administración de productos y precios",
      "Gestión de clientes",
      "Control de usuarios y roles de acceso",
      "Roles para administradores, empleados, producción y repartidores",
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
      "Molinos Combustibles es un sistema de gestión desarrollado para una estación de servicio, pensado para centralizar y simplificar la operación diaria del negocio. La plataforma permite administrar turnos y cierres de caja, registrar ventas de combustibles, aceites y otros productos, controlar el stock de tanques y surtidores, actualizar precios y gestionar cuentas corrientes de clientes y productores. También cuenta con distintos roles de acceso para administradores y playeros, además de reportes que facilitan el seguimiento de ventas, movimientos de combustible y estado general de la estación.",
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
    products:
      "Combustibles, aceites y otros productos comercializados en la estación de servicio.",
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
      "Hotel Tótem Boutique es un sistema de gestión desarrollado para un hotel boutique, pensado para centralizar y simplificar la administración diaria del establecimiento. La plataforma permite gestionar habitaciones, reservas, huéspedes, disponibilidad, ingresos, salidas y estados de limpieza. También facilita el seguimiento de la ocupación y la organización de las tareas del personal. El objetivo del proyecto es reemplazar registros manuales, reducir errores y mejorar el control de la operación del hotel desde una única plataforma.",
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
];

export const placeholderProjects = [];
