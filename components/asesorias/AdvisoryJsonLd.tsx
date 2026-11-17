import { faqPageJsonLd, serviceJsonLd } from "@/lib/advisorySchema";
import type { Lang } from "@/lib/i18n";

export default function AdvisoryJsonLd({ slug, lang }: { slug: string; lang: Lang }) {
  const blocks = [serviceJsonLd(slug, lang), faqPageJsonLd(slug, lang)].filter(
    (block): block is NonNullable<typeof block> => block !== null
  );
  return (
    <>
      {blocks.map((block) => (
        <script
          key={block["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
