import llorensLogo from "../assets/client-llorens.webp";
import camposDeTrigoLogo from "../assets/campos-de-trigo.webp";
import molinosLogo from "../assets/client-molinos.webp";
import totemLogo from "../assets/client-totem.webp";
import vidaPlenaLogo from "../assets/client-vidaplena.png";

export const clients = [
  {
    id: "llorens-group",
    projectId: "llorens-group",
    name: "Llorens Group",
    logo: llorensLogo,
  },
  {
    id: "campos-de-trigo",
    projectId: "campos-de-trigo",
    name: "Campos de Trigo",
    logo: camposDeTrigoLogo,
    logoClass:
      "h-[5.75rem] max-w-[13.5rem] sm:h-[7.25rem] sm:max-w-[16rem] lg:h-32 lg:max-w-[17rem]",
  },
  {
    id: "molinos-combustibles",
    projectId: "molinos-combustibles",
    name: "Molinos Combustibles",
    logo: molinosLogo,
  },
  {
    id: "hotel-totem",
    projectId: "hotel-totem-boutique",
    name: "Hotel Tótem Boutique",
    logo: totemLogo,
    logoClass:
      "h-[5.5rem] max-w-[13rem] sm:h-[6.75rem] sm:max-w-[15rem] lg:h-[7.5rem] lg:max-w-[16rem]",
  },
  {
    id: "vida-plena",
    projectId: "vida-plena",
    name: "Vida Plena",
    logo: vidaPlenaLogo,
    logoClass:
      "h-[5.5rem] max-w-[13rem] sm:h-[6.75rem] sm:max-w-[15rem] lg:h-[7.5rem] lg:max-w-[16rem]",
  },
];
