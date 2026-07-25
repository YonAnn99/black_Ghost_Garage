"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const hasPlayedRef = useRef(false);

  const unmuteAndPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || hasPlayedRef.current) return;

    hasPlayedRef.current = true;
    audio.muted = false;
    audio.play().catch((err) => console.warn("Audio play failed:", err));
    setIsMuted(false);
  }, []);

  useEffect(() => {
    const handleInteraction = () => {
      unmuteAndPlay();
    };

    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, [unmuteAndPlay]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasPlayedRef.current) {
      hasPlayedRef.current = true;
      audio.muted = false;
      audio.play().catch((err) => console.warn("Audio play failed:", err));
      setIsMuted(false);
      return;
    }

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <>
      <audio ref={audioRef} loop muted playsInline preload="metadata">
        <source src="/bgm.webm" type="audio/webm" />
        <source src="/bgm.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 flex size-10 items-center justify-center border border-ghost-red/20 bg-void/80 text-bone-faint/40 backdrop-blur-sm transition-all duration-300 hover:border-ghost-red/50 hover:text-ghost-red/70 hover:shadow-[0_0_12px_rgba(232,48,42,0.15)]"
        aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
      >
        {isMuted ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
    </>
  );
}