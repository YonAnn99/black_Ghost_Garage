"use client";

import { useState, useCallback } from "react";
import { contactInfo, socialLinks } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import ReviewsCarousel from "./ReviewsCarousel";

type FieldErrors = {
  nombre?: string;
  telefono?: string;
  vehiculo?: string;
  descripcion?: string;
  privacidad?: string;
};

type FormValues = {
  nombre: string;
  telefono: string;
  vehiculo: string;
  anio: string;
  descripcion: string;
  privacidad: boolean;
};

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.nombre.trim()) {
    errors.nombre = "El nombre es obligatorio.";
  } else if (values.nombre.trim().length < 2) {
    errors.nombre = "El nombre debe tener al menos 2 caracteres.";
  }

  if (!values.telefono.trim()) {
    errors.telefono = "El teléfono es obligatorio.";
  } else if (!/^\d{10}$/.test(values.telefono.replace(/\s/g, ""))) {
    errors.telefono = "Ingresa un número de 10 dígitos.";
  }

  if (!values.vehiculo.trim()) {
    errors.vehiculo = "El vehículo es obligatorio.";
  } else if (values.vehiculo.trim().length < 3) {
    errors.vehiculo = "Ingresa marca y modelo del vehículo.";
  }

  if (!values.descripcion.trim()) {
    errors.descripcion = "La descripción es obligatoria.";
  } else if (values.descripcion.trim().length < 10) {
    errors.descripcion = "Describe el requerimiento con más detalle (mín. 10 caracteres).";
  }

  if (!values.privacidad) {
    errors.privacidad = "Debes aceptar el Aviso de Privacidad.";
  }

  return errors;
}

