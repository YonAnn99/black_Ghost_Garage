"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onCanPlay = () => setIsLoading(false);
    const onWaiting = () => {
      if (!hasPlayedRef.current) setIsLoading(true);
    };

    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("waiting", onWaiting);

    return () => {
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("waiting", onWaiting);
    };
  }, []);

  const startPlayback = () => {
    const audio = audioRef.current;
    if (!audio || hasPlayedRef.current) return;

    hasPlayedRef.current = true;
    setIsLoading(true);
    audio.muted = false;
    audio.play()
      .then(() => setIsMuted(false))
      .catch((err) => {
        console.warn("Audio play failed:", err);
        setIsLoading(false);
      });
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasPlayedRef.current) {
      startPlayback();
      return;
    }

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <>
      <audio ref={audioRef} loop muted playsInline preload="auto">
        <source src="/bgm.webm" type="audio/webm" />
        <source src="/bgm.mp3" type="audio/mpeg" />
      </audio>

      <div className="fixed bottom-6 right-6 z-50">
        <span
          className={`absolute inset-0 rounded-full border border-ghost-red/40 ${
            isMuted ? "animate-[pulse-ring_2s_ease-out_infinite]" : "hidden"
          }`}
          aria-hidden="true"
        />
        <button
          onClick={toggleMute}
          onTouchEnd={(e) => {
            e.preventDefault();
            toggleMute();
          }}
          className={`relative flex size-12 items-center justify-center border bg-void/90 backdrop-blur-sm transition-all duration-300 ${
            isMuted
              ? "border-ghost-red/40 text-bone-faint/60 hover:border-ghost-red/70 hover:text-ghost-red hover:shadow-[0_0_16px_rgba(232,48,42,0.2)]"
              : "border-ghost-red/20 text-ghost-red/70 hover:border-ghost-red/50 hover:text-ghost-red hover:shadow-[0_0_12px_rgba(232,48,42,0.15)]"
          }`}
          aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
        >
          {isLoading && !hasPlayedRef.current ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5 animate-spin"
            >
              <path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83" />
            </svg>
          ) : isMuted ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
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
              className="size-5"
            >
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
