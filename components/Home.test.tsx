import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("renders nav with language toggle", () => {
  render(<Home contributions={{ total: 0, weeks: [] }} />);
  expect(screen.getByLabelText("Toggle language")).toBeInTheDocument();
  expect(screen.getByText("EA·")).toBeInTheDocument();
});
