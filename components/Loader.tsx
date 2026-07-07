"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 900);
    const goneTimer = setTimeout(() => setGone(true), 1200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
    };
  }, []);
  if (gone) return null;
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-300 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <p className="text-xl tracking-widest">
        &gt;_ loading
        <span style={{ animation: "loaderPulse 1s infinite" }}>...</span>
      </p>
    </div>
  );
}
