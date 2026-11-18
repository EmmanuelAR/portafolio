import { act, fireEvent, render, screen } from "@testing-library/react";
import AdvisoryDetail from "./AdvisoryDetail";
import { routeAdvisories } from "@/lib/advisoryRouting";
import { getAdvisory } from "@/lib/asesorias";
import { personJsonLd } from "@/lib/meta";

const advisory = getAdvisory("el-empleado-que-no-se-cansa")!;
const WA =
  "https://wa.me/50684339541?text=Hola%2C%20vengo%20por%20El%20empleado%20que%20no%20se%20cansa";
const WA_EN =
  "https://wa.me/50684339541?text=Hi%2C%20I'm%20here%20for%20The%20employee%20who%20never%20gets%20tired";
const INSTAGRAM_POST = "https://www.instagram.com/p/Df3oZighBw8/";
const EMBED_SRC = "https://www.instagram.com/embed.js";
const REEL_POSTER = "/asesorias/reel-df3oZighBw8.jpg";
const REEL_ALT = /Miniatura del reel/;
const PIXEL_ID = "123456789012345";

type EmbedObserver = {
  callback: IntersectionObserverCallback;
};

function installIntersectionObserver() {
  const observers: EmbedObserver[] = [];
  class IO implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds = [];
    constructor(readonly callback: IntersectionObserverCallback) {
      observers.push(this);
    }
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  vi.stubGlobal("IntersectionObserver", IO);
  return observers;
}

