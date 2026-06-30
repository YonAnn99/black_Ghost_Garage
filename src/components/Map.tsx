"use client";

import { useEffect, useRef } from "react";
import type L from "leaflet";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const init = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      const map = L.map(mapRef.current!, {
        center: [19.3985, -99.0283],
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);

      const redIcon = L.divIcon({
        html: `<svg viewBox="0 0 24 24" fill="#e8302a" style="width:32px;height:32px;filter:drop-shadow(0 2px 8px rgba(232,48,42,0.5))"><path d="M12 2c-4.2 0-7.5 3.3-7.5 7.5 0 5.6 6.3 11.5 7 12.1.3.3.7.3 1 0 .7-.6 7-6.5 7-12.1C19.5 5.3 16.2 2 12 2Zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z"/></svg>`,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      L.marker([19.3985, -99.0283], { icon: redIcon })
        .addTo(map)
        .bindPopup("<b>Black Ghost's Garage</b><br>Nezahualcóyotl, Oxtotipac");

      mapInstance.current = map;
    };

    init();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const openInGoogleMaps = () => {
    window.open(
      "https://maps.google.com/maps?q=Black+Ghost's+Garage+Nezahualcóyotl+Oxtotipac+México",
      "_blank"
    );
  };

  return (
    <div className="relative h-full min-h-[300px] w-full cursor-pointer" onClick={openInGoogleMaps}>
      <div ref={mapRef} className="h-full w-full" />
      <div className="absolute inset-x-0 bottom-0 z-[400] bg-gradient-to-t from-void via-void/80 to-transparent p-4">
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4 text-ghost-red"
          >
            <path d="M12 2c-4.2 0-7.5 3.3-7.5 7.5 0 5.6 6.3 11.5 7 12.1.3.3.7.3 1 0 .7-.6 7-6.5 7-12.1C19.5 5.3 16.2 2 12 2Zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z" />
          </svg>
          <span className="text-data-wide text-[10px] uppercase text-bone tracking-[0.1em]">
            Ver en Google Maps
          </span>
        </div>
      </div>
    </div>
  );
}
