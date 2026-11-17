import { getAdvisory, whatsappUrl } from "./asesorias";
import { LINKS } from "./content";

const MESSAGE = "Hola, vengo por El empleado que no se cansa";

test("landing WhatsApp link reuses the site number and the funnel message", () => {
  expect(LINKS.whatsapp).toBe("https://wa.me/50684339541");
  expect(whatsappUrl(MESSAGE)).toBe(
    "https://wa.me/50684339541?text=Hola%2C%20vengo%20por%20El%20empleado%20que%20no%20se%20cansa"
  );
});

test("catalog prefill stays the longer advisory message", () => {
  const copy = getAdvisory("el-empleado-que-no-se-cansa")!.es;
  expect(copy.whatsappMessage).toContain("me interesa la asesoría");
  expect(copy.whatsappMessage).not.toBe(MESSAGE);
});
