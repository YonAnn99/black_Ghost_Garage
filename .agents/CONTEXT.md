# CONTEXT.md — Black Ghost's Garage

> Memoria persistente de desarrollo. Actualizar tras cada cambio significativo.

---

## 1. Estado Actual del Proyecto

**Black Ghost's Garage** es una landing page single-page para un taller mecánico especializado en Ciudad de México. Estética **noir industrial brutalista**: fondo negro absoluto (`#0a0a0a`), acento rojo fantasma (`#e8302a`), texto hueso (`#f5f3ef`). El sitio transmite una atmósfera de **panel de diagnóstico militar** con scanlines CRT, grid sutil, esquinas HUD y animaciones de reveal al scroll con blur de entrada.

**Secciones activas:** Header (fijo, blur, hamburger magnético + stagger reveal), Hero (fullscreen con double-bezel emblem + CTAs magnéticos + HUD telemetry), Services (3 tarjetas de diagnóstico con double-bezel + crosshairs), Gallery (portafolio de trabajos con filtros + cards industrial), About (panel de stats brutalista + industrial markers), Contact (formulario double-bezel + mapa real Google Maps + horarios + **carrusel de reseñas Google Maps**), Footer (tipografía industrial + telemetry strip).

**Estado:** Todos los componentes refactorizados con diseño industrial-brutalist consistente. El sitio tiene cohesión visual completa.

---

## 2. Últimos Cambios Realizados

| Fecha | Acción | Detalle |
|---|---|---|
| 2026-06-27 | Análisis inicial del proyecto | Se mapeó toda la estructura visual: componentes, estilos, datos, utilidades |
| 2026-06-27 | Instalación de 16 skills de diseño | Repos: `emilkowalski/skill`, `pbakaus/impeccable`, `Leonxlnx/taste-skill` |
| 2026-06-27 | Creación de CONTEXT.md | Sistema de memoria persistente para continuidad entre sesiones |
| 2026-06-27 | Refactor visual Hero + Services | Aplicación de principios `industrial-brutalist-ui`, `high-end-visual-design`, `emil-design-eng` e `impeccable` |
| 2026-06-27 | Nueva sección Gallery/Portafolio | 6 proyectos de ejemplo con filtros por categoría, double-bezel cards, crosshair corners, SVG placeholders |
| 2026-06-27 | Refactor Header, About, Contact, Footer | Completada la refactor visual de todos los componentes restantes |
| 2026-06-27 | API de contacto | Next.js route POST `/api/contact` con validación, loading state, error handling |
| 2026-06-27 | Email SMTP integrado | Nodemailer + `.env.local` con credenciales SMTP, email HTML industrial |
| 2026-06-27 | Número WhatsApp actualizado | `+52 56 3536 3577` en `data.ts` (`whatsappUrl` y `whatsappNumber`) |
| 2026-06-28 | ghost-logo.png regenerado | Fondo transparente, 1024×1024 RGBA, círculo rojo + fantasma negro |
| 2026-06-28 | Favicon personalizado | `src/app/icon.png` — Logo ghost para pestaña del navegador (Next.js App Router metadata) |
| 2026-06-28 | Logo footer actualizado | `Footer.tsx` cambiado de `ghost-logo.svg` a `ghost-logo.png` |
| 2026-06-28 | **SEO completo implementado** | `robots.txt`, `sitemap.ts`, Open Graph, Twitter Cards, Structured Data JSON-LD (AutoRepair) |
| 2026-06-30 | **Carrusel de reseñas Google Maps** | Nuevo componente `ReviewsCarousel.tsx` con 8 reseñas verificadas (4-5 estrellas), carrusel infinito CSS, pausa al hover, estilo industrial double-bezel. Integrado debajo del formulario en `Contact.tsx`. |

**Cambios técnicos de la refactor del 2026-06-27:**

