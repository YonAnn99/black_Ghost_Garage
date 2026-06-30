"use client";

import { useEffect, useRef, useState } from "react";

interface GoogleMapProps {
  apiKey: string;
}

declare global {
  interface Window {
    initMap?: () => void;
    google?: {
      maps?: {
        Map: new (element: HTMLElement, options: object) => object;
        Marker: new (options: object) => object;
        LatLngLiteral: { lat: number; lng: number };
      };
    };
  }
}

export default function GoogleMap({ apiKey }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!mapRef.current || !apiKey) {
      setError(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = () => {
      if (!mapRef.current || !window.google?.maps) {
        setError(true);
        return;
      }

      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 19.3985, lng: -99.0283 },
          zoom: 15,
          disableDefaultUI: true,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          gestureHandling: "cooperative",
          styles: [
            { elementType: "geometry", stylers: [{ color: "#212121" }] },
            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
            { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
            { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
            { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
            { featureType: "poi", elementType: "geometry", stylers: [{ color: "#282828" }] },
            { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
            { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
            { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
            { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#373737" }] },
            { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c3c3c" }] },
            { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
            { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
            { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] },
          ],
        });

        new window.google.maps.Marker({
          position: { lat: 19.3985, lng: -99.0283 },
          map,
          title: "Black Ghost's Garage",
          icon: {
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            fillColor: "#e8302a",
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 1.5,
          },
        });
      } catch {
        setError(true);
      }
    };

    script.onerror = () => setError(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  if (error) {
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

  return <div ref={mapRef} className="h-full min-h-[300px] w-full" />;
}
