# Black Ghost's Garage — Sitio web

Sitio corporativo para **Black Ghost's Garage**, taller especializado en
mecánica, mantenimiento y modificación estética de autos y motocicletas
en Teotihuacan.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** (tokens de diseño vía `@theme inline`)
- Tipografías auto-hospedadas con `@fontsource` (Oswald, Inter, JetBrains Mono) —
  no dependen de Google Fonts en tiempo de build, por lo que el proyecto
  compila sin acceso a `fonts.googleapis.com`.
- 100% componentes propios, sin librerías de UI externas.

## Estructura

```
src/
  app/
    layout.tsx       Fuentes, metadata SEO, shell HTML
    page.tsx          Composición de secciones
    globals.css       Tokens de color/tipografía y utilidades de marca
  components/
    Header.tsx        Nav fijo, menú móvil, CTA "Agendar cita"
    Hero.tsx           Sección principal (copy del brief original)
    Services.tsx       Panel de servicios (Motocicletas / Carros / Estético)
    About.tsx          Acerca de la empresa + panel de stats
    Contact.tsx        Formulario de contacto + ubicación + horario
    Footer.tsx          Pie de página, legales y redes
    RevealProvider.tsx Activa animaciones de scroll-reveal
  lib/
    data.ts            Fuente única de verdad: servicios, contacto, nav
    useScrollReveal.ts Hook de IntersectionObserver para animaciones
public/
  images/ghost-logo.svg  Logo vectorial del emblema (fantasma)
```

## Cómo editar el contenido

Casi todo el contenido editable vive en **`src/lib/data.ts`**:
- `serviceGroups`: las categorías y servicios mostrados en "Nuestros servicios".
- `contactInfo`: dirección, WhatsApp, correo, horario.
- `navLinks`: enlaces del menú principal.
- `socialLinks`: Instagram / Facebook.

No es necesario tocar los componentes para actualizar textos de servicios,
dirección, teléfono o redes sociales.

## Desarrollo local

```bash
npm install
npm run dev       # http://localhost:3000
```

## Producción

```bash
npm run build
npm run start
```

## Pendientes recomendados antes de salir a producción

1. **Formulario de contacto**: actualmente el formulario solo simula el
   envío en el navegador. Hay que conectarlo a un backend real (API route
   de Next.js + servicio de correo, o un proveedor como Formspree/Resend).
2. **Mapa**: el bloque de "Coordenadas" usa un mapa ilustrado en SVG con
   enlace a Google Maps. Si quieren el mapa embebido real, se puede
   sustituir por un iframe de Google Maps con la dirección exacta.
3. **WhatsApp y dirección**: el número de WhatsApp y la dirección son
   placeholders tomados del diseño original — deben confirmarse con el
   cliente antes de publicar.
4. **Dominio y despliegue**: listo para desplegar en Vercel, Netlify o
   cualquier proveedor compatible con Next.js.
