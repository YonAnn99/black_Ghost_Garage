"use client";

import { useEffect, useState } from "react";

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
};

export default function Gallery() {
  const [active, setActive] = useState("Todos");
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch("/api/portfolio");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setItems(data);
      } catch {
        console.warn("Could not fetch portfolio");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const hasItems = items.length > 0;
  const categories = ["Todos", ...new Set(items.map((g) => g.category))];

  const filtered =
    active === "Todos"
      ? items
      : items.filter((g) => g.category === active);

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

          {/* Filter tabs — solo si hay items */}
          {hasItems && (
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
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={`skeleton-${idx}`}
                className="border border-line bg-void animate-pulse"
              >
                <div className="aspect-[16/10] bg-panel" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-16 bg-panel-raised" />
                  <div className="h-5 w-3/4 bg-panel-raised" />
                  <div className="h-3 w-full bg-panel-raised" />
                </div>
              </div>
            ))}
          </div>
        ) : hasItems ? (
          <>
            <div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              role="tabpanel"
              key={active}
            >
              {filtered.map((item, idx) => (
                <GalleryCard key={item.id} item={item} index={idx} />
              ))}
            </div>

            <div
              className="reveal mt-10 flex items-center justify-between border-t border-line-soft pt-6 text-[10px] uppercase text-bone-faint"
              data-reveal-delay="200"
            >
              <span className="text-data-wide">
                Mostrando {filtered.length} de {items.length} operaciones
              </span>
              <span className="text-data-wide hidden sm:inline">///</span>
              <span className="text-data-wide">
                Categoría: {active}
              </span>
            </div>
          </>
        ) : (
          /* Coming Soon CTA */
          <div className="flex flex-col items-center">
            <div className="relative border border-line bg-void p-12 md:p-16 text-center max-w-2xl w-full">
              {/* Double-bezel inset */}
              <div className="pointer-events-none absolute inset-[3px] border border-line-soft" aria-hidden="true" />

              {/* Grid background */}
              <div className="absolute inset-0 bg-grid-noir opacity-30" aria-hidden="true" />

              {/* Corner markers */}
              <div className="absolute left-4 top-4 size-3 border-l border-t border-ghost-red/30" aria-hidden="true" />
              <div className="absolute right-4 top-4 size-3 border-r border-t border-ghost-red/30" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 size-3 border-l border-b border-ghost-red/30" aria-hidden="true" />
              <div className="absolute bottom-4 right-4 size-3 border-r border-b border-ghost-red/30" aria-hidden="true" />

              <div className="relative">
                {/* Icon */}
                <div className="mb-6 inline-flex items-center justify-center border border-ghost-red/20 p-4">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-8 text-ghost-red/60"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </div>

                <span className="text-data-wide block text-[10px] uppercase text-ghost-red tracking-[0.2em] mb-3">
                  ◆ Portafolio en construcción
                </span>

                <h3 className="text-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[0.9] text-bone mb-4">
                  Próximamente
                </h3>

                <p className="text-[15px] leading-relaxed text-bone-dim max-w-md mx-auto mb-8">
                  Estamos documentando nuestros mejores trabajos.
                  Vuelve pronto para conocer nuestro portafolio completo.
                </p>

                <a
                  href="#contacto"
                  className="btn-press group inline-flex items-center gap-3 border border-ghost-red bg-ghost-red px-8 py-4 text-[11px] uppercase text-void tracking-[0.12em] transition-colors duration-200 hover:bg-bone hover:text-void"
                >
                  <span>Agendar cita</span>
                  <span
                    className="inline-flex size-5 items-center justify-center rounded-full bg-void/15 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-void/25"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function GalleryCard({
  item,
  index,
}: {
  item: PortfolioItem;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);

  const hasRealImage = item.image && !item.image.includes("placeholder") && !imgError;

  return (
    <article
      className="group relative border border-line bg-void transition-all duration-300 hover:border-bone-faint opacity-100 translate-y-0"
      style={{ transitionDuration: `${500 + index * 60}ms`, transitionTimingFunction: "var(--ease-out-expo)" }}
      aria-label={`Proyecto: ${item.title}`}
    >
      {/* Double-bezel inset */}
      <div
        className="pointer-events-none absolute inset-[3px] border border-line-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Image area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-panel">
        {hasRealImage ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
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
        )}

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
