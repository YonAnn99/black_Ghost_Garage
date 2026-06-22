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

export const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Acerca de la empresa" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#contacto", label: "Contacto" },
];

export const contactInfo = {
  address: "Av. Principal Industrial #1024, Sector Norte.",
  cityLine: "Ciudad de México, CP 00000.",
  accessNote: "Acceso solo con cita previa.",
  mapsUrl: "https://maps.google.com",
  whatsappUrl: "https://wa.me/525500000000",
  whatsappNumber: "+52 55 0000 0000",
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
