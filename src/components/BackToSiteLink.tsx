"use client";

import React from "react";

export default function BackToSiteLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href="/"
      onClick={() => {
        window.close();
      }}
      className={className}
    >
      {children}
    </a>
  );
}
