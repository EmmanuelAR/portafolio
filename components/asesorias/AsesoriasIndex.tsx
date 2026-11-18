import { routeAdvisories } from "@/lib/advisoryRouting";
import type { Advisory } from "@/lib/asesorias";
import type { Lang } from "@/lib/i18n";
import AdvisoryDetail from "./AdvisoryDetail";
import AdvisoryJsonLd from "./AdvisoryJsonLd";
import AdvisoryList from "./AdvisoryList";

/**
 * One service: its landing. Several: the catalog. Hub-only sales copy is left
 * off the single landing because the promise, session, and examples already
 * cover it.
 */
export default function AsesoriasIndex({
  lang,
  advisories,
}: {
  lang: Lang;
  advisories: Advisory[];
}) {
  const route = routeAdvisories(advisories);
  if (route.index === "landing") {
    const advisory = advisories[0];
    if (advisory) {
      return (
        <>
          <AdvisoryJsonLd slug={advisory.slug} lang={lang} />
          <AdvisoryDetail advisory={advisory} lang={lang} showBackLink={route.showBackLink} />
        </>
      );
    }
  }

  return <AdvisoryList lang={lang} advisories={advisories} />;
}
