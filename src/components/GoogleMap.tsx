"use client";

export default function GoogleMap() {
  return (
    <iframe
      src="https://maps.google.com/maps?q=Black+Ghost's+Garage+Nezahualcóyotl+Oxtotipac+México&t=&z=15&ie=UTF8&iwloc=&output=embed"
      width="100%"
      height="100%"
      style={{ border: 0, filter: "grayscale(1) contrast(1.1) brightness(0.6) sepia(0.3)" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Ubicación del taller — Black Ghost's Garage"
      className="absolute inset-0"
    />
  );
}
