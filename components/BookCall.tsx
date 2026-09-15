"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { useLang } from "@/lib/i18n";
import { content, CAL_LINK } from "@/lib/content";
import { useMagnetic } from "@/lib/useMagnetic";

export default function BookCall({
  className = "btn btn-primary",
  label,
}: {
  className?: string;
  label?: string;
}) {
  const { lang } = useLang();
  const c = content[lang];
  const ref = useMagnetic<HTMLButtonElement>(6);

  useEffect(() => {
    if (!CAL_LINK) return;
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  if (!CAL_LINK) return null;

  return (
    <button
      ref={ref}
      className={className}
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
    >
      {label ?? c.cta.book}
      <span aria-hidden>→</span>
    </button>
  );
}
