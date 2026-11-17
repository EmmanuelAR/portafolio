import { asesoriasUi, getAdvisory, landingCopy, landingWhatsappMessage, whatsappUrl } from "./asesorias";
import { LINKS } from "./content";

const MESSAGE = "Hola, vengo por El empleado que no se cansa";
const MESSAGE_EN = "Hi, I'm here for The employee who never gets tired";

test("landing WhatsApp link reuses the site number and the funnel message", () => {
  expect(LINKS.whatsapp).toBe("https://wa.me/50684339541");
  expect(landingWhatsappMessage("es")).toBe(MESSAGE);
  expect(whatsappUrl(MESSAGE)).toBe(
    "https://wa.me/50684339541?text=Hola%2C%20vengo%20por%20El%20empleado%20que%20no%20se%20cansa"
  );
  expect(landingWhatsappMessage("en")).toBe(MESSAGE_EN);
  expect(whatsappUrl(MESSAGE_EN)).toBe(
    "https://wa.me/50684339541?text=Hi%2C%20I'm%20here%20for%20The%20employee%20who%20never%20gets%20tired"
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

test("spanish bio says fundador and the subscription note says sesión", () => {
  expect(landingCopy.es.bio).toBe(
    "Soy Emmanuel Agüero, ingeniero de software y fundador en Costa Rica. Uso bots para automatizar mi propio negocio."
  );
  expect(landingCopy.en.bio).toBe(
    "I'm Emmanuel Agüero, a software engineer and founder in Costa Rica. I use bots to automate my own business."
  );
  const es = getAdvisory("el-empleado-que-no-se-cansa")!.es;
  const en = getAdvisory("el-empleado-que-no-se-cansa")!.en;
  expect(es.disclaimers[1]).toBe(
    "La suscripción a Grok Bot es un pago mensual aparte, que se paga directamente a la herramienta, y no está incluida en la sesión."
  );
  expect(en.disclaimers[1]).toBe(
    "A Grok Bot subscription is a separate monthly fee paid directly to the tool and is not included in the session."
  );
  expect(es.disclaimers[0]).toContain("oficial");
  expect(es.payment).toBe("Pago único · SINPE Móvil o transferencia");
});

test("landing FAQ has three questions with the session account copy", () => {
  expect(landingCopy.es.faq).toEqual([
    {
      question: "¿Necesito saber de tecnología?",
      answer: "No. Lo armamos juntos en la sesión.",
    },
    {
      question: "¿Qué necesito tener?",
      answer:
        "Tu computadora y una cuenta de Grok Bot. Si no la tenés, te ayudo a crearla antes de la sesión.",
    },
    {
      question: "¿La suscripción de Grok Bot está incluida?",
      answer: "No, se paga aparte, directo a la herramienta.",
    },
  ]);
  expect(landingCopy.en.faq).toEqual([
    {
      question: "Do I need to know about technology?",
      answer: "No. We set it up together in the session.",
    },
    {
      question: "What do I need to have?",
      answer:
        "Your computer and a Grok Bot account. If you don't have one, I'll help you set it up before the session.",
    },
    {
      question: "Is the Grok Bot subscription included?",
      answer: "No, it's paid separately, directly to the tool.",
    },
  ]);
});

test("english back link says consulting, not advisories", () => {
  expect(asesoriasUi.en.backToList).toBe("all consulting");
  expect(asesoriasUi.en.backToList.toLowerCase()).not.toContain("advisories");
  expect(asesoriasUi.es.backToList).toBe("todas las asesorías");
});
