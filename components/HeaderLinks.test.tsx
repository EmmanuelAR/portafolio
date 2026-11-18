import type { ReactElement } from "react";
import { act, render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n";
import { getAdvisory } from "@/lib/asesorias";
import HeaderLinks from "./HeaderLinks";
import Hub from "./Hub";
import Home from "./Home";
import AdvisoryList from "./asesorias/AdvisoryList";
import AdvisoryDetail from "./asesorias/AdvisoryDetail";

const emptyContributions = { total: 0, weeks: [] };

function renderLinks(lang: "en" | "es" = "es") {
  return render(
    <LanguageProvider initialLang={lang}>
      <nav>
        <HeaderLinks />
      </nav>
    </LanguageProvider>
  );
}

function setEnglishBrowser() {
  Object.defineProperty(navigator, "language", {
    configurable: true,
    get: () => "en-US",
  });
}

beforeEach(() => {
  window.history.pushState({}, "", "/");
  document.documentElement.lang = "";
});

test("spanish menu places asesorías before portafolio as real anchors", () => {
  renderLinks("es");

  const asesorias = screen.getByRole("link", { name: "asesorías" });
  const portafolio = screen.getByRole("link", { name: "portafolio" });

  expect(asesorias.tagName).toBe("A");
  expect(portafolio.tagName).toBe("A");
  expect(asesorias).toHaveAttribute("href", "/asesorias");
  expect(portafolio).toHaveAttribute("href", "/portafolio");
  expect(asesorias.className).toContain("link-grow");
  expect(asesorias.className).toContain("text-sm");
  expect(
    asesorias.compareDocumentPosition(portafolio) & Node.DOCUMENT_POSITION_FOLLOWING
  ).toBeTruthy();
  expect(asesorias).not.toHaveAttribute("aria-current");
});

test("english menu labels Consulting and keeps lang=en on the href", () => {
  window.history.pushState({}, "", "/?lang=en");
  renderLinks("en");

  expect(screen.getByRole("link", { name: "Consulting" })).toHaveAttribute(
    "href",
    "/asesorias?lang=en"
  );
  expect(screen.getByRole("link", { name: "portfolio" })).toHaveAttribute(
    "href",
    "/portafolio?lang=en"
  );
  expect(screen.queryByRole("link", { name: "advisories" })).not.toBeInTheDocument();
});

test("asesorías is current on the catalog and the detail route", () => {
  window.history.pushState({}, "", "/asesorias");
  const { unmount } = renderLinks("es");

  const asesorias = screen.getByRole("link", { name: "asesorías" });
  const portafolio = screen.getByRole("link", { name: "portafolio" });
  expect(asesorias).toHaveAttribute("aria-current", "page");
  expect(asesorias.className.split(/\s+/)).toContain("text-ink");
  expect(asesorias.className.split(/\s+/)).not.toContain("text-ink/70");
  expect(portafolio.className.split(/\s+/)).toContain("text-ink/70");
  expect(portafolio).not.toHaveAttribute("aria-current");
  unmount();

  window.history.pushState({}, "", "/asesorias/el-empleado-que-no-se-cansa");
  renderLinks("es");
  expect(screen.getByRole("link", { name: "asesorías" })).toHaveAttribute(
    "aria-current",
    "page"
  );
  expect(screen.getByRole("link", { name: "portafolio" })).not.toHaveAttribute(
    "aria-current"
  );
});

test("home hub card 01 links asesorías to /asesorias in both languages", () => {
  const spanish = render(<Hub lang="es" />);
  const esCard = screen.getByRole("link", { name: /01/ });
  expect(esCard).toHaveAttribute("href", "/asesorias");
  expect(esCard).toHaveTextContent("asesorías");
  spanish.unmount();

  window.history.pushState({}, "", "/?lang=en");
  render(<Hub lang="en" />);
  const enCard = screen.getByRole("link", { name: /01/ });
  expect(enCard).toHaveAttribute("href", "/asesorias?lang=en");
  expect(enCard).toHaveTextContent("advisories");
});

test("an english browser without ?lang=en still shows the spanish label", () => {
  setEnglishBrowser();
  window.history.pushState({}, "", "/");
  renderLinks("es");

  expect(screen.getByRole("link", { name: "asesorías" })).toHaveAttribute("href", "/asesorias");
  expect(screen.queryByRole("link", { name: "Consulting" })).not.toBeInTheDocument();
});

function headerRoot(): HTMLElement {
  const header = document.querySelector("header");
  if (header) return header as HTMLElement;
  const nav = document.querySelector("nav.group\\/nav");
  if (!nav) throw new Error("missing header");
  return nav as HTMLElement;
}

function expectMenu(lang: "en" | "es") {
  const root = headerRoot();
  expect(root.className).toContain("bg-paper");
  expect(root.className).not.toContain("bg-paper/0");
  expect(root.className).not.toContain("backdrop-blur");
  const asesoriasHref = lang === "en" ? "/asesorias?lang=en" : "/asesorias";
  const portafolioHref = lang === "en" ? "/portafolio?lang=en" : "/portafolio";
  const asesoriasLabel = lang === "en" ? "Consulting" : "asesorías";
  const portafolioLabel = lang === "en" ? "portfolio" : "portafolio";

  const desktop = root.querySelector(".hidden.items-center.gap-6");
  const mobile = root.querySelector("#mobile-nav");
  expect(desktop).toBeTruthy();
  expect(mobile).toBeTruthy();
  const menus = [desktop, mobile].filter((node): node is Element => Boolean(node));

  for (const scope of menus) {
    const asesorias = [...scope.querySelectorAll("a")].filter(
      (anchor) => anchor.textContent?.trim() === asesoriasLabel
    );
    const portafolio = [...scope.querySelectorAll("a")].filter(
      (anchor) => anchor.textContent?.trim() === portafolioLabel
    );
    expect(asesorias).toHaveLength(1);
    expect(portafolio).toHaveLength(1);
    expect(asesorias[0].getAttribute("href")).toBe(asesoriasHref);
    expect(portafolio[0].getAttribute("href")).toBe(portafolioHref);
    expect(
      asesorias[0].compareDocumentPosition(portafolio[0]) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  }
}

test("hub, portfolio, and both advisory pages share the same header links", () => {
  const advisory = getAdvisory("el-empleado-que-no-se-cansa");
  if (!advisory) throw new Error("missing advisory fixture");

  const pages: Array<{ path: string; node: ReactElement; lang: "en" | "es" }> = [
    { path: "/", lang: "es", node: <Hub lang="es" /> },
    { path: "/?lang=en", lang: "en", node: <Hub lang="en" /> },
    { path: "/portafolio", lang: "es", node: <Home contributions={emptyContributions} lang="es" /> },
    {
      path: "/portafolio?lang=en",
      lang: "en",
      node: <Home contributions={emptyContributions} lang="en" />,
    },
    { path: "/asesorias", lang: "es", node: <AdvisoryList lang="es" /> },
    { path: "/asesorias?lang=en", lang: "en", node: <AdvisoryList lang="en" /> },
    {
      path: "/asesorias/el-empleado-que-no-se-cansa",
      lang: "es",
      node: <AdvisoryDetail advisory={advisory} lang="es" />,
    },
    {
      path: "/asesorias/el-empleado-que-no-se-cansa?lang=en",
      lang: "en",
      node: <AdvisoryDetail advisory={advisory} lang="en" />,
    },
  ];

  for (const page of pages) {
    window.history.pushState({}, "", page.path);
    const view = render(page.node);
    expectMenu(page.lang);

    const menuButton = screen.getByRole("button", { name: page.lang === "en" ? "menu" : "menú" });
    expect(headerRoot().querySelector("#mobile-nav")).toHaveAttribute("hidden");
    act(() => {
      menuButton.click();
    });
    expect(headerRoot().querySelector("#mobile-nav")).not.toHaveAttribute("hidden");
    act(() => {
      menuButton.click();
    });

    const onAsesorias = page.path.startsWith("/asesorias");
    if (onAsesorias) {
      const current = headerRoot().querySelector('a[aria-current="page"]');
      expect(current?.textContent?.trim()).toBe(page.lang === "en" ? "Consulting" : "asesorías");
    }
    view.unmount();
  }
});
