"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1200);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity">
      <p className="text-xl tracking-widest">
        &gt;_ loading
        <span style={{ animation: "loaderPulse 1s infinite" }}>...</span>
      </p>
    </div>
  );
}
