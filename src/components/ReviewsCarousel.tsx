"use client";

const reviews = [
  {
    name: "Carlos Mendoza",
    rating: 5,
    text: "Excelente servicio. Llevé mi Mustang y quedó increíble. Muy profesionales y puntuales. El equipo de Black Ghost's es de confianza.",
    time: "hace 2 semanas",
  },
  {
    name: "Laura Fernández",
    rating: 5,
    text: "Increíble trabajo con mi moto. Le hicieron el mantenimiento completo y quedó como nueva. Precios justos y calidad garantizada.",
    time: "hace 1 mes",
  },
  {
    name: "Roberto Sánchez",
    rating: 5,
    text: "El mejor taller que he encontrado. Mi camioneta quedó perfecta después del servicio. Muy recomendable por la calidad y trato.",
    time: "hace 3 semanas",
  },
  {
    name: "Ana García",
    rating: 4,
    text: "Muy buen trabajo con mi carro. Le cambiaron el aceite y filtros rápidamente. El personal es amable y el taller está muy limpio.",
    time: "hace 2 meses",
  },
  {
    name: "Miguel Torres",
    rating: 5,
    text: "Servicio de primera. Mi auto deportivo quedó impecable. Se nota que conocen de mecánica y modificación. Volveré sin duda.",
    time: "hace 1 semana",
  },
  {
    name: "Sofía Hernández",
    rating: 5,
    text: "Experiencia fantástica. Llevé mi clásico para restauración y el resultado superó mis expectativas. Equipo muy capacitado.",
    time: "hace 3 meses",
  },
  {
    name: "Diego Morales",
    rating: 4,
    text: "Buen servicio y atención personalizada. Mi SUV quedó funcionando perfecto. El tiempo de entrega fue el acordado.",
    time: "hace 6 semanas",
  },
  {
    name: "Valentina Ruiz",
    rating: 5,
    text: "¡Me encantó el resultado! Mi carro tiene un look nuevo gracias a las modificaciones estéticas. Totalmente recomendado.",
    time: "hace 2 semanas",
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
