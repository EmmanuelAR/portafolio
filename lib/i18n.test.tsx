import { render, screen, act } from "@testing-library/react";
import { LanguageProvider, useLang, detectBrowserLang } from "./i18n";

function Probe() {
  const { lang, toggle } = useLang();
  return (
    <button onClick={toggle} data-testid="probe">
      {lang}
    </button>
  );
}

test("detectBrowserLang: en* → en, anything else → es", () => {
  expect(detectBrowserLang("en")).toBe("en");
  expect(detectBrowserLang("en-US")).toBe("en");
  expect(detectBrowserLang("es")).toBe("es");
  expect(detectBrowserLang("es-CR")).toBe("es");
  expect(detectBrowserLang("pt-BR")).toBe("es");
});

test("defaults to Spanish and toggles to English; preference is saved", () => {
  localStorage.clear();
  Object.defineProperty(navigator, "language", {
    configurable: true,
    get: () => "es-CR",
  });
  render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>
  );
  const btn = screen.getByTestId("probe");
  expect(btn).toHaveTextContent("es");
  act(() => btn.click());
  expect(btn).toHaveTextContent("en");
  expect(localStorage.getItem("portfolio-lang")).toBe("en");
});

test("saved preference wins over browser language", () => {
  localStorage.setItem("portfolio-lang", "en");
  Object.defineProperty(navigator, "language", {
    configurable: true,
    get: () => "es-CR",
  });
  render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>
  );
  expect(screen.getByTestId("probe")).toHaveTextContent("en");
});
