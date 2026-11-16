import { render, screen } from "@testing-library/react";
import Home from "./Home";

beforeEach(() => {
  window.history.pushState({}, "", "/portafolio");
});

test("renders nav with brand wordmark and language toggle", () => {
  render(<Home contributions={{ total: 0, weeks: [] }} />);
  expect(screen.getByRole("navigation", { name: "Language" })).toBeInTheDocument();
  const langNav = screen.getByRole("navigation", { name: "Language" });
  expect(langNav).toHaveTextContent("en");
  expect(langNav.querySelector('a[href="/portafolio?lang=en"]')).toBeTruthy();
  expect(langNav.querySelector('a[href="/portafolio"]')).toBeTruthy();
  expect(screen.getByLabelText("Emmanuel Agüero Rojas — home")).toBeInTheDocument();
  expect(screen.getByLabelText("menú")).toBeInTheDocument();
});

test("renders founder-first hero and key sections", () => {
  render(<Home contributions={{ total: 0, weeks: [] }} />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("hola. soy emmanuel.");
  expect(document.querySelector("#about")).toBeInTheDocument();
  expect(document.querySelector("#work")).toBeInTheDocument();
  expect(document.querySelector("#story")).toBeInTheDocument();
  expect(document.querySelector("#talk")).toBeInTheDocument();
  expect(screen.getAllByText(/cavos/i).length).toBeGreaterThan(0);
  expect(screen.queryByText(/available for full-time/i)).not.toBeInTheDocument();
});
