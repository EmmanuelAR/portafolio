import { render, screen, act } from "@testing-library/react";
import { LanguageProvider, useLang } from "./i18n";

function Probe() {
  const { lang, toggle } = useLang();
  return (
    <button onClick={toggle} data-testid="probe">
      {lang}
    </button>
  );
}

function setNavigatorLanguage(language: string) {
  Object.defineProperty(navigator, "language", {
    configurable: true,
    get: () => language,
  });
}

beforeEach(() => {
  localStorage.clear();
  window.history.pushState({}, "", "/");
  document.documentElement.lang = "";
});

test("spanish stays the default for an english browser and a saved preference", () => {
  localStorage.setItem("portfolio-lang", "en");
  setNavigatorLanguage("en-US");
  window.history.pushState({}, "", "/asesorias");

  render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>
  );

  expect(screen.getByTestId("probe")).toHaveTextContent("es");
  expect(document.documentElement.lang).toBe("es");
});

test("?lang=en selects english and a bare url selects spanish again", () => {
  localStorage.setItem("portfolio-lang", "es");
  setNavigatorLanguage("en-US");
  window.history.pushState({}, "", "/portafolio?lang=en");

  render(
    <LanguageProvider initialLang="es">
      <Probe />
    </LanguageProvider>
  );

  expect(screen.getByTestId("probe")).toHaveTextContent("en");
  expect(document.documentElement.lang).toBe("en");

  act(() => {
    window.history.pushState({}, "", "/portafolio");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
  expect(screen.getByTestId("probe")).toHaveTextContent("es");
  expect(document.documentElement.lang).toBe("es");

  act(() => {
    window.history.pushState({}, "", "/portafolio?lang=en");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
  expect(screen.getByTestId("probe")).toHaveTextContent("en");
  expect(document.documentElement.lang).toBe("en");
});

test("toggle changes the url both ways and does not store a preference", () => {
  setNavigatorLanguage("en-GB");
  window.history.pushState({}, "", "/asesorias/el-empleado-que-no-se-cansa");

  render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>
  );

  const btn = screen.getByTestId("probe");
  expect(btn).toHaveTextContent("es");

  act(() => btn.click());
  expect(btn).toHaveTextContent("en");
  expect(window.location.pathname).toBe("/asesorias/el-empleado-que-no-se-cansa");
  expect(window.location.search).toBe("?lang=en");
  expect(localStorage.getItem("portfolio-lang")).toBeNull();

  act(() => btn.click());
  expect(btn).toHaveTextContent("es");
  expect(window.location.search).toBe("");
  expect(localStorage.getItem("portfolio-lang")).toBeNull();
});
