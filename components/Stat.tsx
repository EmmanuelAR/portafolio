/**
 * Inline mono metrics separated by dots — replaces the old bordered chips.
 */
export function Metrics({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <p className={`font-mono text-xs leading-relaxed tracking-wide text-ink/60 ${className}`}>
      {items.map((s, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2 text-ink/25">·</span>}
          {s}
        </span>
      ))}
    </p>
  );
}