function intersect(observer: EmbedObserver) {
  act(() => {
    observer.callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      observer as unknown as IntersectionObserver
    );
  });
}

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
  delete window.instgrm;
  document.querySelectorAll(`script[src="${EMBED_SRC}"]`).forEach((node) => node.remove());
  window.history.pushState({}, "", "/asesorias/el-empleado-que-no-se-cansa");
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test("spanish landing shows the promise, video, and only the WhatsApp CTA", () => {
  render(<AdvisoryDetail advisory={advisory} lang="es" />);

  const title = screen.getByRole("heading", { level: 1, name: "El empleado que no se cansa" });
  const promise = screen.getByText(
    "En unos 90 minutos salís con tu primera tarea funcionando en Grok Bot, y 7 días para dudas mientras la afinamos."
  );
  expect(document.querySelector("video")).toBeNull();
  const quote = document.querySelector("blockquote.instagram-media");
  expect(quote).not.toBeNull();
  expect(document.querySelectorAll("blockquote.instagram-media")).toHaveLength(1);
  expect(title.compareDocumentPosition(quote!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(quote).toHaveAttribute("data-instgrm-permalink", INSTAGRAM_POST);
  expect(quote).toHaveAttribute("data-instgrm-version", "14");
  const fallback = screen.getByRole("link", { name: "@ear.dev" });
  expect(quote!.parentElement!.parentElement).toContainElement(fallback);
  expect(quote).not.toContainElement(fallback);
  expect(fallback).toHaveAttribute("href", INSTAGRAM_POST);
  expect(fallback).toHaveAttribute("target", "_blank");
  expect(fallback).toHaveAttribute("rel", "noopener noreferrer");
  expect(fallback.className).not.toMatch(/\bbtn\b/);
  const reel = screen.getByRole("link", { name: "Ver el reel en Instagram" });
  expect(quote).toContainElement(reel);
  expect(reel).toHaveAttribute("href", INSTAGRAM_POST);
  expect(reel).toHaveAttribute("target", "_blank");
  expect(reel).toHaveAttribute("rel", "noopener noreferrer");
  expect(reel.className).not.toMatch(/\bbtn\b/);
  const poster = screen.getByRole("img", { name: REEL_ALT });
  expect(reel).toContainElement(poster);
  expect(decodeURIComponent(poster.getAttribute("src") ?? "")).toContain(REEL_POSTER);
  expect(reel.querySelector("svg")).not.toBeNull();
  const slot = quote!.parentElement;
  expect(slot?.className).toContain("min-h-[calc(100cqw*16/9)]");
  expect(slot?.parentElement?.className).toContain("mx-auto");
  expect(slot?.parentElement?.className).toContain("max-w-[540px]");
  expect(document.body.innerHTML).not.toMatch(/el-empleado-que-no-se-cansa\.(mp4|jpg)|video\/mp4/);
  expect(screen.queryByRole("link", { name: /Velo en Instagram|Watch it on Instagram/ })).not.toBeInTheDocument();
  expect(document.querySelector(`script[src="${EMBED_SRC}"]`)).toBeNull();

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
  follows(ctas[0], quote!);
  follows(quote!, about);
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
      "Soy Emmanuel Agüero, ingeniero de software y fundador en Costa Rica. Uso bots para automatizar mi propio negocio."
    )
  ).toBeInTheDocument();
  const photo = screen
    .getAllByRole("img", { name: "Emmanuel Agüero Rojas" })
    .find((img) => (img.getAttribute("src") ?? "").includes("emmanuel-asesoria"));
  expect(photo).toBeTruthy();
  expect(photo).toHaveClass("object-cover");
  expect(photo).toHaveClass("object-top");
  expect(document.body.textContent).toContain("No. Lo armamos juntos en la sesión.");
  expect(document.body.textContent).toContain(
    "Tu computadora y una cuenta de Grok Bot. Si no la tenés, te ayudo a crearla antes de la sesión."
  );
  expect(screen.getByText("¿La suscripción de Grok Bot está incluida?")).toBeInTheDocument();
  expect(document.body.textContent).toContain("No, se paga aparte, directo a la herramienta.");
  expect(document.querySelectorAll("details")).toHaveLength(3);
  expect(screen.getByText(/no está incluida en la sesión/)).toBeInTheDocument();
  expect(screen.queryByText(/esta propuesta/)).not.toBeInTheDocument();

  expect(document.querySelectorAll("a.btn")).toHaveLength(2);
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
    expect(cta).toHaveAttribute("href", WA_EN);
  }
  expect(screen.queryByRole("link", { name: /all consulting/i })).not.toBeInTheDocument();
  expect(screen.queryByText(/advisories/i)).not.toBeInTheDocument();
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
  expect(document.body.textContent).toContain(
    "Your computer and a Grok Bot account. If you don't have one, I'll help you set it up before the session."
  );
  expect(screen.getByText("Is the Grok Bot subscription included?")).toBeInTheDocument();
  expect(document.body.textContent).toContain("No, it's paid separately, directly to the tool.");
  expect(screen.getByText(/not included in the session/)).toBeInTheDocument();
  expect(document.querySelector("video")).toBeNull();
  const quote = document.querySelector("blockquote.instagram-media");
  expect(quote).toHaveAttribute("data-instgrm-permalink", INSTAGRAM_POST);
  const profile = screen.getByRole("link", { name: "@ear.dev" });
  expect(quote!.parentElement!.parentElement).toContainElement(profile);
  expect(profile).toHaveAttribute("href", INSTAGRAM_POST);
  const reel = screen.getByRole("link", { name: "Watch the reel on Instagram" });
  expect(quote).toContainElement(reel);
  expect(reel).toHaveAttribute("href", INSTAGRAM_POST);
  expect(reel).toHaveAttribute("target", "_blank");
  expect(reel).toHaveAttribute("rel", "noopener noreferrer");
  expect(reel.className).not.toMatch(/\bbtn\b/);
  expect(decodeURIComponent(screen.getByRole("img", { name: REEL_ALT }).getAttribute("src") ?? "")).toContain(
    REEL_POSTER
  );
  expect(screen.queryByRole("link", { name: /Velo en Instagram|Watch it on Instagram/ })).not.toBeInTheDocument();
  expect(document.querySelector(`script[src="${EMBED_SRC}"]`)).toBeNull();
});

