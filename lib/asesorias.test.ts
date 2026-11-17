import { getAdvisory, landingCopy, whatsappUrl } from "./asesorias";
import { LINKS } from "./content";

const MESSAGE = "Hola, vengo por El empleado que no se cansa";

test("landing WhatsApp link reuses the site number and the funnel message", () => {
  expect(LINKS.whatsapp).toBe("https://wa.me/50684339541");
  expect(whatsappUrl(MESSAGE)).toBe(
    "https://wa.me/50684339541?text=Hola%2C%20vengo%20por%20El%20empleado%20que%20no%20se%20cansa"
  );
});

test("landing promise uses the same 90 minutes and 7 days as Detalle", () => {
  const es = getAdvisory("el-empleado-que-no-se-cansa")!.es;
  const en = getAdvisory("el-empleado-que-no-se-cansa")!.en;
  expect(es.duration).toContain("90");
  expect(es.deliverables.some((item) => item.includes("7 días"))).toBe(true);
  expect(es.about).toContain("Tiempo para tus preguntas");
  expect(es.about).not.toContain("Preguntas");
  expect(landingCopy.es.promise).toBe(
    "En unos 90 minutos salís con tu primera tarea funcionando en Grok Bot, y 7 días para dudas mientras la afinamos."
  );
  expect(en.duration).toContain("90");
  expect(en.deliverables.some((item) => item.includes("7 days"))).toBe(true);
  expect(en.about).toContain("Time for your questions");
  expect(landingCopy.en.promise).toContain("90");
  expect(landingCopy.en.promise).toContain("7 days");
});

test("catalog prefill stays the longer advisory message", () => {
  const copy = getAdvisory("el-empleado-que-no-se-cansa")!.es;
  expect(copy.whatsappMessage).toContain("me interesa la asesoría");
  expect(copy.whatsappMessage).not.toBe(MESSAGE);
});
