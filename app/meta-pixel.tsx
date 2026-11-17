import Script from "next/script";
import { metaPixelId, pixelBootstrap } from "@/lib/metaPixel";

/** Site-wide pixel. Renders nothing unless NEXT_PUBLIC_META_PIXEL_ID is a numeric id. */
export default function MetaPixel() {
  const id = metaPixelId();
  if (!id) return null;
  return (
    <Script id="meta-pixel" strategy="beforeInteractive">
      {pixelBootstrap(id)}
    </Script>
  );
}
