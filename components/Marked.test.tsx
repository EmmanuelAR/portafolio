import { render } from "@testing-library/react";
import Marked from "./Marked";

test("renders blue, red and accent marks from markup", () => {
  const { container } = render(
    <Marked text="a ==blue== b ==red:red== c ==accent:orange== d" />
  );
  const marks = container.querySelectorAll("mark");
  expect(marks).toHaveLength(3);
  expect(marks[0]).toHaveClass("hl");
  expect(marks[0]).toHaveAttribute("data-draw");
  expect(marks[1]).toHaveClass("hl-red");
  expect(marks[2]).toHaveClass("hl-accent");
  expect(marks[2]).not.toHaveAttribute("data-draw");
  expect(container.textContent).toBe("a blue b red c orange d");
});
