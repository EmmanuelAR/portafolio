import { routeAdvisories } from "@/lib/advisoryRouting";
import { getAdvisories } from "@/lib/asesorias";
import { langFromRequest, renderCardOg, renderLandingOg } from "@/lib/ogImage";

export async function GET(request: Request) {
  const lang = langFromRequest(request);
  if (routeAdvisories(getAdvisories()).index === "landing") {
    return renderLandingOg(lang);
  }
  return renderCardOg("asesorias", lang);
}
