"use client";

import { useState } from "react";

interface GoogleMapProps {
  apiKey: string;
}

export default function GoogleMap({ apiKey }: GoogleMapProps) {
  const [iframeError, setIframeError] = useState(false);

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Black+Ghost's+Garage,Nezahualcóyotl,Oxtotipac,México&zoom=15&maptype=satellite`;

  if (iframeError || !apiKey) {
    return (
      <a
        href="https://maps.google.com/maps?q=Black+Ghost's+Garage+Nezahualcóyotl+Oxtotipac+México"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full min-h-[300px] items-center justify-center border border-line bg-panel p-6 text-center transition-colors duration-300 hover:border-ghost-red/50"
      >
        <div>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mx-auto mb-3 size-8 text-ghost-red/50"
          >
            <path d="M12 2c-4.2 0-7.5 3.3-7.5 7.5 0 5.6 6.3 11.5 7 12.1.3.3.7.3 1 0 .7-.6 7-6.5 7-12.1C19.5 5.3 16.2 2 12 2Zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z" />
          </svg>
          <p className="text-data-wide text-[11px] uppercase text-bone-dim tracking-[0.1em]">
            Ver ubicación en Google Maps
          </p>
        </div>
      </a>
    );
  }

  return (
    <iframe
      src={mapUrl}
      width="100%"
      height="100%"
      style={{ border: 0, filter: "grayscale(1) contrast(1.1) brightness(0.6) sepia(0.3)" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Ubicación del taller — Black Ghost's Garage"
      className="absolute inset-0"
      onError={() => setIframeError(true)}
    />
  );
}
