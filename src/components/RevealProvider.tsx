"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

export default function RevealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  return <div ref={ref}>{children}</div>;
}
