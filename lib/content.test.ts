import { content, SKILLS, NAME, BRAND, SOCIALS } from "./content";

test("content has both languages with matching structure", () => {
  expect(NAME).toContain("Emmanuel");
  expect(BRAND).toBe("ear.dev");
  expect(content.en.experience.jobs.length).toBe(4);
  expect(content.es.experience.jobs.length).toBe(4);
  expect(content.en.experience.jobs[0].org).toBe(content.es.experience.jobs[0].org);
  expect(content.en.work.ventures.map((v) => v.name)).toEqual(
    content.es.work.ventures.map((v) => v.name)
  );
  expect(content.en.work.ventures).toHaveLength(2);
  expect(SKILLS).toContain("Cairo");
  expect(SKILLS).toContain("Solidity");
  expect(SOCIALS.map((s) => s.label)).toEqual(["github", "linkedin", "x", "instagram"]);
  expect(content.en.about.paragraphs.length).toBe(2);
  expect(content.en.work.projects.length).toBe(2);
});

test("brand voice: hero copy is lowercase and founder-first", () => {
  for (const lang of ["en", "es"] as const) {
    const h = content[lang].hero;
    expect(h.greeting).toBe(h.greeting.toLowerCase());
    expect(h.headline).toMatch(/==.+==/);
    expect(JSON.stringify(content[lang])).not.toMatch(/full-time/i);
  }
});
