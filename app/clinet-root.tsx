// app/client-root.tsx
'use client';

import React, { useRef } from 'react';
import Crosshair from "@/components/Crosshair";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef}>
      <Crosshair  color="#ffffff" />
      {children}
    </div>
  );
}
