import Home from "@/components/Home";
import { getContributions } from "@/lib/github";

export default async function Page() {
  const contributions = await getContributions("EmmanuelAR");
  return <Home contributions={contributions} />;
}
