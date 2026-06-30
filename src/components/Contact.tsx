"use client";

import { useState } from "react";
import { contactInfo } from "@/lib/data";
import ReviewsCarousel from "./ReviewsCarousel";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contacto" className="relative bg-void py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="reveal mb-14">
          <span className="text-data text-[11px] uppercase text-ghost-red">
            ◆ Contacto
          </span>
          <h2 className="text-display mt-3 text-[clamp(2rem,5vw,3.2rem)] leading-none text-bone">
            Inicia el protocolo de servicio
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-bone-dim">
            Envíanos los detalles de tu vehículo y un especialista te
            contactará para confirmar diagnóstico y disponibilidad.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Form */}
          <div className="reveal" data-reveal-delay="100">
            {submitted ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center border border-line bg-panel p-10 text-center">
                <span className="size-2 rounded-full bg-ghost-red animate-pulse-dot" />
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
                  className="text-data mt-7 border-b border-ghost-red pb-1 text-[12px] uppercase text-bone-dim hover:text-bone"
                >
                  Enviar otra transmisión
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Field label="Nombre / Piloto" htmlFor="nombre">
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    placeholder="Ingresa tu nombre"
                    className="w-full border border-line bg-panel px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:border-ghost-red focus:outline-none"
                  />
                </Field>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field label="Vehículo (marca/modelo)" htmlFor="vehiculo">
                    <input
                      id="vehiculo"
                      name="vehiculo"
                      type="text"
                      required
                      placeholder="Ej. Ford Mustang"
                      className="w-full border border-line bg-panel px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:border-ghost-red focus:outline-none"
                    />
                  </Field>
                  <Field label="Año" htmlFor="anio">
                    <input
                      id="anio"
                      name="anio"
                      type="text"
                      inputMode="numeric"
                      placeholder="Ej. 2023"
                      className="w-full border border-line bg-panel px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:border-ghost-red focus:outline-none"
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
                    className="w-full resize-none border border-line bg-panel px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:border-ghost-red focus:outline-none"
                  />
                </Field>

                <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="text-data inline-flex items-center justify-center gap-2 bg-ghost-red px-7 py-3.5 text-[13px] uppercase text-void transition-colors hover:bg-bone"
                  >
                    Enviar transmisión
                  </button>
                  <a
                    href={contactInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-data inline-flex items-center justify-center gap-2 border border-line px-7 py-3.5 text-[13px] uppercase text-bone-dim transition-colors hover:border-bone hover:text-bone"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                      aria-hidden="true"
                    >
                      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-1.4-.6-2.4-1.4-3.2-2.8-.1-.2-.1-.4.1-.5.2-.2.5-.5.6-.7.1-.2 0-.4 0-.6-.1-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.2.3-.9 1-.9 2.3 0 1.3 1 2.6 1.1 2.8.1.2 1.7 2.7 4.2 3.7 2 .8 2.4.6 2.8.6.4 0 1.3-.5 1.5-1 .2-.5.2-.9.1-1Zm-5.5 7.1c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3.4.9.9-3.3-.2-.3a8.9 8.9 0 0 1 13.6-11 8.9 8.9 0 0 1-6.1 15.1Z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Coordinates / location */}
          <div className="reveal" id="ubicacion" data-reveal-delay="180">
            <p className="text-data mb-2 text-[11px] uppercase text-ghost-red">
              ◆ Coordenadas
            </p>
            <p className="mb-5 text-sm text-bone-dim">Nuestra base de operaciones.</p>

            <a
              href={contactInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[16/10] overflow-hidden border border-line bg-panel"
            >
              <svg
                className="absolute inset-0 h-full w-full opacity-50"
                viewBox="0 0 400 250"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 0H40V40" fill="none" stroke="#e8302a" strokeOpacity="0.25" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="400" height="250" fill="#131313" />
                <rect width="400" height="250" fill="url(#mapGrid)" />
                <path d="M0 60 L160 60 L160 0" stroke="#e8302a" strokeOpacity="0.4" strokeWidth="1" fill="none" />
                <path d="M400 190 L240 190 L240 250" stroke="#e8302a" strokeOpacity="0.4" strokeWidth="1" fill="none" />
                <path d="M0 220 L120 220 L160 180 L400 180" stroke="#e8302a" strokeOpacity="0.4" strokeWidth="1" fill="none" />
                <path d="M260 0 L260 100 L400 100" stroke="#e8302a" strokeOpacity="0.4" strokeWidth="1" fill="none" />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 border border-line bg-void px-6 py-5 transition-colors group-hover:border-ghost-red">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-7 text-ghost-red"
                    aria-hidden="true"
                  >
                    <path d="M12 2c-4.2 0-7.5 3.3-7.5 7.5 0 5.6 6.3 11.5 7 12.1.3.3.7.3 1 0 .7-.6 7-6.5 7-12.1C19.5 5.3 16.2 2 12 2Zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z" />
                  </svg>
                  <span className="text-data text-[12px] uppercase text-bone">
                    Ver en Google Maps
                  </span>
                </div>
              </div>
            </a>

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
              <p className="text-data text-[12px] uppercase text-bone-faint">
                {contactInfo.accessNote}
              </p>
            </div>

            <div className="mt-7 border-t border-line-soft pt-6">
              <p className="text-data mb-3 text-[11px] uppercase text-bone-faint">
                Horario de operación
              </p>
              <ul className="flex flex-col gap-2 text-[13px]">
                {contactInfo.hours.map((h) => (
                  <li key={h.day} className="flex justify-between text-bone-dim">
                    <span>{h.day}</span>
                    <span className="text-data text-bone">{h.time}</span>
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
        className="text-data text-[11px] uppercase text-bone-faint"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
