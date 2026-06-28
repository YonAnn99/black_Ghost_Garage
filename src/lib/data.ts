export type ServiceItem = {
  label: string;
};

export type ServiceGroup = {
  id: string;
  title: string;
  highlighted?: boolean;
  categories: {
    heading: string;
    items: ServiceItem[];
  }[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "motocicletas",
    title: "Motocicletas",
    categories: [
      {
        heading: "Servicios preventivos",
        items: [
          { label: "Cambio de aceite y filtros" },
          { label: "Revisión de frenos" },
        ],
      },
      {
        heading: "Mecánica general",
        items: [
          { label: "Reparación de motor" },
          { label: "Sistema eléctrico" },
          { label: "Suspensión" },
        ],
      },
    ],
  },
  {
    id: "carros",
    title: "Carros",
    highlighted: true,
    categories: [
      {
        heading: "Afinaciones (servicio)",
        items: [
          { label: "Cambio de bujías y filtros" },
          { label: "Limpieza de inyectores" },
          { label: "Alineación y balanceo" },
        ],
      },
      {
        heading: "Sistemas",
        items: [
          { label: "Suspensión" },
          { label: "Frenos" },
          { label: "Aceite" },
          { label: "Tubería" },
        ],
      },
    ],
  },
  {
    id: "estetico",
    title: "Estético",
    categories: [
      {
        heading: "Restauración y modificación",
        items: [
          { label: "Hojalatería y pintura" },
          { label: "Pulido de faros" },
          { label: "Pintado de rines" },
          { label: "Skinning fibra de carbono" },
          { label: "Piezas full fibra de carbono" },
        ],
      },
    ],
  },
];

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
};

export const galleryItems: GalleryItem[] = [
  {
    id: "g-001",
    title: "Mustang GT — Full Carbono",
    category: "Estético",
    description: "Skinning completo de capó, cofre y espejos en fibra de carbono twill 2x2. Acabado UV de alta resistencia.",
    image: "/images/gallery-placeholder.svg",
    tags: ["Fibra de carbono", "Pintura", "Ford"],
  },
  {
    id: "g-002",
    title: "BMW M3 — Suspensión Coilover",
    category: "Mecánica",
    description: "Instalación de kit de suspensión coilover ajustable. Alineación completa y balanceo de peso.",
    image: "/images/gallery-placeholder.svg",
    tags: ["Suspensión", "BMW", "Rendimiento"],
  },
  {
    id: "g-003",
    title: "MT-07 — Afinación Integral",
    category: "Motocicletas",
    description: "Cambio de aceite, filtros, revisión de frenos delanteros y traseros. Sistema eléctrico verificado.",
    image: "/images/gallery-placeholder.svg",
    tags: ["Yamaha", "Mantenimiento", "Frenos"],
  },
  {
    id: "g-004",
    title: "Civic Type R — Pintura Cerámica",
    category: "Estético",
    description: "Corrección de pintura en 3 etapas. Pulido de faros. Aplicación de recubrimiento cerámico hidrofóbico.",
    image: "/images/gallery-placeholder.svg",
    tags: ["Honda", "Pintura", "Protección"],
  },
  {
    id: "g-005",
    title: "Jeep Wrangler — Rines Forjados",
    category: "Estético",
    description: "Pintado de rines en negro mate de alta temperatura. Montaje de llantas todo terreno 33\".",
    image: "/images/gallery-placeholder.svg",
    tags: ["Jeep", "Rines", "Off-road"],
  },
  {
    id: "g-006",
    title: "Ducati Monster — Sistema Eléctrico",
    category: "Mecánica",
    description: "Diagnóstico y reparación de sistema de carga. Reemplazo de regulador y cableado principal.",
    image: "/images/gallery-placeholder.svg",
    tags: ["Ducati", "Eléctrico", "Diagnóstico"],
  },
];

export const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#nosotros", label: "Acerca de la empresa" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#contacto", label: "Contacto" },
];

export const contactInfo = {
  address: "Nezahualcóyotl Manzana 021",
  cityLine: "55925 Oxtotipac, Méx.",
  accessNote: "Acceso solo con cita previa.",
  mapsUrl: "https://maps.google.com/maps?q=Black+Ghost's+Garage+Nezahualcóyotl+Oxtotipac+México",
  whatsappUrl: "https://wa.me/525635363577",
  whatsappNumber: "+52 56 3536 3577",
  email: "contacto@blackghostsgarage.mx",
  hours: [
    { day: "Lunes — Viernes", time: "09:00 — 19:00" },
    { day: "Sábado", time: "10:00 — 15:00" },
    { day: "Domingo", time: "Cerrado" },
  ],
};

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
];
