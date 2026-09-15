import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("renders nav with brand wordmark and language toggle", () => {
  render(<Home contributions={{ total: 0, weeks: [] }} />);
  expect(screen.getByLabelText("Toggle language")).toBeInTheDocument();
  expect(screen.getByLabelText("ear.dev — home")).toBeInTheDocument();
  expect(screen.getByLabelText("menu")).toBeInTheDocument();
});

test("renders founder-first hero and key sections", () => {
  render(<Home contributions={{ total: 0, weeks: [] }} />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("hi. i'm emmanuel.");
  expect(document.querySelector("#about")).toBeInTheDocument();
  expect(document.querySelector("#work")).toBeInTheDocument();
  expect(document.querySelector("#story")).toBeInTheDocument();
  expect(document.querySelector("#talk")).toBeInTheDocument();
  expect(screen.getAllByText(/cavos/i).length).toBeGreaterThan(0);
  expect(screen.queryByText(/available for full-time/i)).not.toBeInTheDocument();
});
