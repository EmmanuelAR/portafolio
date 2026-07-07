"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { useLang } from "@/lib/i18n";
import { content, CAL_LINK } from "@/lib/content";

export default function BookCall() {
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
      className="border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors"
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
    >
      [ {c.hero.cta.book} ]
    </button>
  );
}
