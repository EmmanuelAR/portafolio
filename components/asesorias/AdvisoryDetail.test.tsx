import { fireEvent, render, screen } from "@testing-library/react";
import AdvisoryDetail from "./AdvisoryDetail";
import { getAdvisory } from "@/lib/asesorias";

const advisory = getAdvisory("el-empleado-que-no-se-cansa")!;
const WA =
  "https://wa.me/50684339541?text=Hola%2C%20vengo%20por%20El%20empleado%20que%20no%20se%20cansa";
const PIXEL_ID = "123456789012345";

function setNavigatorLanguage(language: string) {
  Object.defineProperty(navigator, "language", {
    configurable: true,
    get: () => language,
  });
}

function follows(before: Node, after: Node) {
  expect(before.compareDocumentPosition(after) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
}

beforeEach(() => {
  localStorage.clear();
  setNavigatorLanguage("en-US");
  delete process.env.NEXT_PUBLIC_META_PIXEL_ID;
  delete window.fbq;
  window.history.pushState({}, "", "/asesorias/el-empleado-que-no-se-cansa");
});

test("spanish landing shows the promise, video, and only the WhatsApp CTA", () => {
  render(<AdvisoryDetail advisory={advisory} lang="es" />);

  const title = screen.getByRole("heading", { level: 1, name: "El empleado que no se cansa" });
  const promise = screen.getByText(
    "En unos 90 minutos salís con tu primera tarea funcionando en Grok Bot, y 7 días para dudas mientras la afinamos."
  );
  const video = document.querySelector("video");
  expect(video).not.toBeNull();
  expect(title.compareDocumentPosition(video!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

  expect(video).toHaveAttribute("controls");
  expect(video).toHaveAttribute("playsinline");
  expect(video).toHaveAttribute("preload", "metadata");
  expect(video).toHaveAttribute("poster", "/asesorias/el-empleado-que-no-se-cansa-poster.jpg");
  expect(video).not.toHaveAttribute("autoplay");
  expect(video!.autoplay).toBe(false);
  expect(video!.className).toContain("max-h-[58svh]");
  expect(video!.querySelector("source")).toHaveAttribute(
    "src",
    "/asesorias/el-empleado-que-no-se-cansa.mp4"
  );
  expect(video!.querySelector("source")).toHaveAttribute("type", "video/mp4");

  const ctas = screen.getAllByRole("link", { name: "Escribime por WhatsApp" });
  expect(ctas).toHaveLength(2);
  for (const cta of ctas) {
    expect(cta).toHaveAttribute("href", WA);
    expect(cta).toHaveAttribute("target", "_blank");
  }

  const about = screen.getByText("De qué trata");
  const deliverables = screen.getByText("Qué te vas a llevar");
  const examples = screen.getByText("Ejemplos de tareas");
  const bio = screen.getByText("Quién soy");
  const detail = screen.getByText("Detalle");
  const faq = screen.getByText("¿Necesito saber de tecnología?");
  const disclaimer = screen.getByText(
    "Servicio independiente. No es un servicio oficial ni está afiliado a ninguna empresa."
  );

  follows(title, promise);
  follows(promise, ctas[0]);
  follows(ctas[0], video!);
  follows(video!, about);
  follows(about, deliverables);
  follows(deliverables, examples);
  follows(examples, bio);
  follows(bio, detail);
  follows(detail, faq);
  follows(faq, ctas[1]);
  follows(ctas[1], disclaimer);

  expect(screen.queryByText("Asesoría de automatización para emprendedores")).not.toBeInTheDocument();
  expect(screen.getByText("Tiempo para tus preguntas")).toBeInTheDocument();
  expect(screen.queryByText("Preguntas")).not.toBeInTheDocument();
  expect(screen.getByText("Contestar precios y horarios por WhatsApp")).toBeInTheDocument();
  expect(screen.getByText("Recordatorios de citas")).toBeInTheDocument();
  expect(screen.getByText("Publicar en redes")).toBeInTheDocument();
  expect(
    screen.getByText(
      "Soy Emmanuel Agüero, ingeniero de software y founder en Costa Rica. Uso bots para automatizar mi propio negocio."
    )
  ).toBeInTheDocument();
  const photo = screen
    .getAllByRole("img", { name: "Emmanuel Agüero Rojas" })
    .find((img) => (img.getAttribute("src") ?? "").includes("emmanuel-asesoria"));
  expect(photo).toBeTruthy();
  expect(photo).toHaveClass("object-cover");
  expect(photo).toHaveClass("object-top");
  expect(document.body.textContent).toContain("No. Lo armamos juntos en la sesión.");
  expect(document.body.textContent).toContain("Tu computadora y la cuenta de Grok Bot.");
  expect(document.querySelectorAll("details")).toHaveLength(2);

  expect(document.querySelectorAll("a.btn, button")).toHaveLength(2);
  expect(screen.getByText("Qué te vas a llevar")).toBeInTheDocument();
  expect(screen.getByText("Pago único · SINPE Móvil o transferencia")).toBeInTheDocument();
  expect(screen.getByText(/suscripción a Grok Bot/)).toBeInTheDocument();
  expect(screen.getByText(/datos sensibles/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/\$\s?\d|USD|\b₡|colones/i);
  expect(screen.queryByRole("link", { name: /book|agendar|email|correo/i })).not.toBeInTheDocument();
});

test("english keeps the same WhatsApp link and the translated landing", () => {
  window.history.pushState({}, "", "/asesorias/el-empleado-que-no-se-cansa?lang=en");
  render(<AdvisoryDetail advisory={advisory} lang="en" />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "The employee who never gets tired"
  );
  expect(
    screen.getByText(
      "In about 90 minutes you leave with your first task running in Grok Bot, and 7 days for questions while we tune it."
    )
  ).toBeInTheDocument();
  const ctas = screen.getAllByRole("link", { name: "Message me on WhatsApp" });
  expect(ctas).toHaveLength(2);
  for (const cta of ctas) {
    expect(cta).toHaveAttribute("href", WA);
  }
  expect(screen.queryByRole("link", { name: "Escribime por WhatsApp" })).not.toBeInTheDocument();
  expect(screen.queryByText("Asesoría de automatización para emprendedores")).not.toBeInTheDocument();
  expect(screen.getByText("Time for your questions")).toBeInTheDocument();
  expect(screen.queryByText("Q&A")).not.toBeInTheDocument();
  expect(screen.getByText("Example tasks")).toBeInTheDocument();
  expect(screen.getByText("Answer prices and hours on WhatsApp")).toBeInTheDocument();
  expect(screen.getByText("Appointment reminders")).toBeInTheDocument();
  expect(screen.getByText("Post on social media")).toBeInTheDocument();
  expect(screen.getByText("Who I am")).toBeInTheDocument();
  expect(
    screen.getByText(
      "I'm Emmanuel Agüero, a software engineer and founder in Costa Rica. I use bots to automate my own business."
    )
  ).toBeInTheDocument();
  expect(screen.getByText("Do I need to know about technology?")).toBeInTheDocument();
  expect(document.body.textContent).toContain("No. We set it up together in the session.");
  expect(document.body.textContent).toContain("Your computer and a Grok Bot account.");
  expect(document.querySelector("video")).not.toBeNull();
  expect(document.querySelector("video")).not.toHaveAttribute("autoplay");
});

test("WhatsApp clicks send Contact when the pixel id is set and do not cancel the link", () => {
  process.env.NEXT_PUBLIC_META_PIXEL_ID = PIXEL_ID;
  const fbq = vi.fn();
  window.fbq = fbq;
  render(<AdvisoryDetail advisory={advisory} lang="es" />);

  expect(fbq).toHaveBeenCalledWith("track", "ViewContent");

  const ctas = screen.getAllByRole("link", { name: "Escribime por WhatsApp" });
  expect(ctas).toHaveLength(2);
  for (const cta of ctas) {
    expect(cta).toHaveAttribute("href", WA);
    expect(fireEvent.click(cta)).toBe(true);
  }

  const contacts = fbq.mock.calls.filter((call) => call[0] === "track" && call[1] === "Contact");
  expect(contacts).toHaveLength(2);
});

test("pixel events are a no-op on the landing when NEXT_PUBLIC_META_PIXEL_ID is unset", () => {
  const fbq = vi.fn();
  window.fbq = fbq;
  render(<AdvisoryDetail advisory={advisory} lang="es" />);

  for (const cta of screen.getAllByRole("link", { name: "Escribime por WhatsApp" })) {
    expect(cta).toHaveAttribute("href", WA);
    expect(fireEvent.click(cta)).toBe(true);
  }

  expect(fbq).not.toHaveBeenCalled();
  expect(document.documentElement.innerHTML).not.toContain("connect.facebook.net");
});
