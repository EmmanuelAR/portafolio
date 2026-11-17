import { personJsonLd, portafolioMeta } from "./meta";

test("spanish portfolio title says fundador e ingeniero de software", () => {
  expect(portafolioMeta.es.title).toContain("fundador e ingeniero de software");
  expect(portafolioMeta.es.title.toLowerCase()).not.toContain("founder");
  expect(portafolioMeta.en.title.toLowerCase()).toContain("founder & software engineer");
});

test("person metadata uses a spanish role when the page is spanish", () => {
  expect(personJsonLd("es").jobTitle).toBe("Fundador e ingeniero de software");
  expect(personJsonLd("es").jobTitle.toLowerCase()).not.toContain("founder");
  expect(personJsonLd("en").jobTitle).toBe("Founder & Software Engineer");
  expect(personJsonLd("es").description).toBe(portafolioMeta.es.description);
  expect(personJsonLd("en").description).toBe(portafolioMeta.en.description);
});
