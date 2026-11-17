import { landingOgLines, ogCard } from "./ogCopy";

test("home open graph copy is spanish by default and english on lang=en", () => {
  expect(ogCard("home", "es").lines.map((line) => line.text)).toEqual([
    "hola. soy emmanuel.",
    "construyo productos.",
  ]);
  expect(ogCard("home", "en").lines.map((line) => line.text)).toEqual([
    "hi. i'm emmanuel.",
    "i build products.",
  ]);
  expect(ogCard("home", "es").lines[1].highlight).toBe("productos.");
  expect(ogCard("home", "en").lines[1].highlight).toBe("products.");
});

test("asesorias and portfolio cards switch language and avoid brand bans", () => {
  const catalog = ogCard("asesorias", "en");
  expect(catalog.lines.map((line) => line.text).join(" ")).toMatch(/employee/i);
  expect(catalog.footer.toLowerCase()).toContain("consulting");
  expect(catalog.footer.toLowerCase()).not.toContain("advisories");

  const portfolio = ogCard("portafolio", "es");
  expect(portfolio.lines.map((line) => line.text).join(" ")).toContain("fundador");
  expect(portfolio.lines.map((line) => line.text).join(" ").toLowerCase()).not.toContain("founder");
  expect(ogCard("portafolio", "en").lines.map((line) => line.text).join(" ")).toMatch(/software engineer/i);

  for (const kind of ["home", "portafolio", "asesorias"] as const) {
    for (const lang of ["es", "en"] as const) {
      const card = ogCard(kind, lang);
      const blob = JSON.stringify(card).toLowerCase();
      expect(blob).not.toMatch(/spacex|oficial|official|\$\s?\d|usd|₡/);
    }
  }
});

test("landing title wraps so the subtitle is not on the same line as cansa", () => {
  const es = landingOgLines("es");
  expect(es.titleLines).toEqual(["El empleado", "que no se cansa"]);
  expect(es.tagline).toBe("Asesoría de automatización para emprendedores");
  expect(es.titleLines.some((line) => line.includes("cansa") && line.includes(es.tagline))).toBe(
    false
  );
  expect(es.titleLines.every((line) => line.length <= 22)).toBe(true);

  const en = landingOgLines("en");
  expect(en.titleLines).toEqual(["The employee", "who never gets tired"]);
  expect(en.tagline.toLowerCase()).not.toContain("asesoría");
  expect(en.titleLines.every((line) => line.length <= 22)).toBe(true);
  expect(en.footer.toLowerCase()).not.toMatch(/spacex|\$\s?\d/);
});
