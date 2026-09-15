import type { ReactNode } from "react";

/**
 * Renders brand highlight markup from content strings:
 *   ==word==        -> blue marker
 *   ==red:word==    -> red marker
 *   ==accent:word== -> orange text
 *
 * Marks carry `data-draw` so GSAP can animate them in when JS is present.
 */
const TOKEN = /==(?:(red|accent):)?(.+?)==/g;

export default function Marked({
  text,
  draw = true,
}: {
  text: string;
  draw?: boolean;
}) {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(TOKEN)) {
    const start = m.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    const kind = m[1];
    const cls =
      kind === "accent" ? "hl hl-accent" : kind === "red" ? "hl hl-red" : "hl";
    out.push(
      <mark
        key={i++}
        className={cls}
        data-draw={draw && kind !== "accent" ? "" : undefined}
      >
        {m[2]}
      </mark>
    );
    last = start + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
