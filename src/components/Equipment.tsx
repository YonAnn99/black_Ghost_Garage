"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { workshopStats, equipmentItems, type EquipmentItem } from "@/lib/data";

const equipmentIcons: Record<string, string> = {
  "Laboratorio de inyectores":
    "M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5m-4.25-5.682c.25.023.5.05.75.082M12 21a8.966 8.966 0 0 0 5.982-2.275M12 21a8.966 8.966 0 0 1-5.982-2.275M15.75 3.104c.25.023.5.05.75.082M12 3.104c-.25.023-.5.05-.75.082m0 0a24.3 24.3 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5m-1.5-5.682",
  Spotter:
    "M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5M7.5 20.25H6A2.25 2.25 0 0 1 3.75 18v-1.5M12 8.25v7.5m-3.75-3.75h7.5",
  "Rampa de dos postes":
    "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  "Escáner de alta gamma":
    "M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5m-4.25-5.682c.25.023.5.05.75.082M12 21a8.966 8.966 0 0 0 5.982-2.275M12 21a8.966 8.966 0 0 1-5.982-2.275M15.75 3.104c.25.023.5.05.75.082M12 3.104c-.25.023-.5.05-.75.082m0 0a24.3 24.3 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5m-1.5-5.682",
  "Cargador de batería inteligente":
    "M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Zm4.5-6.75V7.5a.75.75 0 0 1 1.5 0v3.75a.75.75 0 0 1-1.5 0Zm3 0V7.5a.75.75 0 0 1 1.5 0v3.75a.75.75 0 0 1-1.5 0Zm3 0V7.5a.75.75 0 0 1 1.5 0v3.75a.75.75 0 0 1-1.5 0ZM3.75 12h15a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 .75-.75Z",
  Balanceadora:
    "M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
};

const LIGHTBOX_WIDTH = 300;
const LIGHTBOX_OFFSET = 24;

function calculateCursorPosition(mouseX: number, mouseY: number): { left: number; top: number } {
  const padding = 16;
  let left = mouseX + LIGHTBOX_OFFSET;
  let top = mouseY - LIGHTBOX_OFFSET;

  if (left + LIGHTBOX_WIDTH + padding > window.innerWidth) {
    left = mouseX - LIGHTBOX_WIDTH - LIGHTBOX_OFFSET;
  }

  if (top + 320 > window.innerHeight) {
    top = window.innerHeight - 320 - padding;
  }

  if (top < padding) {
    top = padding;
  }

  return { left, top };
}

export default function Equipment() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  // IntersectionObserver for auto-reset on scroll
  useEffect(() => {
    if (!isTouchDevice) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            const cardId = entry.target.getAttribute("data-card-id");
            if (cardId) {
              setFlippedCards((prev) => {
                const next = new Set(prev);
                next.delete(cardId);
                return next;
              });
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isTouchDevice]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleHoverStart = useCallback((id: string) => {
    if (isTouchDevice) return;
    setHoveredId(id);
  }, [isTouchDevice]);

  const handleHoverEnd = useCallback(() => {
    setHoveredId(null);
  }, []);

  const handleCardTap = useCallback((id: string) => {
    if (!isTouchDevice) return;
    
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, [isTouchDevice]);

  const registerCardRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
    if (el) {
      cardRefs.current.set(id, el);
    } else {
      cardRefs.current.delete(id);
    }
  }, []);

  const hoveredItem = hoveredId
    ? equipmentItems.find((item) => item.id === hoveredId && item.image)
    : null;

  return (
    <section
      id="equipo"
      className="relative bg-panel py-24 md:py-32"
      aria-labelledby="equipment-heading"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-scanlines opacity-[0.03]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="reveal mb-14 flex flex-col gap-4 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-data-wide text-[10px] uppercase text-ghost-red tracking-[0.15em]">
              ◆ Infraestructura
            </span>
            <h2
              id="equipment-heading"
              className="text-display mt-4 text-[clamp(2.2rem,5.5vw,3.5rem)] leading-[0.9] text-bone"
            >
              Nuestro equipo
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-bone-dim">
            {workshopStats.synopsis}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[minmax(140px,auto)]">
          {/* Row 1: Stats */}
          <StatCard
            value={workshopStats.area}
            unit="m²"
            label={workshopStats.areaLabel}
            span="md:col-span-2"
            delay={0}
          />
          <StatCard
            value={workshopStats.carBays.toString()}
            unit=""
            label={workshopStats.carBaysLabel}
            span="md:col-span-1"
            delay={80}
          />
          <StatCard
            value={workshopStats.motorcycleBays.toString()}
            unit=""
            label={workshopStats.motorcycleBaysLabel}
            span="md:col-span-1"
            delay={160}
          />

          {/* Row 2: Equipment large + small */}
          <EquipmentCard
            item={equipmentItems[0]}
            span="md:col-span-2 md:row-span-1"
            delay={200}
            isFlipped={flippedCards.has(equipmentItems[0].id)}
            onFlip={handleCardTap}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            cardRef={registerCardRef(equipmentItems[0].id)}
            isTouchDevice={isTouchDevice}
          />
          <EquipmentCard
            item={equipmentItems[1]}
            span="md:col-span-1 md:row-span-1"
            delay={260}
            isFlipped={flippedCards.has(equipmentItems[1].id)}
            onFlip={handleCardTap}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            cardRef={registerCardRef(equipmentItems[1].id)}
            isTouchDevice={isTouchDevice}
          />
          <EquipmentCard
            item={equipmentItems[2]}
            span="md:col-span-1 md:row-span-1"
            delay={300}
            isFlipped={flippedCards.has(equipmentItems[2].id)}
            onFlip={handleCardTap}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            cardRef={registerCardRef(equipmentItems[2].id)}
            isTouchDevice={isTouchDevice}
          />

          {/* Row 3: Equipment medium */}
          <EquipmentCard
            item={equipmentItems[3]}
            span="md:col-span-1 md:row-span-1"
            delay={340}
            isFlipped={flippedCards.has(equipmentItems[3].id)}
            onFlip={handleCardTap}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            cardRef={registerCardRef(equipmentItems[3].id)}
            isTouchDevice={isTouchDevice}
          />
          <EquipmentCard
            item={equipmentItems[4]}
            span="md:col-span-1 md:row-span-1"
            delay={400}
            isFlipped={flippedCards.has(equipmentItems[4].id)}
            onFlip={handleCardTap}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            cardRef={registerCardRef(equipmentItems[4].id)}
            isTouchDevice={isTouchDevice}
          />
          <EquipmentCard
            item={equipmentItems[5]}
            span="md:col-span-2 md:row-span-1"
            delay={450}
            isFlipped={flippedCards.has(equipmentItems[5].id)}
            onFlip={handleCardTap}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            cardRef={registerCardRef(equipmentItems[5].id)}
            isTouchDevice={isTouchDevice}
          />
        </div>
      </div>

      {/* Lightbox Preview - Cursor Following (Desktop only) */}
      {hoveredItem && (
        <LightboxPreview item={hoveredItem} mousePos={mousePos} />
      )}
    </section>
  );
}

