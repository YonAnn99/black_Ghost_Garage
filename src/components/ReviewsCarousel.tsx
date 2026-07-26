"use client";

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

      <div className="group relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-void to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-void to-transparent" />

        <div className="reviews-scroll flex gap-5">
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
    </div>
  );
}
