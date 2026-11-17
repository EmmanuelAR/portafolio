import { langFromRequest, renderCardOg } from "@/lib/ogImage";

export async function GET(request: Request) {
  return renderCardOg("home", langFromRequest(request));
}
