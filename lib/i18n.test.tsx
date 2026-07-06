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

test("defaults to English and toggles to Spanish", () => {
  localStorage.clear();
  render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>
  );
  const btn = screen.getByTestId("probe");
  expect(btn).toHaveTextContent("en");
  act(() => btn.click());
  expect(btn).toHaveTextContent("es");
  expect(localStorage.getItem("portfolio-lang")).toBe("es");
});
