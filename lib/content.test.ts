import { content, SKILLS, NAME } from "./content";

test("content has both languages with matching job counts", () => {
  expect(NAME).toContain("Emmanuel");
  expect(content.en.jobs.length).toBe(3);
  expect(content.es.jobs.length).toBe(3);
  expect(content.en.jobs[0].org).toBe(content.es.jobs[0].org);
  expect(SKILLS).toContain("Cairo");
  expect(SKILLS).toContain("Solidity");
});
