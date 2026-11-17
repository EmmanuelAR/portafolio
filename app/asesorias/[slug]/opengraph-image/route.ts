import { getAdvisory } from "@/lib/asesorias";
import { langFromRequest, renderLandingOg } from "@/lib/ogImage";

export async function GET(request: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  if (!getAdvisory(slug)) return new Response("Not found", { status: 404 });
  return renderLandingOg(langFromRequest(request));
}
