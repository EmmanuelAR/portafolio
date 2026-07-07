"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { useLang } from "@/lib/i18n";
import { content, CAL_LINK } from "@/lib/content";

export default function BookCall({ className }: { className?: string }) {
  const { lang } = useLang();
  const c = content[lang];

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
      className={
        className ??
        "shrink-0 border border-black bg-black px-5 py-2.5 text-sm font-bold text-white hover:bg-white hover:text-black transition-colors"
      }
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
    >
      [ {c.hero.cta.book} ]
    </button>
  );
}
