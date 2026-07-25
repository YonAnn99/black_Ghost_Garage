export type ServiceItem = {
  label: string;
};

export type ServiceGroup = {
  id: string;
  title: string;
  highlighted?: boolean;
  items: ServiceItem[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "mecanica",
    title: "Mecánica",
    items: [
      { label: "Servicios preventivos" },
      { label: "Reparacion del motor" },
      { label: "Frenos" },
      { label: "Suspención" },
      { label: "Dirección" },
      { label: "Alineación y Balanceo" },
      { label: "Tubería" },
    ],
  },
  {
    id: "electrico",
    title: "Eléctrico",
    highlighted: true,
    items: [
      { label: "Diagnóstico eléctrico Avanzado" },
      { label: "Cableados a Medida y Restauración" },
      { label: "Sensores y Actuadores" },
      { label: "Sistema de Carga y Arranque" },
      { label: "Iluminación y Accesorios" },
      { label: "Corta Corriente y Alarma" },
    ],
  },
  {
    id: "estetico",
    title: "Estético",
    items: [
      { label: "Hojalatería y pintura" },
      { label: "Pulido de faros" },
      { label: "Pintado de rines" },
      { label: "Skinning fibra de carbono" },
      { label: "Piezas full fibra de carbono" },
    ],
  },
];

export type WorkshopStats = {
  area: string;
  areaLabel: string;
  carBays: number;
  carBaysLabel: string;
  motorcycleBays: number;
  motorcycleBaysLabel: string;
  synopsis: string;
};

export const workshopStats: WorkshopStats = {
  area: "1,200",
  areaLabel: "Metros cuadrados de área de trabajo",
  carBays: 9,
  carBaysLabel: "Cajones automóviles",
  motorcycleBays: 5,
  motorcycleBaysLabel: "Cajones motos",
  synopsis:
    "Taller equipado con tecnología de última generación y herramientas especializadas para diagnosticar, reparar y modificar todo tipo de vehículos. Cada espacio está diseñado para garantizar precisión y eficiencia en cada proyecto.",
};

export type EquipmentItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string | null;
};

export const equipmentItems: EquipmentItem[] = [
  {
    id: "eq-001",
    name: "Laboratorio de inyectores",
    category: "Diagnóstico",
    description:
      "Equipo de alta precisión para limpieza, calibración y prueba de inyectores. Detecta obstrucciones y fugas con análisis de caudal en tiempo real.",
    image: "/images/equipment/laboratorio-inyectores.webp",
  },
  {
    id: "eq-002",
    name: "Spotter",
    category: "Alineación",
    description:
      "Sistema de alineación computerizado con cámaras 3D. Mide ángulos de convergencia, camber y caster con tolerancia de ±0.01°.",
    image: "/images/equipment/spotter.webp",
  },
  {
    id: "eq-003",
    name: "Rampa de dos postes",
    category: "Elevación",
    description:
      "Elevador hidráulico de 4 toneladas con sistema de seguridad redundante. Acceso completo al chasis y tren inferior del vehículo.",
    image: "/images/equipment/rampa-dos-postes.webp",
  },
  {
    id: "eq-004",
    name: "Escáner de alta gamma",
    category: "Diagnóstico",
    description:
      "Scanner profesional con acceso a todas las marcas y módulos. Diagnóstico de motor, transmisión, ABS, airbags y sistemas avanzados de asistencia.",
    image: "/images/equipment/scanner-placeholder.svg",
  },
  {
    id: "eq-005",
    name: "Cargador de batería inteligente",
    category: "Electrical",
    description:
      "Cargador de 12V/24V con perfil automático para baterías de plomo-ácido, AGM y litio. Revive baterías sulfatadas y realiza pruebas de carga.",
    image: "/images/equipment/cargador-bateria.webp",
  },
  {
    id: "eq-006",
    name: "Balanceadora",
    category: "Suspensión",
    description:
      "Balancín hidráulico para alineación y balanceo de suspensión. Verifica simetría del chasis y detecta deformaciones estructurales.",
    image: "/images/equipment/balancer-placeholder.svg",
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
    category: "Carro",
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
    category: "Carro",
    description: "Diagnóstico y reparación de sistema de carga. Reemplazo de regulador y cableado principal.",
    image: "/images/gallery-placeholder.svg",
    tags: ["Ducati", "Eléctrico", "Diagnóstico"],
  },
];

export const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#equipo", label: "Equipo" },
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
  whatsappUrl: "https://wa.me/525555555555",
  whatsappNumber: "+52 56 35555555",
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
