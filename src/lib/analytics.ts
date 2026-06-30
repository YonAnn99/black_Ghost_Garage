export function trackEvent(eventName: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;

  // Plausible custom events
  if (window.plausible) {
    window.plausible(eventName, { props });
  }

  // Fallback: console.log for development
  console.log(`[Analytics] ${eventName}`, props);
}

// Extend window for Plausible
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}
