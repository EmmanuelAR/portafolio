export type MetaEvent = "PageView" | "ViewContent" | "Contact";

const NUMERIC_ID = /^\d+$/;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Pixel id from the environment. Empty or non-numeric values disable the pixel. */
export function metaPixelId(): string | null {
  const raw = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";
  return NUMERIC_ID.test(raw) ? raw : null;
}

/** Forward a standard event. No-op when the pixel id is unset or fbq is missing. */
export function trackMeta(event: MetaEvent): void {
  if (!metaPixelId()) return;
  if (typeof window === "undefined") return;
  window.fbq?.("track", event);
}

/**
 * Official pixel bootstrap: stub, init, and the first PageView.
 * The id is interpolated only after it is known to be digits.
 */
export function pixelBootstrap(id: string): string {
  if (!NUMERIC_ID.test(id)) {
    throw new Error("Meta Pixel id must be numeric");
  }
  return `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${id}');
fbq('track', 'PageView');`;
}
