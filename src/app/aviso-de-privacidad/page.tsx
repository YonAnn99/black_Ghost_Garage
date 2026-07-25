import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | Black Ghost's Garage",
  description:
    "Aviso de privacidad de Black Ghost's Garage. Conoce cómo tratamos y protegemos tus datos personales.",
};

export default function AvisoDePrivacidad() {
  return (
    <section className="relative bg-void py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <div className="reveal mb-14">
          <Link
            href="/"
            className="text-data mb-6 inline-flex items-center gap-2 text-[11px] uppercase text-bone-faint transition-colors hover:text-ghost-red"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Volver al sitio
          </Link>
          <h1 className="text-display mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-none text-bone">
            Aviso de Privacidad
          </h1>
          <p className="mt-4 text-[13px] text-bone-faint">
            Última actualización: julio 2026
          </p>
        </div>

        <div className="reveal space-y-8 text-[14px] leading-relaxed text-bone-dim" data-reveal-delay="100">
          <section>
            <h2 className="text-display mb-3 text-lg text-bone">
              1. Responsable de la protección de datos
            </h2>
            <p>
              <strong className="text-bone">Black Ghost&apos;s Garage</strong> es
              responsable del tratamiento de tus datos personales de conformidad
              con la Ley Federal de Protección de Datos Personales en Posesión de
              los Particulares (LFPDPPP).
            </p>
            <p className="mt-2">
              Contacto para ejercer tus derechos ARCO:{" "}
              <a
                href="mailto:contacto@blackghostsgarage.mx"
                className="text-ghost-red underline underline-offset-2 hover:text-bone"
              >
                contacto@blackghostsgarage.mx
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-display mb-3 text-lg text-bone">
              2. Datos personales que se recopilan
            </h2>
            <p>
              A través de nuestro formulario de contacto, recopilamos los
              siguientes datos personales:
            </p>
            <ul className="mt-3 list-none space-y-2 pl-0">
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 bg-ghost-red" />
                <span>
                  <strong className="text-bone">Nombre completo</strong> — para
                  identificarte y dirigirnos a ti de manera personalizada.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 bg-ghost-red" />
                <span>
                  <strong className="text-bone">Número telefónico</strong> — para
                  contactarte vía llamada o WhatsApp.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 bg-ghost-red" />
                <span>
                  <strong className="text-bone">Información del vehículo</strong>{" "}
                  (marca, modelo, año) — para entender el contexto de tu
                  solicitud.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 bg-ghost-red" />
                <span>
                  <strong className="text-bone">Descripción del servicio</strong>{" "}
                  — para brindarte una atención más precisa.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-display mb-3 text-lg text-bone">
              3. Finalidad del tratamiento
            </h2>
            <p>
              Tus datos personales serán utilizados exclusivamente para:
            </p>
            <ul className="mt-3 list-none space-y-2 pl-0">
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 bg-ghost-red" />
                <span>Contactarte vía WhatsApp o llamada telefónica.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 bg-ghost-red" />
                <span>Agendar una cita para diagnóstico o servicio.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 bg-ghost-red" />
                <span>
                  Brindar información sobre el servicio solicitado.
                </span>
              </li>
            </ul>
            <p className="mt-3">
              <strong className="text-bone">
                No se utilizan para fines publicitarios ni se comparten con
                terceros.
              </strong>
            </p>
          </section>

          <section>
            <h2 className="text-display mb-3 text-lg text-bone">
              4. No almacenamiento de datos
            </h2>
            <p>
              Tus datos personales{" "}
              <strong className="text-bone">
                no son almacenados en bases de datos
              </strong>
              , servidores ni sistemas de terceros. La información se envía
              directamente al taller a través de la plataforma WhatsApp, la cual
              opera bajo sus propias políticas de privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-display mb-3 text-lg text-bone">
              5. Derechos ARCO
            </h2>
            <p>
              En todo momento tienes derecho a ejercer tus derechos ARCO:
            </p>
            <ul className="mt-3 list-none space-y-2 pl-0">
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 bg-ghost-red" />
                <span>
                  <strong className="text-bone">Acceso</strong> — conocer qué
                  datos personales tenemos sobre ti.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 bg-ghost-red" />
                <span>
                  <strong className="text-bone">Rectificación</strong> — corregir
                  datos inexactos o incompletos.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 bg-ghost-red" />
                <span>
                  <strong className="text-bone">Cancelación</strong> — solicitar
                  la eliminación de tus datos cuando ya no sean necesarios.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 bg-ghost-red" />
                <span>
                  <strong className="text-bone">Oposición</strong> — oponerte al
                  tratamiento de tus datos para fines específicos.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-display mb-3 text-lg text-bone">
              6. Ejercicio de derechos
            </h2>
            <p>
              Para ejercer cualquiera de tus derechos ARCO, envía una solicitud
              a:
            </p>
            <div className="mt-3 border border-line bg-panel p-4">
              <p className="text-data text-[12px] uppercase text-bone-faint">
                Correo electrónico
              </p>
              <a
                href="mailto:contacto@blackghostsgarage.mx"
                className="mt-1 text-ghost-red underline underline-offset-2 hover:text-bone"
              >
                contacto@blackghostsgarage.mx
              </a>
            </div>
            <p className="mt-3">
              Debes incluir tu nombre completo, una descripción clara de lo que
              solicitas y una identificación oficial. Responderemos en un plazo
              máximo de 20 días hábiles.
            </p>
          </section>

          <section>
            <h2 className="text-display mb-3 text-lg text-bone">
              7. Cambios al aviso de privacidad
            </h2>
            <p>
              Black Ghost&apos;s Garage se reserva el derecho de modificar este
              aviso de privacidad en cualquier momento. Cualquier cambio será
              publicado en esta página y será efectivo a partir de su
              publicación.
            </p>
          </section>

          <section className="border-t border-line pt-8">
            <p className="text-data text-[11px] uppercase text-bone-faint">
              Black Ghost&apos;s Garage — Ciudad de México
            </p>
            <p className="mt-2 text-[12px] text-bone-dim">
              Este aviso de privacidad cumple con los principios de licitud,
              consentimiento, información, calidad, finalidad, lealtad,
              proporcionalidad y responsabilidad establecidos en la LFPDPPP.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}