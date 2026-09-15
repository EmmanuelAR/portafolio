import type { ReactNode } from "react";

/**
 * Editorial section: sticky mono label on the left, content on the right,
 * hairline on top. Gutters match the nav / hero / talk / footer shell.
 */
export default function Section({
  id,
  index,
  label,
  children,
  className = "",
}: {
  id?: string;
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-ink/10 scroll-mt-20 ${className}`}>
      <div className="shell grid gap-y-6 py-16 sm:py-24 md:grid-cols-[minmax(9rem,12rem)_minmax(0,1fr)] md:gap-x-12 md:py-28">
        <div className="md:sticky md:top-24 md:self-start">
          <p className="mono-label" data-reveal>
            <span className="text-ink/35">{index}</span>
            <span className="mx-2 text-ink/25">—</span>
            {label}
          </p>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
