"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const reviews = [
  {
    name: "Cynthia Gabriela Flores Ramirez",
    rating: 5,
    text: "Llevé mi moto a este taller para darle servicio y quedé muy satisfecha con el resultado. Desde el inicio me brindaron una atención amable y clara, explicándome qué se iba a revisar y el costo aproximado. El trabajo lo entregaron en el tiempo acordado y mi moto quedó funcionando excelente, se siente mucho más ligera y segura al manejar. Además, me dieron recomendaciones de mantenimiento para que dure en buen estado y evitar problemas a futuro. Sin duda es un lugar confiable, con buena relación calidad-precio y el personal que sabe lo que hace. Lo recomiendo totalmente para quienes buscan un servicio responsable y profesional para su moto.",
    time: "hace 9 meses",
  },
  {
    name: "Jose Hurtado",
    rating: 5,
    text: "Excelente taller, trato profesional y amable. Mi carro quedó perfecto, cumplieron con el tiempo de entrega y los precios son justos. Muy recomendable.",
    time: "hace 10 meses",
  },
  {
    name: "Pikashu8911",
    rating: 5,
    text: "Excelente servicio, cuentan con el equipo adecuado y me brindaron una atención muy amable.",
    time: "hace 10 meses",
  },
  {
    name: "Jonattan Anaya",
    rating: 5,
    text: "Excelente atención, servicio de calidad.",
    time: "hace 3 semanas",
  },
  {
    name: "Ramírez Avila Luis Angel",
    rating: 5,
    text: "Excelente taller! Trabajo profesional, muy recomendado.",
    time: "hace 10 meses",
  },
  {
    name: "Irvin Alejandro Bustos Vargas",
    rating: 5,
    text: "Excelente acabado en tubería y pintura de rines.",
    time: "hace 10 meses",
  },
  {
    name: "Carlos Lozano",
    rating: 5,
    text: "100% recomendable.",
    time: "hace 10 meses",
  },
];

const CARD_WIDTH = 320;
const CARD_GAP = 20;
const CARD_STEP = CARD_WIDTH + CARD_GAP;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 24 24"
          fill={star <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={star <= rating ? 0 : 1.5}
          className={`size-3.5 ${
            star <= rating ? "text-amber-400" : "text-bone-faint"
          }`}
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsCarousel() {
  const duplicatedReviews = [...reviews, ...reviews];
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const offsetRef = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const velocityHistory = useRef<{ x: number; t: number }[]>([]);

  const totalWidth = duplicatedReviews.length * CARD_STEP;
  const halfWidth = totalWidth / 2;

  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const applyTransform = useCallback((value: number, smooth = false) => {
    const track = trackRef.current;
    if (!track) return;
    offsetRef.current = value;
    track.style.transition = smooth
      ? "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)"
      : "none";
    track.style.transform = `translateX(${value}px)`;
  }, []);

  const clampOffset = useCallback(
    (value: number) => Math.max(-halfWidth, Math.min(0, value)),
    [halfWidth]
  );

  const snapToCard = useCallback(
    (currentOffset: number) => {
      const snapped = Math.round(currentOffset / CARD_STEP) * CARD_STEP;
      return clampOffset(snapped);
    },
    [clampOffset]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isDragging.current = true;
      const x = e.touches[0].clientX;
      startX.current = x;
      startOffset.current = offsetRef.current;
      velocityHistory.current = [{ x, t: Date.now() }];
      applyTransform(offsetRef.current, false);
    },
    [applyTransform]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;

      const x = e.touches[0].clientX;
      const delta = x - startX.current;
      let newOffset = startOffset.current + delta;

      velocityHistory.current.push({ x, t: Date.now() });
      if (velocityHistory.current.length > 5) {
        velocityHistory.current.shift();
      }

      const rubberBand =
        newOffset > 0 || newOffset < -halfWidth ? 0.3 : 1;
      if (newOffset > 0) {
        newOffset *= rubberBand;
      } else if (newOffset < -halfWidth) {
        newOffset = -halfWidth + (newOffset + halfWidth) * rubberBand;
      }

      applyTransform(newOffset, false);
    },
    [halfWidth, applyTransform]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const history = velocityHistory.current;
    let velocity = 0;

    if (history.length >= 2) {
      const last = history[history.length - 1];
      const first = history[0];
      const dt = (last.t - first.t) / 1000;
      if (dt > 0 && dt < 0.5) {
        velocity = (last.x - first.x) / dt / 1000;
      }
    }

    const currentOffset = offsetRef.current;
    let targetOffset: number;

    if (Math.abs(velocity) > 0.3) {
      targetOffset =
        currentOffset + (velocity > 0 ? 1 : -1) * CARD_STEP;
    } else {
      targetOffset = snapToCard(currentOffset);
    }

    applyTransform(clampOffset(targetOffset), true);
  }, [snapToCard, clampOffset, applyTransform]);

  return (
    <div className="reveal mt-16" data-reveal-delay="200">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="text-data-wide text-[10px] uppercase text-ghost-red tracking-[0.15em]">
            ◆ Reseñas verificadas
          </span>
          <h3 className="text-display mt-3 text-[clamp(1.5rem,3vw,2rem)] leading-[0.95] text-bone">
            Lo que dicen nuestros clientes
          </h3>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 text-ghost-red"
            aria-hidden="true"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <span className="text-data-wide text-[11px] uppercase text-bone-dim tracking-[0.08em]">
            Google Maps
          </span>
        </div>
      </div>

      <div
        className={`group relative overflow-hidden ${
          isMobile ? "cursor-grab active:cursor-grabbing" : ""
        }`}
      >
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-void to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-void to-transparent" />

        <div
          ref={trackRef}
          className={`flex gap-5 ${isMobile ? "reviews-touch-active" : "reviews-scroll"}`}
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchMove={isMobile ? handleTouchMove : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
          style={isMobile ? { willChange: "transform" } : undefined}
        >
          {duplicatedReviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="review-card flex w-[320px] shrink-0 flex-col border border-line bg-panel p-5"
            >
              <div className="pointer-events-none absolute inset-[2px] border border-line-soft" aria-hidden="true" />

              <div className="relative mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center border border-line bg-panel-raised text-[11px] font-medium uppercase text-ghost-red">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-bone">
                      {review.name}
                    </p>
                    <p className="text-data-wide text-[9px] uppercase text-bone-faint tracking-[0.1em]">
                      {review.time}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>

              <p className="relative text-[13px] leading-relaxed text-bone-dim">
                {review.text}
              </p>

              <div className="relative mt-4 flex items-center gap-1.5 border-t border-line-soft pt-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-3 text-ghost-red/50"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span className="text-data-wide text-[9px] uppercase text-bone-faint tracking-[0.1em]">
                  Reseña de Google
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isMobile && (
        <p className="mt-4 text-center text-[10px] uppercase text-bone-faint/50 tracking-[0.12em]">
          ← Desliza para ver más →
        </p>
      )}
    </div>
  );
}
