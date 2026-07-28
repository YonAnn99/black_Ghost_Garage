# CONTEXT.md — Black Ghost's Garage

> Memoria persistente de desarrollo. Actualizar tras cada cambio significativo.

---

## 1. Estado Actual del Proyecto

**Black Ghost's Garage** es una landing page single-page para un taller mecánico especializado en Ciudad de México. Estética **noir industrial brutalista**: fondo negro absoluto (`#0a0a0a`), acento rojo fantasma (`#e8302a`), texto hueso (`#f5f3ef`). El sitio transmite una atmósfera de **panel de diagnóstico militar** con scanlines CRT, grid sutil, esquinas HUD y animaciones de reveal al scroll con blur de entrada.

**Secciones activas:** Header (fijo, blur, hamburger magnético + stagger reveal), Hero (fullscreen con double-bezel emblem + CTAs magnéticos + HUD telemetry), Services (3 tarjetas de diagnóstico con double-bezel + crosshairs), **Equipment** (bento grid brutalista con card flip mobile + lightbox desktop), Gallery (portafolio de trabajos con filtros + cards industrial), About (panel de stats brutalista + industrial markers), Contact (formulario double-bezel + mapa real Google Maps + horarios + **carrusel de reseñas Google Maps**), Footer (tipografía industrial + telemetry strip).

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
| 2026-06-30 | **Mapa restaurado** | Mapa SVG placeholder funcional (iframe de Google Maps bloqueado). Click abre Google Maps directamente. |
| 2026-06-30 | **Formulario mejorado** | Validación en tiempo real (blur + change), mensajes de error descriptivos por campo, animación success con checkmark, loading spinner, banner de error del servidor, reset completo al enviar otra transmisión. |
| 2026-06-30 | **Analytics Plausible** | Integrado Plausible Analytics (privacy-friendly). Eventos custom: `Contact Form Submitted` (con vehículo), `WhatsApp Click` (con source). Utility reutilizable en `lib/analytics.ts`. |
| 2026-07-17 | **Migración Linux→macOS** | Proyecto trasladado a `/Users/cesaranaya/Documents/BGG/black_Ghost_Garage`. Eliminado `lightningcss-linux-x64-gnu` de devDeps. Regenerado `package-lock.json` para macOS. |
| 2026-07-17 | **CSP dev mode** | Agregado `unsafe-eval` a CSP en `next.config.ts` para habilitar HMR en modo desarrollo. |
| 2026-07-17 | **Servicios renombrados** | Grupos cambiados: `mecanica` (antes `motocicletas`), `electrico` (antes `carros`). Categoría de galería cambiada de "Mecánica" a "Carro". |
| 2026-07-17 | **Sección Equipment (NUEVA)** | Nuevo componente `Equipment.tsx` — bento grid 4 columnas con 6 items de equipo. Tarjetas con doble-bezel, crosshair corners. Desktop: lightbox preview que sigue al cursor. Mobile: card flip 3D con tap para voltear + IntersectionObserver para auto-reset al scroll. |
| 2026-07-17 | **Imágenes equipo WebP** | Convertidas 8 imágenes JPG a WebP con sharp. Almacenadas en `public/images/equipment/`. |
| 2026-07-17 | **Fix layout Equipment** | Corregido colapso de height en mobile (`.card-flip-container` ahora tiene `min-height: 280px`). Agregado `overflow: hidden` a `.card-flip-inner`, `.card-flip-front`, `.card-flip-back` para prevenir desbordamiento de texto. Agregado `line-clamp-4` a descripciones. |
| 2026-07-25 | **Fix aviso de privacidad — pestaña duplicada** | Link de "Aviso de Privacidad" en Contact.tsx y Footer.tsx ahora usa `window.open()` en onClick. Nuevo componente `BackToSiteLink.tsx` ejecuta `window.close()` en "Volver al sitio" del aviso de privacidad. La pestaña del aviso se cierra automáticamente al volver, evitando pestañas duplicadas. Footer.tsx migrado a `"use client"` para soportar `window.open()`. |
| 2026-07-26 | **Fix AudioPlayer — audio no carga en móvil** | `AudioPlayer.tsx` reescrito: `preload="metadata"` → `preload="auto"` para descarga anticipada. Eliminado listener de `document` que iOS Safari no reconoce como gesto directo. Agregado `onTouchEnd` al botón para reproducir audio directamente desde el gesto del usuario. Agregado estado `isLoading` con spinner SVG para feedback visual. |
| 2026-07-26 | **Velocidad carrusel reseñas** | `globals.css` — animación `scroll-reviews` reducida de `40s` a `20s` para que el carrusel se desplace 2x más rápido. |
| 2026-07-26 | **Iconos redes sociales — Contact + Footer** | `data.ts` — campo `icon` agregado a `socialLinks` (`"instagram"`, `"facebook"`). `Contact.tsx` — nuevo bloque "Síguenos" debajo del horario con iconos SVG cuadrados (40x40, hover glow rojo). `Footer.tsx` — iconos SVG inline junto a los enlaces existentes. |
| 2026-07-26 | **ReviewsCarousel — touch drag en móvil** | `ReviewsCarousel.tsx` reescrito con soporte táctil: `onTouchStart/Move/End` para drag manual en móvil. Snap a tarjeta más cercana al soltar. Detección de dispositivo táctil con `matchMedia("(hover: none)")`. Desktop mantiene CSS auto-scroll. Hint "Desliza para ver más" en móvil. |
| 2026-07-26 | **AudioPlayer — rediseño visual** | `AudioPlayer.tsx` — botón aumentado a `size-12` (48px). Borde `ghost-red/40` → hover `ghost-red/70`. Anillo pulsante CSS (`pulse-ring` keyframe) cuando muted para invitar a tocar. Icono `size-5`. Fondo `bg-void/90`. |
| 2026-07-26 | **globals.css — reviews pausado + pulse-ring** | Agregado `.reviews-scroll-paused` con `animation-play-state: paused`. Nuevo keyframe `pulse-ring` (scale 1→1.6, opacity 0.6→0) para anillo del botón de audio. |
| 2026-07-26 | **Seguridad /admin — blindaje completo** | `robots.txt` — `Disallow: /admin` agregado. `next.config.ts` — headers `X-Robots-Tag: noindex, nofollow, nosnippet, noarchive` + `Cache-Control: no-store` para `/admin/*`. `Header.tsx` — enlace `/admin` eliminado del CTA desktop y menú mobile. `middleware.ts` — headers de seguridad inyectados server-side para todas las rutas `/admin/*`. Auth ya usa Supabase Auth (bcrypt + rate limiting incluido). |
| 2026-07-26 | **Conversión WebP automática en upload** | `upload/route.ts` — sharp convierte JPG/PNG a WebP (1200px, q=82, effort=6) antes de subir a Supabase Storage. Retorna metadatos de ahorro. `package.json` — sharp agregado como dependencia explícita. |
| 2026-07-26 | **Gallery — CTA "Próximamente"** | `data.ts` — eliminated 6 hardcoded `galleryItems`. `Gallery.tsx` — cuando la API no tiene datos, muestra CTA "Próximamente" con estética industrial (double-bezel, grid background, botón "Agendar cita"). Sección `#portafolio` sigue visible para nav. |
| 2026-07-26 | **ReviewsCarousel — touch fluido (v2)** | Reescrito con ref-based offset (sin re-renders). Nuevo clase `.reviews-touch-active` con `animation: none !important` para deshabilitar CSS animation en mobile. Velocity tracking simplificado. Rubber band effect. Snap con transición CSS. |
| 2026-07-26 | **globals.css — reviews-touch-active** | Nueva clase `.reviews-touch-active` que deshabilita animación CSS y aplica `touch-action: pan-y` para móvil. |
| 2026-07-26 | **Botón flotante WhatsApp (NUEVO)** | Nuevo componente `WhatsAppFloating.tsx` — botón FAB verde fijo en esquina inferior izquierda con efecto parallax al scroll (±25px). Al hacer clic abre mini-modal con formulario simplificado (Nombre, Teléfono, Vehículo marca/modelo/motor, Año, Descripción del servicio). Envía datos por WhatsApp al `wa.me/525635363577`. Desaparece con fade-out cuando la sección `#contacto` entra en viewport (IntersectionObserver). Se cierra con Escape o clic fuera. `page.tsx` actualizado con el componente fuera de `<RevealProvider>`. |
| 2026-07-28 | **JSON-LD local corregido** | El marcado `AutoRepair` se centralizó en `layout.tsx` con teléfono, dirección y horarios confirmados para Oxtotipac, Estado de México. Se eliminaron el JSON-LD duplicado de `page.tsx` y coordenadas no verificadas; se añadieron perfiles sociales y catálogo de servicios. |
| 2026-07-28 | **Consentimiento en WhatsApp flotante** | `WhatsAppFloating.tsx` ahora exige aceptar el Aviso de Privacidad antes de abrir WhatsApp. Incluye checkbox, enlace que abre el aviso en una pestaña nueva, mensaje de validación y reinicio del consentimiento tras un envío exitoso. |
| 2026-07-28 | **Fix SEO crítico — 4 fixes de indexación** | (1) `layout.tsx` — export `viewport` agregado (`device-width`, `initialScale: 1`, `themeColor`). (2) `data.ts` — número WhatsApp corregido a `+52 56 3536 3577` (Structured Data ahora muestra el correcto). (3) `sitemap.ts` — `/aviso-de-privacidad` agregado al sitemap. (4) `next.config.ts` — CSP `script-src` ahora permite `https://plausible.io` para que Analytics funcione. |