export default function Contact() {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [values, setValues] = useState<FormValues>({
    nombre: "",
    telefono: "",
    vehiculo: "",
    anio: "",
    descripcion: "",
    privacidad: false,
  });

  const errors = validate(values);

  const handleChange = useCallback(
    (field: keyof FormValues, value: string | boolean) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  function handleWhatsApp() {
    const allTouched = {
      nombre: true,
      telefono: true,
      vehiculo: true,
      descripcion: true,
      privacidad: true,
    };
    setTouched(allTouched);

    if (Object.keys(errors).length > 0) return;

    const message = `Hola Black Ghost's Garage 👋

Nombre: ${values.nombre.trim()}
Teléfono: ${values.telefono.trim()}
Vehículo: ${values.vehiculo.trim()}
Año: ${values.anio.trim() || "No especificado"}
Descripción: ${values.descripcion.trim()}

Solicito cita para diagnóstico.`;

    const url = `https://wa.me/525635363577?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    trackEvent("WhatsApp Click", { source: "contact_form" });
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleWhatsApp();
              }}
              className="flex flex-col gap-6"
              noValidate
            >
              <Field label="Nombre / Piloto" htmlFor="nombre" error={touched.nombre ? errors.nombre : undefined}>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  value={values.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  onBlur={() => handleBlur("nombre")}
                  className={`w-full border bg-panel px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:outline-none transition-colors ${
                    touched.nombre && errors.nombre
                      ? "border-ghost-red focus:border-ghost-red"
                      : "border-line focus:border-ghost-red"
                  }`}
                />
              </Field>

              <Field label="Teléfono" htmlFor="telefono" error={touched.telefono ? errors.telefono : undefined}>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Ej. 55 1234 5678"
                  value={values.telefono}
                  onChange={(e) => handleChange("telefono", e.target.value)}
                  onBlur={() => handleBlur("telefono")}
                  className={`w-full border bg-panel px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:outline-none transition-colors ${
                    touched.telefono && errors.telefono
                      ? "border-ghost-red focus:border-ghost-red"
                      : "border-line focus:border-ghost-red"
                  }`}
                />
              </Field>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field label="Vehículo (marca/modelo/motor)" htmlFor="vehiculo" error={touched.vehiculo ? errors.vehiculo : undefined}>
                  <input
                    id="vehiculo"
                    name="vehiculo"
                    type="text"
                    placeholder="Ej. Ford Mustang GT 5.0 V8"
                    value={values.vehiculo}
                    onChange={(e) => handleChange("vehiculo", e.target.value)}
                    onBlur={() => handleBlur("vehiculo")}
                    className={`w-full border bg-panel px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:outline-none transition-colors ${
                      touched.vehiculo && errors.vehiculo
                        ? "border-ghost-red focus:border-ghost-red"
                        : "border-line focus:border-ghost-red"
                    }`}
                  />
                </Field>
                <Field label="Año" htmlFor="anio">
                  <input
                    id="anio"
                    name="anio"
                    type="text"
                    inputMode="numeric"
                    placeholder="Ej. 2023"
                    value={values.anio}
                    onChange={(e) => handleChange("anio", e.target.value)}
                    className="w-full border border-line bg-panel px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:border-ghost-red focus:outline-none"
                  />
                </Field>
              </div>

              <Field label="Descripción del requerimiento" htmlFor="descripcion" error={touched.descripcion ? errors.descripcion : undefined}>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  rows={4}
                  placeholder="Describe el servicio, falla o modificación requerida…"
                  value={values.descripcion}
                  onChange={(e) => handleChange("descripcion", e.target.value)}
                  onBlur={() => handleBlur("descripcion")}
                  className={`w-full resize-none border bg-panel px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:outline-none transition-colors ${
                    touched.descripcion && errors.descripcion
                      ? "border-ghost-red focus:border-ghost-red"
                      : "border-line focus:border-ghost-red"
                  }`}
                />
              </Field>

              {/* Privacy checkbox */}
              <div className="flex flex-col gap-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={values.privacidad}
                    onChange={(e) => handleChange("privacidad", e.target.checked)}
                    onBlur={() => handleBlur("privacidad")}
                    className="mt-1 size-4 shrink-0 border border-line bg-panel accent-ghost-red"
                  />
                  <span className="text-[13px] leading-relaxed text-bone-dim">
                    He leído y acepto el{" "}
                    <a
                      href="/aviso-de-privacidad"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open("/aviso-de-privacidad", "_blank");
                      }}
                      className="text-ghost-red underline underline-offset-2 hover:text-bone"
                    >
                      Aviso de Privacidad
                    </a>
                  </span>
                </label>
                {touched.privacidad && errors.privacidad && (
                  <p className="flex items-center gap-1.5 text-[12px] text-ghost-red">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3 shrink-0">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    {errors.privacidad}
                  </p>
                )}
              </div>

              {/* WhatsApp button */}
              <div className="mt-2">
                <button
                  type="submit"
                  className="text-data inline-flex w-full items-center justify-center gap-2 bg-[#25D366] px-7 py-3.5 text-[13px] uppercase text-void transition-colors hover:bg-[#20ba5a] sm:w-auto"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-1.4-.6-2.4-1.4-3.2-2.8-.1-.2-.1-.4.1-.5.2-.2.5-.5.6-.7.1-.2 0-.4 0-.6-.1-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.2.3-.9 1-.9 2.3 0 1.3 1 2.6 1.1 2.8.1.2 1.7 2.7 4.2 3.7 2 .8 2.4.6 2.8.6.4 0 1.3-.5 1.5-1 .2-.5.2-.9.1-1Zm-5.5 7.1c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3.4.9.9-3.3-.2-.3a8.9 8.9 0 0 1 13.6-11 8.9 8.9 0 0 1-6.1 15.1Z" />
                  </svg>
                  Enviar por WhatsApp
                </button>
              </div>
            </form>
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

            <div className="mt-7 border-t border-line-soft pt-6">
              <p className="text-data mb-4 text-[11px] uppercase text-bone-faint">
                Síguenos
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex size-10 items-center justify-center border border-line bg-panel text-bone-faint transition-all duration-300 hover:border-ghost-red/50 hover:text-ghost-red hover:shadow-[0_0_12px_rgba(232,48,42,0.15)]"
                    aria-label={s.label}
                  >
                    {s.icon === "instagram" ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="5" />
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                        <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
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
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
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
      {error && (
        <p className="flex items-center gap-1.5 text-[12px] text-ghost-red">
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-3 shrink-0">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}