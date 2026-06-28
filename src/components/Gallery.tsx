"use client";

import { useEffect, useRef, useState } from "react";
import { galleryItems } from "@/lib/data";

const categories = ["Todos", ...new Set(galleryItems.map((g) => g.category))];

export default function Gallery() {
  const [active, setActive] = useState("Todos");

  const filtered =
    active === "Todos"
      ? galleryItems
      : galleryItems.filter((g) => g.category === active);

  return (
    <section
      id="portafolio"
      className="relative bg-panel py-24 md:py-32"
      aria-labelledby="gallery-heading"
    >
      <div className="absolute inset-0 bg-grid-noir opacity-[0.12]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="reveal mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-data-wide text-[10px] uppercase text-ghost-red tracking-[0.15em]">
              ◆ Portafolio de operaciones
            </span>
            <h2
              id="gallery-heading"
              className="text-display mt-4 text-[clamp(2.2rem,5.5vw,3.5rem)] leading-[0.9] text-bone"
            >
              Trabajos realizados
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-bone-dim">
              Cada caso documentado. Cada resultado verificable.
            </p>
          </div>

          {/* Filter tabs */}
          <div
            className="reveal flex flex-wrap gap-2"
            data-reveal-delay="100"
            role="tablist"
            aria-label="Filtrar por categoría"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active === cat}
                onClick={() => setActive(cat)}
                className={`btn-press text-data-wide px-4 py-2 text-[10px] uppercase tracking-[0.12em] border transition-all duration-200 ${
                  active === cat
                    ? "border-ghost-red bg-ghost-red text-void"
                    : "border-line bg-transparent text-bone-faint hover:border-bone-faint hover:text-bone-dim"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid — key fuerza re-montado al cambiar filtro */}
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="tabpanel"
          key={active}
        >
          {filtered.map((item, idx) => (
            <GalleryCard key={item.id} item={item} index={idx} />
          ))}
        </div>

        {/* Counter */}
        <div
          className="reveal mt-10 flex items-center justify-between border-t border-line-soft pt-6 text-[10px] uppercase text-bone-faint"
          data-reveal-delay="200"
        >
          <span className="text-data-wide">
            Mostrando {filtered.length} de {galleryItems.length} operaciones
          </span>
          <span className="text-data-wide hidden sm:inline">///</span>
          <span className="text-data-wide">
            Categoría: {active}
          </span>
        </div>
      </div>
    </section>
  );
}

function GalleryCard({
  item,
  index,
}: {
  item: (typeof galleryItems)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`group relative border border-line bg-void transition-all duration-300 hover:border-bone-faint ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDuration: `${500 + index * 60}ms`, transitionTimingFunction: "var(--ease-out-expo)" }}
      aria-label={`Proyecto: ${item.title}`}
    >
      {/* Double-bezel inset */}
      <div
        className="pointer-events-none absolute inset-[3px] border border-line-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Image placeholder */}
      <div className="relative aspect-[16/10] overflow-hidden bg-panel">
        {/* SVG placeholder with noir grid */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 250"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <pattern id={`grid-${item.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 0H20V20" fill="none" stroke="#e8302a" strokeOpacity="0.12" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="400" height="250" fill="#131313" />
          <rect width="400" height="250" fill={`url(#grid-${item.id})`} />
          <text
            x="200"
            y="120"
            textAnchor="middle"
            fill="#e8302a"
            fillOpacity="0.25"
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="0.1em"
          >
            [ IMAGEN Pendiente ]
          </text>
          <text
            x="200"
            y="140"
            textAnchor="middle"
            fill="#6e6c68"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="0.08em"
          >
            {item.id.toUpperCase()}
          </text>
        </svg>

        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-void/0 opacity-0 transition-all duration-300 group-hover:bg-void/60 group-hover:opacity-100">
          <span className="text-data-wide border border-ghost-red px-4 py-2 text-[10px] uppercase text-ghost-red tracking-[0.12em]">
            Ver detalle
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute left-3 top-3">
          <span className="text-data-wide bg-void/80 px-2.5 py-1 text-[9px] uppercase text-ghost-red tracking-[0.1em]">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5">
        {/* Unit ID */}
        <div className="text-data-wide flex items-center gap-2 text-[9px] uppercase text-bone-faint tracking-[0.12em]">
          <span className="text-ghost-red opacity-50" aria-hidden="true">[</span>
          {item.id.toUpperCase()}
          <span className="text-ghost-red opacity-50" aria-hidden="true">]</span>
        </div>

        <h3 className="text-display text-lg leading-[0.95] text-bone">
          {item.title}
        </h3>

        <p className="text-[13px] leading-relaxed text-bone-dim">
          {item.description}
        </p>

        {/* Tags */}
        <div className="mt-1 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="border border-line-soft px-2 py-0.5 text-[9px] uppercase text-bone-faint tracking-[0.08em]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Crosshair corners */}
      <div
        className="absolute left-0 top-0 size-2 border-l border-t border-ghost-red/20 transition-colors duration-300 group-hover:border-ghost-red/50"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 size-2 border-r border-b border-ghost-red/20 transition-colors duration-300 group-hover:border-ghost-red/50"
        aria-hidden="true"
      />
    </article>
  );
}