**Cambios técnicos de la refactor del 2026-06-27:**

| Archivo | Cambios |
|---|---|
| `globals.css` | Nuevas curvas: `--ease-out-expo`, `--ease-out-quart`, `--ease-spring`. Keyframes: `system-boot`, `data-stream`, `hud-line`, `glitch-clip`, `eye-blink`, `pulse-ring`. Utilidades: `.crosshair`, `.btn-press`, `.glow-red`, `.hover-lift`, `.text-data-wide`, `.reviews-scroll-paused`, `.reviews-touch-active`. Card flip: `.card-flip-container`, `.card-flip-inner`, `.card-flip-front`, `.card-flip-back`. Reveal con blur de entrada. Stagger delays via data-attribute. |
| `Hero.tsx` | Double-bezel emblem (borde + padding). Tipografía masiva `clamp(2.8rem,9vw,6rem)` con `leading-[0.88]`. CTAs con `btn-press` (scale 0.97). HUD corners + telemetry strip con separators `///`. ARIA labels. `min-h-[100dvh]`. |
| `Services.tsx` | Double-bezel inset border en hover. Crosshair corners. Unit IDs con brackets `[UNIT.0X]`. Icon scale en hover. Progress bar con `ease-[var(--ease-out-expo)]`. `<article>` semántico con `role="listitem"`. ARIA labels. |
| `Gallery.tsx` | Fetch de `/api/portfolio`. Sin datos → CTA "Próximamente" con double-bezel. Con datos → Grid responsive 1/2/3 columnas. Cards con double-bezel inset, crosshair corners, badges de categoría, tags. Filtros por categoría con `role="tablist"`. Counter de operaciones. |
| `Equipment.tsx` | **NUEVO** — Componente client con bento grid 4 columnas. 6 items de equipo con iconos SVG. Desktop: lightbox preview que sigue al cursor con crossfade. Mobile: card flip 3D con tap, IntersectionObserver para auto-reset. Scroll-reveal con delays escalonados. |
| `data.ts` | `workshopStats`, `equipmentItems`, `navLinks`, `contactInfo`, `socialLinks` (con campo `icon`). Gallery items eliminados (datos reales vienen de Supabase). |
| `page.tsx` | Gallery inserto entre Services y About. Equipment inserto entre Services y Gallery. Import añadido. Structured Data JSON-LD (AutoRepair). |
| `Header.tsx` | **REFACTOR** — Logo double-bezel (borde + padding + glow). Hamburger magnético con morphing a X usando `--ease-spring`. Nav desktop con `btn-press`. Mobile menu con stagger reveal (delay escalonado 100+idx*50ms). Corner accents en botón hamburguesa. `aria-controls`, `aria-expanded`. Nav links con prefijo `[0X]`. CTA con dot animado. `backdrop-blur-xl`. |
| `About.tsx` | **REFACTOR** — Headline con acento rojo en segunda línea. Stats panel con double-bezel inset. Unit IDs `[STAT.0X]` en cada stat. Crosshair corners. Badges industriales. Protocol link con flecha en cuadrado. `aria-labelledby` en sección. |
| `Contact.tsx` | **REFACTOR** — Formulario con validación en tiempo real, errores descriptivos, animación success. Mapa SVG placeholder. Carrusel de reseñas integrado. Analytics events (form submit, WhatsApp click). |
| `Footer.tsx` | **REFACTOR** — Logo con double-bezel. Copyright con `[©]`. Links legales y sociales con `btn-press`. Bottom bar con telemetry strip `[SYS.SHUTDOWN]`. `role="contentinfo"`. Background `#080302`. |
| `api/contact/route.ts` | **NUEVO** — API POST con validación de campos requeridos. Nodemailer transporter SMTP. Email HTML con estilo industrial (fondo negro, borde rojo, tipografía monospace). ID de transmisión `BG-xxxx`. Logging con `[CONTACT]` prefix. |
| `data.ts` | **ACTUALIZADO** — WhatsApp: `+52 56 3536 3577` en `whatsappUrl` y `whatsappNumber`. Agregados `workshopStats` (area, carBays, motorcycleBays, employees). Agregados 6 `equipmentItems` con `image: string | null` para equipo del taller. |
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
│   │   ├── Equipment.tsx       # Bento grid equipo + card flip mobile + lightbox desktop (client)
│   │   ├── Gallery.tsx         # Portafolio de trabajos con filtros (client)
│   │   ├── About.tsx           # Stats + copy
│   │   ├── Contact.tsx         # Formulario validado + mapa SVG + carrusel reseñas (client)
│   │   ├── ReviewsCarousel.tsx  # Carrusel infinito reseñas + touch drag en móvil (client)
│   │   ├── AudioPlayer.tsx     # Botón de audio con anillo pulsante (client)
│   │   ├── WhatsAppFloating.tsx # Botón flotante WhatsApp + mini-formulario (client)
│   │   ├── BackToSiteLink.tsx   # Link "Volver al sitio" con window.close() (client)
│   │   ├── Footer.tsx          # Pie de página (client)
│   │   └── RevealProvider.tsx  # Wrapper scroll-reveal (client)
│   └── lib/
│       ├── data.ts             # Datos estáticos (servicios, nav, contacto, galería)
│       ├── analytics.ts        # Utility Plausible events (form submit, WhatsApp click)
│       └── useScrollReveal.ts  # Hook IntersectionObserver
├── .env.local                  # Credenciales SMTP (no commitear)
├── public/
│   ├── robots.txt              # Reglas para crawlers + sitemap URL
│   └── images/
│       ├── ghost-logo.png
│       ├── ghost-logo.svg
│       └── equipment/          # Imágenes WebP del equipo del taller
│           ├── scan.webp
│           ├── alignment.webp
│           ├── pressure-test.webp
│           ├── battery.webp
│           ├── oil-change.webp
│           └── suspension.webp
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