test("instagram embed.js loads once when the reel scrolls into view and then processes", () => {
  const observers = installIntersectionObserver();
  const process = vi.fn();
  window.instgrm = { Embeds: { process } };

  const first = render(<AdvisoryDetail advisory={advisory} lang="es" />);
  expect(document.querySelector(`script[src="${EMBED_SRC}"]`)).toBeNull();
  expect(observers).toHaveLength(1);

  act(() => {
    observers[0].callback(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      observers[0] as unknown as IntersectionObserver
    );
  });
  expect(document.querySelector(`script[src="${EMBED_SRC}"]`)).toBeNull();

  intersect(observers[0]);
  const script = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SRC}"]`);
  expect(script).not.toBeNull();
  expect(script?.async).toBe(true);
  expect(process).not.toHaveBeenCalled();

  act(() => {
    script!.dispatchEvent(new Event("load"));
  });
  expect(process).toHaveBeenCalledTimes(1);
  first.unmount();

  const observersBefore = observers.length;
  render(<AdvisoryDetail advisory={advisory} lang="en" />);
  expect(observers.length).toBeGreaterThan(observersBefore);
  intersect(observers[observers.length - 1]);
  expect(document.querySelectorAll(`script[src="${EMBED_SRC}"]`)).toHaveLength(1);
  expect(process).toHaveBeenCalledTimes(2);
  expect(document.documentElement.innerHTML).not.toContain("connect.facebook.net");
  expect(document.body.innerHTML).not.toContain(PIXEL_ID);
});

test("reel poster stays in the blockquote after embed.js processes", () => {
  const observers = installIntersectionObserver();
  window.instgrm = { Embeds: { process: vi.fn() } };
  render(<AdvisoryDetail advisory={advisory} lang="es" />);

  intersect(observers[0]);
  const script = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SRC}"]`);
  act(() => {
    script!.dispatchEvent(new Event("load"));
  });

  const quote = document.querySelector("blockquote.instagram-media");
  const reel = screen.getByRole("link", { name: "Ver el reel en Instagram" });
  expect(quote).toContainElement(reel);
  expect(screen.getByRole("img", { name: REEL_ALT })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "@ear.dev" })).toBeInTheDocument();
  expect(document.querySelectorAll("a.btn")).toHaveLength(2);
});

test("person json-ld sameAs points instagram at ear.dev", () => {
  for (const lang of ["es", "en"] as const) {
    const data = personJsonLd(lang);
    expect(data.sameAs).toContain("https://www.instagram.com/ear.dev/");
    expect(data.sameAs.join(" ")).not.toContain("ear__rae");
    expect(JSON.stringify(data)).not.toContain("instagram.com/ear__rae");
  }
});

test("back link is hidden for one service and points at the list when another exists", () => {
  window.history.pushState({}, "", "/asesorias?lang=en");
  const { unmount } = render(
    <AdvisoryDetail
      advisory={advisory}
      lang="en"
      showBackLink={routeAdvisories([advisory]).showBackLink}
    />
  );
  expect(screen.queryByRole("link", { name: /all consulting/i })).not.toBeInTheDocument();
  unmount();

  render(
    <AdvisoryDetail
      advisory={advisory}
      lang="en"
      showBackLink={routeAdvisories([advisory, { slug: "otra-asesoria" }]).showBackLink}
    />
  );
  expect(screen.getByRole("link", { name: /all consulting/i })).toHaveAttribute(
    "href",
    "/asesorias?lang=en"
  );
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

test("landing headings are one h1, section labels as h2, and faq questions as h3", () => {
  render(<AdvisoryDetail advisory={advisory} lang="es" />);

  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "El empleado que no se cansa"
  );

  for (const label of [
    "El problema",
    "De qué trata",
    "Qué te vas a llevar",
    "Ejemplos de tareas",
    "Quién soy",
    "Detalle",
    "Preguntas frecuentes",
  ]) {
    const heading = screen.getByRole("heading", { level: 2, name: label });
    expect(heading.tagName).toBe("H2");
    expect(heading).toHaveClass("mono-label");
  }

  const questions = [
    "¿Necesito saber de tecnología?",
    "¿Qué necesito tener?",
    "¿La suscripción de Grok Bot está incluida?",
  ];
  const h3s = screen.getAllByRole("heading", { level: 3 });
  expect(h3s.map((node) => node.textContent)).toEqual(questions);
  for (const heading of h3s) {
    expect(heading.closest("summary")).not.toBeNull();
    expect(heading.closest("details")).not.toBeNull();
  }
  expect(document.querySelectorAll("details")).toHaveLength(3);
});
