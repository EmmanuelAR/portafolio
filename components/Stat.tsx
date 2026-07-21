import type { StatItem } from "@/lib/content";

/**
 * Big-number stat strip — bordered cells, mono numerals, tiny uppercase label.
 * Used in the hero to surface headline metrics ($95M/mo, etc.).
 */
export function StatStrip({
  items,
  className = "",
}: {
  items: StatItem[];
  className?: string;
}) {
  return (
    <dl
      className={`grid divide-x divide-black border border-black ${className}`}
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map((s, i) => (
        <div key={i} className="px-3 py-3 sm:px-4 sm:py-4">
          <dd className="text-lg font-bold leading-none sm:text-2xl">{s.value}</dd>
          <dt className="mt-1.5 text-[10px] uppercase leading-tight tracking-wider text-black/55">
            {s.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}

/**
 * Compact bracketed chips — one per metric. Used under each job/venture to
 * make numbers pop without the weight of a full stat strip.
 */
export function StatChips({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((s, i) => (
        <span
          key={i}
          className="border border-black/70 px-2 py-1 text-xs font-medium text-black/80"
        >
          {s}
        </span>
      ))}
    </div>
  );
}