function StatCard({
  value,
  unit,
  label,
  span,
  delay,
}: {
  value: string;
  unit: string;
  label: string;
  span: string;
  delay: number;
}) {
  return (
    <div
      className={`reveal group relative flex flex-col justify-between border border-line bg-void p-6 transition-all duration-300 hover:border-ghost-red/50 ${span}`}
      data-reveal-delay={delay}
    >
      {/* Corner marks */}
      <div className="absolute left-0 top-0 size-2 border-l border-t border-ghost-red/20 transition-colors duration-300 group-hover:border-ghost-red/50" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 size-2 border-r border-b border-ghost-red/20 transition-colors duration-300 group-hover:border-ghost-red/50" aria-hidden="true" />

      <div className="flex items-baseline gap-1">
        <span className="text-display text-[clamp(2.5rem,5vw,4rem)] leading-none text-ghost-red">
          {value}
        </span>
        {unit && (
          <span className="text-data text-sm uppercase text-ghost-red/60">
            {unit}
          </span>
        )}
      </div>

      <p className="text-data-wide mt-4 text-[10px] uppercase tracking-[0.12em] text-bone-faint">
        {label}
      </p>

      {/* Bottom line animation */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-ghost-red transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:w-full" aria-hidden="true" />
    </div>
  );
}

function EquipmentCard({
  item,
  span,
  delay,
  isFlipped,
  onFlip,
  onHoverStart,
  onHoverEnd,
  cardRef,
  isTouchDevice,
}: {
  item: EquipmentItem;
  span: string;
  delay: number;
  isFlipped: boolean;
  onFlip: (id: string) => void;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
  isTouchDevice: boolean;
}) {
  const iconPath = equipmentIcons[item.name];
  const hasImage = !!item.image;

  return (
    <div
      ref={cardRef}
      data-card-id={item.id}
      className={`card-flip-container reveal ${span}`}
      data-reveal-delay={delay}
    >
      <div className={`card-flip-inner ${isFlipped ? "flipped" : ""}`}>
        {/* FRONT - Description */}
        <article
          className={`card-flip-front group relative flex flex-col border border-line bg-void p-5 transition-all duration-300 hover:border-bone-faint overflow-hidden ${
            isTouchDevice ? "tap-feedback cursor-pointer" : ""
          }`}
          onClick={() => onFlip(item.id)}
          onMouseEnter={() => !isTouchDevice && onHoverStart(item.id)}
          onMouseLeave={() => !isTouchDevice && onHoverEnd()}
          aria-label={item.name}
        >
          {/* Double-bezel inner border */}
          <div
            className="pointer-events-none absolute inset-[3px] border border-line-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />

          {/* Header: Icon + Category */}
          <div className="mb-3 flex items-center justify-between">
            {iconPath && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 shrink-0 text-ghost-red transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              >
                <path d={iconPath} />
              </svg>
            )}
            <span className="text-data-wide text-[9px] uppercase tracking-[0.1em] text-bone-faint">
              {item.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-display text-lg leading-tight text-bone">
            {item.name}
          </h3>

          {/* Description */}
          <p className="mt-2 flex-1 text-[13px] leading-relaxed text-bone-dim line-clamp-4">
            {item.description}
          </p>

          {/* Eye indicator (mobile only) */}
          {isTouchDevice && (
            <div className="eye-indicator mt-4 flex items-center justify-center gap-2 text-[10px] uppercase text-ghost-red/60">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              Ver más
            </div>
          )}

          {/* Bottom line animation */}
          <div className="mt-4 h-[2px] w-0 bg-ghost-red transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:w-full" aria-hidden="true" />

          {/* Corner marks */}
          <div className="absolute left-0 top-0 size-2 border-l border-t border-ghost-red/20 transition-colors duration-300 group-hover:border-ghost-red/50" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 size-2 border-r border-b border-ghost-red/20 transition-colors duration-300 group-hover:border-ghost-red/50" aria-hidden="true" />
        </article>

        {/* BACK - Image */}
        <article
          className={`card-flip-back group relative flex flex-col border border-ghost-red/30 bg-void ${
            isTouchDevice ? "tap-feedback cursor-pointer" : ""
          }`}
          onClick={() => onFlip(item.id)}
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            /* Placeholder industrial para equipos sin foto */
            <div className="flex h-full w-full flex-col items-center justify-center bg-panel p-6 text-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-3 size-12 text-ghost-red/30"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <span className="text-data-wide text-[10px] uppercase tracking-widest text-bone-faint">
                Equipo disponible
              </span>
              <span className="mt-1 text-[11px] text-bone-dim/60">
                {item.name}
              </span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />

          {/* Scanline effect */}
          <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-[0.05]" />

          {/* Content overlay */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-ghost-red animate-pulse-dot" />
              <span className="text-data-wide text-[9px] uppercase tracking-[0.12em] text-ghost-red">
                {item.category}
              </span>
            </div>
            <h3 className="text-display text-lg leading-tight text-bone">
              {item.name}
            </h3>
          </div>

          {/* Flip back indicator */}
          <div className="absolute top-3 right-3">
            <span className="eye-indicator flex items-center gap-1.5 text-[9px] uppercase text-bone/60 bg-void/60 px-2 py-1 backdrop-blur-sm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3"
              >
                <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
              </svg>
              Voltear
            </span>
          </div>

          {/* Corner accents */}
          <div className="pointer-events-none absolute left-0 top-0 size-3 border-l-2 border-t-2 border-ghost-red/40" />
          <div className="pointer-events-none absolute bottom-0 right-0 size-3 border-r-2 border-b-2 border-ghost-red/40" />
        </article>
      </div>
    </div>
  );
}

function LightboxPreview({
  item,
  mousePos,
}: {
  item: EquipmentItem;
  mousePos: { x: number; y: number };
}) {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [displayItem, setDisplayItem] = useState<EquipmentItem>(item);
  const [prevItem, setPrevItem] = useState<EquipmentItem | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const pos = calculateCursorPosition(mousePos.x, mousePos.y);
    setPosition(pos);
  }, [mousePos]);

  useEffect(() => {
    if (isInitialMount.current) {
      setDisplayItem(item);
      isInitialMount.current = false;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
      return;
    }

    if (item.id !== displayItem.id) {
      setPrevItem(displayItem);
      setDisplayItem(item);

      const timer = setTimeout(() => setPrevItem(null), 300);
      return () => clearTimeout(timer);
    }
  }, [item, displayItem.id]);

  if (!displayItem.image) return null;

  return (
    <div
      className={`fixed z-50 pointer-events-none transition-opacity duration-300 ease-[var(--ease-out-expo)] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        left: position.left,
        top: position.top,
        width: LIGHTBOX_WIDTH,
      }}
    >
      <div className="overflow-hidden border border-ghost-red/30 bg-void shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        {/* Image container with crossfade */}
        <div className="relative aspect-[4/3] w-full">
          {prevItem?.image && (
            <img
              src={prevItem.image}
              alt={prevItem.name}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300"
              style={{ opacity: 0 }}
            />
          )}

          <img
            src={displayItem.image}
            alt={displayItem.name}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-scanlines opacity-[0.05]" />
        </div>

        {/* Content */}
        <div className="relative p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-ghost-red animate-pulse-dot" />
            <span className="text-data-wide text-[9px] uppercase tracking-[0.12em] text-ghost-red">
              {displayItem.category}
            </span>
          </div>

          <h4 className="text-display text-base leading-tight text-bone">
            {displayItem.name}
          </h4>

          <div className="mt-3 h-[1px] w-full bg-gradient-to-r from-ghost-red/50 via-ghost-red/20 to-transparent" />
        </div>

        <div className="absolute left-0 top-0 size-3 border-l-2 border-t-2 border-ghost-red/40" />
        <div className="absolute bottom-0 right-0 size-3 border-r-2 border-b-2 border-ghost-red/40" />
      </div>
    </div>
  );
}