- [ ] Performance de imágenes — Usar `<Image>` de Next.js en Gallery y Equipment, lazy loading, formatos WebP/AVIF
- [x] ~~Seguridad — Rate limiting en `/api/contact`, sanitizar inputs, headers de seguridad (CSP, X-Frame-Options)~~
- [x] ~~Seguridad /admin — Blindaje completo: robots.txt Disallow, X-Robots-Tag noindex, enlace eliminado del Header, middleware con headers de seguridad~~

### 🟡 Prioridad Media (UX)

- [x] ~~Formulario mejorado — Mensajes de error descriptivos, success state con animación, validación en tiempo real~~
- [x] ~~Analytics — Plausible, eventos de conversión (WhatsApp clicks, envío formulario)~~
- [ ] Accesibilidad — Auditoría WCAG AA, skip-to-content link, focus visible en interactive elements
- [x] ~~Equipment Section — Bento grid con card flip mobile + lightbox desktop~~

### 🟢 Prioridad Baja (Pulido)

- [ ] Reemplazar SVG placeholders de Gallery con fotos reales del taller
- [ ] Reemplazar placeholder images de Equipment con fotos reales del taller
- [ ] Contenido real — Textos finales en About/Services, testimonios de clientes
- [ ] Configurar `.env.local` con credenciales SMTP reales para producción
- [ ] 404 page personalizada con estilo industrial
