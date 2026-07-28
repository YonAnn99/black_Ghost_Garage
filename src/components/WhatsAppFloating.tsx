"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type FormValues = {
  nombre: string;
  telefono: string;
  vehiculo: string;
  anio: string;
  descripcion: string;
  privacidad: boolean;
};

export default function WhatsAppFloating() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [offset, setOffset] = useState(0);
  const [values, setValues] = useState<FormValues>({
    nombre: "",
    telefono: "",
    vehiculo: "",
    anio: "",
    descripcion: "",
    privacidad: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = document.getElementById("contacto");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = typeof document !== "undefined"
        ? document.documentElement.scrollHeight - window.innerHeight
        : 1;
      const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setOffset((ratio - 0.5) * 50);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const validate = useCallback((v: FormValues) => {
    const e: Partial<Record<keyof FormValues, string>> = {};
    if (!v.nombre.trim()) e.nombre = "Requerido";
    if (!v.telefono.trim()) e.telefono = "Requerido";
    else if (!/^\d{10}$/.test(v.telefono.replace(/\s/g, "")))
      e.telefono = "10 dígitos";
    if (!v.vehiculo.trim()) e.vehiculo = "Requerido";
    if (!v.descripcion.trim()) e.descripcion = "Requerido";
    else if (v.descripcion.trim().length < 10)
      e.descripcion = "Mín. 10 caracteres";
    if (!v.privacidad) e.privacidad = "Debes aceptar el Aviso de Privacidad.";
    return e;
  }, []);

  const handleChange = useCallback(
    (field: keyof FormValues, value: string | boolean) => {
      setValues((prev) => {
        const next = { ...prev, [field]: value };
        setErrors(validate(next));
        return next;
      });
    },
    [validate]
  );

  const handleSubmit = useCallback(() => {
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const message = `Hola Black Ghost's Garage 👋

Nombre: ${values.nombre.trim()}
Teléfono: ${values.telefono.trim()}
Vehículo: ${values.vehiculo.trim()}
Año: ${values.anio.trim() || "No especificado"}
Descripción: ${values.descripcion.trim()}

Solicito cita para diagnóstico.`;

    window.open(
      `https://wa.me/525635363577?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
    setValues({
      nombre: "",
      telefono: "",
      vehiculo: "",
      anio: "",
      descripcion: "",
      privacidad: false,
    });
  }, [values, validate]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div
      className="fixed bottom-6 left-6 z-50 transition-opacity duration-500 pointer-events-none"
      style={{
        opacity: hidden ? 0 : 1,
        transform: `translateY(${offset}px)`,
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      {/* Mini modal */}
      {open && (
        <div
          ref={modalRef}
          className="absolute bottom-full left-0 mb-3 w-72 border border-line bg-void/95 backdrop-blur-xl shadow-2xl shadow-black/40 animate-[rise-in_0.3s_var(--ease-out-expo)]"
        >
          <div className="border-b border-line px-5 py-3">
            <p className="text-data text-[10px] uppercase tracking-[0.12em] text-ghost-red">
              ◆ Agendar cita rápida
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col gap-3 p-5"
            noValidate
          >
            <MiniField label="Nombre" error={errors.nombre}>
              <input
                type="text"
                placeholder="Tu nombre"
                value={values.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                className="w-full border border-line bg-panel px-3 py-2 text-[13px] text-bone placeholder:text-bone-faint focus:border-ghost-red focus:outline-none transition-colors"
              />
            </MiniField>

            <MiniField label="Teléfono" error={errors.telefono}>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="10 dígitos"
                value={values.telefono}
                onChange={(e) => handleChange("telefono", e.target.value)}
                className="w-full border border-line bg-panel px-3 py-2 text-[13px] text-bone placeholder:text-bone-faint focus:border-ghost-red focus:outline-none transition-colors"
              />
            </MiniField>

            <MiniField label="Vehículo (marca/modelo/motor)" error={errors.vehiculo}>
              <input
                type="text"
                placeholder="Marca / modelo / motor"
                value={values.vehiculo}
                onChange={(e) => handleChange("vehiculo", e.target.value)}
                className="w-full border border-line bg-panel px-3 py-2 text-[13px] text-bone placeholder:text-bone-faint focus:border-ghost-red focus:outline-none transition-colors"
              />
            </MiniField>

            <MiniField label="Año">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Ej. 2023"
                value={values.anio}
                onChange={(e) => handleChange("anio", e.target.value)}
                className="w-full border border-line bg-panel px-3 py-2 text-[13px] text-bone placeholder:text-bone-faint focus:border-ghost-red focus:outline-none transition-colors"
              />
            </MiniField>

            <MiniField label="Descripción del servicio, falla o modificación" error={errors.descripcion}>
              <textarea
                rows={3}
                placeholder="Describe el servicio, falla o modificación…"
                value={values.descripcion}
                onChange={(e) => handleChange("descripcion", e.target.value)}
                className="w-full resize-none border border-line bg-panel px-3 py-2 text-[13px] text-bone placeholder:text-bone-faint focus:border-ghost-red focus:outline-none transition-colors"
              />
            </MiniField>

            <div className="flex flex-col gap-1.5">
              <label className="flex cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  checked={values.privacidad}
                  onChange={(e) => handleChange("privacidad", e.target.checked)}
                  className="mt-0.5 size-3.5 shrink-0 border border-line bg-panel accent-ghost-red"
                />
                <span className="text-[11px] leading-relaxed text-bone-dim">
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
              {errors.privacidad && (
                <p className="text-[10px] text-ghost-red">{errors.privacidad}</p>
              )}
            </div>

            <button
              type="submit"
              className="text-data mt-1 inline-flex items-center justify-center gap-2 bg-[#25D366] px-4 py-2.5 text-[11px] uppercase text-void transition-colors hover:bg-[#20ba5a]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-1.4-.6-2.4-1.4-3.2-2.8-.1-.2-.1-.4.1-.5.2-.2.5-.5.6-.7.1-.2 0-.4 0-.6-.1-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.2.3-.9 1-.9 2.3 0 1.3 1 2.6 1.1 2.8.1.2 1.7 2.7 4.2 3.7 2 .8 2.4.6 2.8.6.4 0 1.3-.5 1.5-1 .2-.5.2-.9.1-1Zm-5.5 7.1c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3.4.9.9-3.3-.2-.3a8.9 8.9 0 0 1 13.6-11 8.9 8.9 0 0 1-6.1 15.1Z" />
              </svg>
              Enviar por WhatsApp
            </button>
          </form>
        </div>
      )}

      {/* FAB button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar formulario" : "Abrir formulario de WhatsApp"}
        className="btn-press group relative flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:scale-105 hover:shadow-[#25D366]/30"
      >
        <span className="absolute inset-0 rounded-full animate-[pulse-ring_2s_ease-out_infinite] bg-[#25D366]/30" aria-hidden="true" />
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="relative size-6 text-void"
        >
          <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-1.4-.6-2.4-1.4-3.2-2.8-.1-.2-.1-.4.1-.5.2-.2.5-.5.6-.7.1-.2 0-.4 0-.6-.1-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.2.3-.9 1-.9 2.3 0 1.3 1 2.6 1.1 2.8.1.2 1.7 2.7 4.2 3.7 2 .8 2.4.6 2.8.6.4 0 1.3-.5 1.5-1 .2-.5.2-.9.1-1Zm-5.5 7.1c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3.4.9.9-3.3-.2-.3a8.9 8.9 0 0 1 13.6-11 8.9 8.9 0 0 1-6.1 15.1Z" />
        </svg>
      </button>
    </div>
  );
}

function MiniField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-data text-[9px] uppercase tracking-[0.1em] text-bone-faint">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[10px] text-ghost-red">{error}</p>
      )}
    </div>
  );
}
