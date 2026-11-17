"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { metaPixelId, trackMeta } from "@/lib/metaPixel";

/**
 * PageView on client navigations. The bootstrap snippet already sends the
 * first PageView, and it does not run again when the layout stays mounted.
 */
export default function MetaPixelPageViews() {
  const pathname = usePathname();
  const skipInitial = useRef(true);

  useEffect(() => {
    if (!metaPixelId()) return;
    if (skipInitial.current) {
      skipInitial.current = false;
      return;
    }
    trackMeta("PageView");
  }, [pathname]);

  return null;
}
