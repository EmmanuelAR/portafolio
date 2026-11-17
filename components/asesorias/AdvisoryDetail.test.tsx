import { render, screen } from "@testing-library/react";
import AdvisoryDetail from "./AdvisoryDetail";
import { getAdvisory } from "@/lib/asesorias";

const advisory = getAdvisory("el-empleado-que-no-se-cansa")!;
const WA =
  "https://wa.me/50684339541?text=Hola%2C%20vengo%20por%20El%20empleado%20que%20no%20se%20cansa";

function setNavigatorLanguage(language: string) {
  Object.defineProperty(navigator, "language", {
    configurable: true,
    get: () => language,
  });
}

beforeEach(() => {
  localStorage.clear();
  setNavigatorLanguage("en-US");
  window.history.pushState({}, "", "/asesorias/el-empleado-que-no-se-cansa");
});

test("spanish landing shows the video under the title and only the WhatsApp CTA", () => {
  render(<AdvisoryDetail advisory={advisory} lang="es" />);

  const title = screen.getByRole("heading", { level: 1, name: "El empleado que no se cansa" });
  const video = document.querySelector("video");
  expect(video).not.toBeNull();
  expect(title.compareDocumentPosition(video!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

  expect(video).toHaveAttribute("controls");
  expect(video).toHaveAttribute("playsinline");
  expect(video).toHaveAttribute("preload", "metadata");
  expect(video).toHaveAttribute("poster", "/asesorias/el-empleado-que-no-se-cansa-poster.jpg");
  expect(video).not.toHaveAttribute("autoplay");
  expect(video!.autoplay).toBe(false);
  expect(video!.querySelector("source")).toHaveAttribute(
    "src",
    "/asesorias/el-empleado-que-no-se-cansa.mp4"
  );
  expect(video!.querySelector("source")).toHaveAttribute("type", "video/mp4");

  const ctas = screen.getAllByRole("link", { name: "Escribime por WhatsApp" });
  expect(ctas).toHaveLength(2);
  for (const cta of ctas) {
    expect(cta).toHaveAttribute("href", WA);
  }

  const about = screen.getByText("De qué trata");
  const detail = screen.getByText("Detalle");
  const disclaimer = screen.getByText(
    "Servicio independiente. No es un servicio oficial ni está afiliado a ninguna empresa."
  );
  expect(video!.compareDocumentPosition(ctas[0]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(ctas[0].compareDocumentPosition(about) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(detail.compareDocumentPosition(ctas[1]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(ctas[1].compareDocumentPosition(disclaimer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

  expect(document.querySelectorAll("a.btn, button")).toHaveLength(2);
  expect(screen.getByText("Qué te vas a llevar")).toBeInTheDocument();
  expect(screen.getByText("Pago único · SINPE Móvil o transferencia")).toBeInTheDocument();
  expect(screen.getByText(/suscripción a Grok Bot/)).toBeInTheDocument();
  expect(screen.getByText(/datos sensibles/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/\$\s?\d|USD|\b₡|colones/i);
  expect(screen.queryByRole("link", { name: /book|agendar|email|correo/i })).not.toBeInTheDocument();
});

test("english keeps the same WhatsApp link and may use an english label", () => {
  window.history.pushState({}, "", "/asesorias/el-empleado-que-no-se-cansa?lang=en");
  render(<AdvisoryDetail advisory={advisory} lang="en" />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "The employee who never gets tired"
  );
  const ctas = screen.getAllByRole("link", { name: "Message me on WhatsApp" });
  expect(ctas).toHaveLength(2);
  for (const cta of ctas) {
    expect(cta).toHaveAttribute("href", WA);
  }
  expect(screen.queryByRole("link", { name: "Escribime por WhatsApp" })).not.toBeInTheDocument();
  expect(document.querySelector("video")).not.toBeNull();
});