| Archivo | Cambios |
|---|---|
| `globals.css` | Nuevas curvas: `--ease-out-expo`, `--ease-out-quart`, `--ease-spring`. Keyframes: `system-boot`, `data-stream`, `hud-line`, `glitch-clip`. Utilidades: `.crosshair`, `.btn-press`, `.glow-red`, `.hover-lift`, `.text-data-wide`. Reveal con blur de entrada. Stagger delays via data-attribute. |
| `Hero.tsx` | Double-bezel emblem (borde + padding). Tipografía masiva `clamp(2.8rem,9vw,6rem)` con `leading-[0.88]`. CTAs con `btn-press` (scale 0.97). HUD corners + telemetry strip con separators `///`. ARIA labels. `min-h-[100dvh]`. |
| `Services.tsx` | Double-bezel inset border en hover. Crosshair corners. Unit IDs con brackets `[UNIT.0X]`. Icon scale en hover. Progress bar con `ease-[var(--ease-out-expo)]`. `<article>` semántico con `role="listitem"`. ARIA labels. |
| `Gallery.tsx` | **NUEVO** — Componente client con useState para filtros. Grid responsive 1/2/3 columnas. Cards con double-bezel inset, crosshair corners, SVG placeholders noir, badges de categoría, tags. Filtros por categoría con `role="tablist"`. Counter de operaciones. |
| `data.ts` | Tipo `GalleryItem` (id, title, category, description, image, tags). 6 proyectos de ejemplo. NavLinks actualizado con `#portafolio`. |
| `page.tsx` | Gallery inserto entre Services y About. Import añadido. |
| `Header.tsx` | **REFACTOR** — Logo double-bezel (borde + padding + glow). Hamburger magnético con morphing a X usando `--ease-spring`. Nav desktop con `btn-press`. Mobile menu con stagger reveal (delay escalonado 100+idx*50ms). Corner accents en botón hamburguesa. `aria-controls`, `aria-expanded`. Nav links con prefijo `[0X]`. CTA con dot animado. `backdrop-blur-xl`. |
| `About.tsx` | **REFACTOR** — Headline con acento rojo en segunda línea. Stats panel con double-bezel inset. Unit IDs `[STAT.0X]` en cada stat. Crosshair corners. Badges industriales. Protocol link con flecha en cuadrado. `aria-labelledby` en sección. |
| `Contact.tsx` | **REFACTOR** — Formulario dentro de card con double-bezel inset + crosshair corners. Header del form con dot pulsante y `[REQUIRED]`. Inputs con `bg-void` y focus rojo. Botón submit con icono anidado. **Mapa real Google Maps** (iframe embed de CDMX, filtro grayscale+sepia). Overlay label sobre mapa. Crosshair corners en mapa. `aria-labelledby` en sección. **POST a `/api/contact`** con loading state, error handling, `role="alert"`. |
| `Footer.tsx` | **REFACTOR** — Logo con double-bezel. Copyright con `[©]`. Links legales y sociales con `btn-press`. Bottom bar con telemetry strip `[SYS.SHUTDOWN]`. `role="contentinfo"`. Background `#080302`. |
| `api/contact/route.ts` | **NUEVO** — API POST con validación de campos requeridos. Nodemailer transporter SMTP. Email HTML con estilo industrial (fondo negro, borde rojo, tipografía monospace). ID de transmisión `BG-xxxx`. Logging con `[CONTACT]` prefix. |
| `data.ts` | **ACTUALIZADO** — WhatsApp: `+52 56 3536 3577` en `whatsappUrl` y `whatsappNumber`. |
| `.env.local` | **NUEVO** — Variables de entorno para SMTP: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_EMAIL`. |

**Skills instaladas (disponibles en `.agents/skills/`):**
- `emil-design-eng` — diseño de interfaces (Emil Kowalski)
- `review-animations` — revisión de animaciones
- `impeccable` — auditoría y pulido de frontend
- `brandkit` — sistema de identidad visual
- `industrial-brutalist-ui` — estilo brutalista industrial
- `gpt-taste` — gusto de diseño GPT
- `image-to-code` — conversión imagen → código
- `imagegen-frontend-mobile` / `imagegen-frontend-web` — generación de imágenes para UI
- `minimalist-ui` — diseño minimalista
- `full-output-enforcement` — output completo sin truncar
- `redesign-existing-projects` — redesign de proyectos existentes
- `high-end-visual-design` — diseño visual de alta gama
- `stitch-design-taste` — gusto de diseño stitch
- `design-taste-frontend` / `design-taste-frontend-v1` — gusto de diseño frontend

---

## 3. Arquitectura Visual y Stack Técnico

```
Framework:     Next.js 16.2.9 (App Router)
UI:            React 19.2.4
Estilos:       Tailwind CSS 4 (via @tailwindcss/postcss)
Tipografías:   Oswald (display), Inter (body), JetBrains Mono (data/mono)
Lenguaje:      TypeScript 5 (strict)
Email:         Nodemailer (SMTP)
Path alias:    @/* → ./src/*
```

**Estructura de archivos:**
```
black-ghosts-garage/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, metadata SEO completa
│   │   ├── page.tsx            # Página principal + Structured Data JSON-LD
│   │   ├── globals.css         # Tokens de diseño, utilidades, keyframes
│   │   ├── icon.png            # Favicon personalizado (ghost logo)
│   │   ├── sitemap.ts          # Sitemap dinámico (Next.js App Router)
│   │   └── api/contact/route.ts # API POST para formulario de contacto
│   ├── components/
│   │   ├── Header.tsx          # Navbar fija, blur, mobile menu (client)
│   │   ├── Hero.tsx            # Sección fullscreen, logo, CTAs
│   │   ├── Services.tsx        # Grid 3 tarjetas diagnóstico
│   │   ├── Gallery.tsx         # Portafolio de trabajos con filtros (client)
│   │   ├── About.tsx           # Stats + copy
│   │   ├── Contact.tsx         # Formulario + mapa + horarios + carrusel reseñas (client)
│   │   ├── ReviewsCarousel.tsx  # Carrusel infinito reseñas Google Maps (client)
│   │   ├── Footer.tsx          # Pie de página
│   │   └── RevealProvider.tsx  # Wrapper scroll-reveal (client)
│   └── lib/
│       ├── data.ts             # Datos estáticos (servicios, nav, contacto, galería)
│       └── useScrollReveal.ts  # Hook IntersectionObserver
├── .env.local                  # Credenciales SMTP (no commitear)
├── public/
│   ├── robots.txt              # Reglas para crawlers + sitemap URL
│   └── images/
│   ├── ghost-logo.png
│   └── ghost-logo.svg
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── next.config.ts
```

**Tokens de color (globals.css `@theme inline`):**
- `void` → `#0a0a0a` (fondo)
- `panel` → `#131313` (cards)
- `ghost-red` → `#e8302a` (acento)
- `bone` → `#f5f3ef` (texto)

**Animaciones:** scan, pulse-dot, flicker, rise-in (reveal con blur), system-boot, data-stream, hud-line, glitch-clip, scanlines CRT, grid-noir.

**Curvas de easing (globals.css):**
- `--ease-engine` → `cubic-bezier(0.16, 1, 0.3, 1)` (general)
- `--ease-out-expo` → `cubic-bezier(0.19, 1, 0.22, 1)` (entradas premium)
- `--ease-out-quart` → `cubic-bezier(0.25, 1, 0.5, 1)` (transiciones suaves)
- `--ease-spring` → `cubic-bezier(0.32, 0.72, 0, 1)` (drawer, modales)

**Utilidades disponibles:**
- `.text-display` — Oswald uppercase, tracking -0.02em, leading 0.92
- `.text-data` / `.text-data-wide` — JetBrains Mono, tracking 0.06/0.1em
- `.bg-scanlines` / `.bg-grid-noir` — texturas CRT
- `.crosshair` — marcador de cruz industrial
- `.btn-press` — scale(0.97) en :active
- `.glow-red` / `.glow-red-intense` — sombra roja
- `.hover-lift` — translateY(-2px) en hover (gated touch)
- `.reveal` — opacity:0 + translateY(20px) + blur(4px), is-visible activa rise-in

---

## 4. Siguientes Pasos (Pendientes)

### ✅ Completados

- [x] ~~Refactorizar `Header.tsx` con double-bezel, hamburger magnético y stagger reveal~~
- [x] ~~Refactorizar `About.tsx` con industrial markers y panel de stats brutalista~~
- [x] ~~Refactorizar `Contact.tsx` con doble bezel en formulario y mapa real~~
- [x] ~~Refactorizar `Footer.tsx` con tipografía industrial~~
- [x] ~~Conectar formulario de contacto a servicio de backend (API route o servicio externo)~~
- [x] ~~Integrar envío de emails por SMTP (Nodemailer)~~
- [x] ~~Integrar mapa real de Google Maps / Leaflet en lugar del placeholder SVG~~
- [x] ~~Agregar sección de galería/portfolio de trabajos realizados~~
- [x] ~~SEO: robots.txt, sitemap, Open Graph, Twitter Cards, Structured Data~~

### 🔴 Prioridad Alta (Producción)

- [ ] Performance de imágenes — Usar `<Image>` de Next.js en Gallery, lazy loading, formatos WebP/AVIF
- [ ] Seguridad — Rate limiting en `/api/contact`, sanitizar inputs, headers de seguridad (CSP, X-Frame-Options)

### 🟡 Prioridad Media (UX)

- [ ] Accesibilidad — Auditoría WCAG AA, skip-to-content link, focus visible en interactive elements
- [ ] Formulario mejorado — Mensajes de error descriptivos, success state con animación, validación en tiempo real
- [ ] Analytics — Google Analytics o Plausible, eventos de conversión (WhatsApp clicks, envío formulario)

### 🟢 Prioridad Baja (Pulido)

- [ ] Reemplazar SVG placeholders de Gallery con fotos reales del taller
- [ ] Optimizar imágenes (actualmente solo 2 logos + SVGs en `/public/images/`)
- [ ] Contenido real — Textos finales en About/Services, testimonios de clientes
- [ ] Configurar `.env.local` con credenciales SMTP reales para producción
- [ ] 404 page personalizada con estilo industrial
