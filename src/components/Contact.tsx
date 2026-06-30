"use client";

import { useState } from "react";
import { contactInfo } from "@/lib/data";
import ReviewsCarousel from "./ReviewsCarousel";
import GoogleMap from "./GoogleMap";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.get("nombre"),
          vehiculo: form.get("vehiculo"),
          anio: form.get("anio") || undefined,
          descripcion: form.get("descripcion"),
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        setError(data.error || "Error al enviar.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("No se pudo conectar con el servidor. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contacto" className="relative bg-void py-24 md:py-32" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="reveal mb-14">
          <span className="text-data-wide text-[10px] uppercase text-ghost-red tracking-[0.15em]">
            ◆ Contacto
          </span>
          <h2
            id="contact-heading"
            className="text-display mt-4 text-[clamp(2.2rem,5.5vw,3.5rem)] leading-[0.92] text-bone"
          >
            Inicia el protocolo de servicio
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-bone-dim">
            Envíanos los detalles de tu vehículo y un especialista te
            contactará para confirmar diagnóstico y disponibilidad.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Form — double-bezel */}
          <div className="reveal" data-reveal-delay="100">
            {submitted ? (
              <div className="relative flex h-full min-h-[420px] flex-col items-center justify-center border border-ghost-red bg-void p-10 text-center">
                <div className="pointer-events-none absolute inset-[3px] border border-ghost-red/20" aria-hidden="true" />
                <span className="size-2 rounded-full bg-ghost-red animate-pulse-dot" aria-hidden="true" />
                <p className="text-display mt-5 text-xl text-bone">
                  Transmisión enviada
                </p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone-dim">
                  Recibimos los datos de tu vehículo. Un especialista
                  te contactará en las próximas horas hábiles.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-press text-data-wide mt-7 border-b border-ghost-red pb-1 text-[10px] uppercase tracking-[0.1em] text-bone-dim transition-colors duration-200 hover:text-bone"
                >
                  Enviar otra transmisión
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative border border-line bg-panel p-6 md:p-8">
                {/* Double-bezel inset */}
                <div className="pointer-events-none absolute inset-[3px] border border-line-soft" aria-hidden="true" />

                {/* Form header */}
                <div className="relative mb-6 flex items-center justify-between border-b border-line-soft pb-4">
                  <span className="text-data-wide flex items-center gap-2 text-[10px] uppercase text-bone-faint tracking-[0.12em]">
                    <span className="size-1.5 rounded-full bg-ghost-red animate-pulse-dot" aria-hidden="true" />
                    Formulario de contacto
                  </span>
                  <span className="text-data-wide text-[9px] uppercase text-bone-faint tracking-[0.1em]" aria-hidden="true">
                    [REQUIRED]
                  </span>
                </div>

                <div className="relative flex flex-col gap-5">
                  <Field label="Nombre / Piloto" htmlFor="nombre">
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      placeholder="Ingresa tu nombre"
                      className="w-full border border-line bg-void px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:border-ghost-red focus:outline-none transition-colors duration-200"
                    />
                  </Field>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Vehículo (marca/modelo)" htmlFor="vehiculo">
                      <input
                        id="vehiculo"
                        name="vehiculo"
                        type="text"
                        required
                        placeholder="Ej. Ford Mustang"
                        className="w-full border border-line bg-void px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:border-ghost-red focus:outline-none transition-colors duration-200"
                      />
                    </Field>
                    <Field label="Año" htmlFor="anio">
                      <input
                        id="anio"
                        name="anio"
                        type="text"
                        inputMode="numeric"
                        placeholder="Ej. 2023"
                        className="w-full border border-line bg-void px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:border-ghost-red focus:outline-none transition-colors duration-200"
                      />
                    </Field>
                  </div>

                  <Field label="Descripción del requerimiento" htmlFor="descripcion">
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      rows={4}
                      required
                      placeholder="Describe el servicio, falla o modificación requerida…"
                      className="w-full resize-none border border-line bg-void px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:border-ghost-red focus:outline-none transition-colors duration-200"
                    />
                  </Field>

                  {error && (
                    <p className="text-[12px] text-ghost-red" role="alert">
                      {error}
                    </p>
                  )}

                  <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-press group inline-flex items-center justify-center gap-2.5 bg-ghost-red px-7 py-3.5 text-[11px] uppercase text-void transition-all duration-200 hover:bg-bone disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{loading ? "Transmitiendo..." : "Enviar transmisión"}</span>
                      <span
                        className="inline-flex size-5 items-center justify-center rounded-full bg-void/15 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-void/25"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </button>
                    <a
                      href={contactInfo.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press inline-flex items-center justify-center gap-2 border border-line px-7 py-3.5 text-[11px] uppercase text-bone-dim transition-all duration-200 hover:border-bone hover:text-bone"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-3.5"
                        aria-hidden="true"
                      >
                        <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-1.4-.6-2.4-1.4-3.2-2.8-.1-.2-.1-.4.1-.5.2-.2.5-.5.6-.7.1-.2 0-.4 0-.6-.1-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.2.3-.9 1-.9 2.3 0 1.3 1 2.6 1.1 2.8.1.2 1.7 2.7 4.2 3.7 2 .8 2.4.6 2.8.6.4 0 1.3-.5 1.5-1 .2-.5.2-.9.1-1Zm-5.5 7.1c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3.4.9.9-3.3-.2-.3a8.9 8.9 0 0 1 13.6-11 8.9 8.9 0 0 1-6.1 15.1Z" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Crosshair corners */}
                <div className="absolute left-0 top-0 size-2 border-l border-t border-ghost-red/20" aria-hidden="true" />
                <div className="absolute bottom-0 right-0 size-2 border-r border-b border-ghost-red/20" aria-hidden="true" />
              </form>
            )}
          </div>

          {/* Coordinates / location — real map */}
          <div className="reveal" id="ubicacion" data-reveal-delay="180">
            <p className="text-data-wide mb-2 text-[10px] uppercase text-ghost-red tracking-[0.15em]">
              ◆ Coordenadas
            </p>
            <p className="mb-5 text-sm text-bone-dim">Nuestra base de operaciones.</p>

            {/* Google Maps */}
            <div className="group relative aspect-[16/10] overflow-hidden border border-line bg-panel">
              {/* Double-bezel inset */}
              <div
                className="pointer-events-none absolute inset-[3px] z-10 border border-line-soft transition-colors duration-300 group-hover:border-ghost-red/30"
                aria-hidden="true"
              />

              <GoogleMap apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ""} />

              {/* Overlay label */}
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-void via-void/80 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4 text-ghost-red"
                    aria-hidden="true"
                  >
                    <path d="M12 2c-4.2 0-7.5 3.3-7.5 7.5 0 5.6 6.3 11.5 7 12.1.3.3.7.3 1 0 .7-.6 7-6.5 7-12.1C19.5 5.3 16.2 2 12 2Zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z" />
                  </svg>
                  <span className="text-data-wide text-[10px] uppercase text-bone tracking-[0.1em]">
                    Ver en Google Maps
                  </span>
                </div>
              </div>

              {/* Crosshair corners */}
              <div className="absolute left-0 top-0 z-10 size-3 border-l border-t border-ghost-red/30" aria-hidden="true" />
              <div className="absolute right-0 top-0 z-10 size-3 border-r border-t border-ghost-red/30" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 z-10 size-3 border-l border-b border-ghost-red/30" aria-hidden="true" />
              <div className="absolute bottom-0 right-0 z-10 size-3 border-r border-b border-ghost-red/30" aria-hidden="true" />
            </div>

            {/* Address */}
            <div className="mt-6 flex flex-col gap-3 text-[14px] leading-relaxed text-bone-dim">
              <p className="flex gap-3">
                <svg viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 size-4 shrink-0 text-ghost-red" aria-hidden="true">
                  <path d="M12 2c-4.2 0-7.5 3.3-7.5 7.5 0 5.6 6.3 11.5 7 12.1.3.3.7.3 1 0 .7-.6 7-6.5 7-12.1C19.5 5.3 16.2 2 12 2Zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z" />
                </svg>
                <span>
                  {contactInfo.address}
                  <br />
                  {contactInfo.cityLine}
                </span>
              </p>
              <p className="text-data-wide text-[10px] uppercase text-bone-faint tracking-[0.1em]">
                {contactInfo.accessNote}
              </p>
            </div>

            {/* Hours */}
            <div className="mt-7 border-t border-line-soft pt-6">
              <p className="text-data-wide mb-3 text-[10px] uppercase text-bone-faint tracking-[0.12em]">
                Horario de operación
              </p>
              <ul className="flex flex-col gap-2 text-[13px]">
                {contactInfo.hours.map((h) => (
                  <li key={h.day} className="flex justify-between text-bone-dim">
                    <span>{h.day}</span>
                    <span className="text-data-wide text-[11px] text-bone tracking-[0.06em]">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <ReviewsCarousel />
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-data-wide text-[10px] uppercase text-bone-faint tracking-[0.1em]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
