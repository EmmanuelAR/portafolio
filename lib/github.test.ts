import { toWeeks, type ContributionDay } from "./github";

test("toWeeks pads to weekday alignment and chunks into 7s", () => {
  // 2026-01-01 is a Thursday (getDay() === 4)
  const days: ContributionDay[] = Array.from({ length: 10 }, (_, i) => ({
    date: `2026-01-${String(i + 1).padStart(2, "0")}`,
    count: i,
    level: 0,
  }));
  const weeks = toWeeks(days);
  // First column padded with 4 leading nulls-as-zero days -> length 7
  expect(weeks[0].length).toBe(7);
  // 4 pad + 10 real = 14 cells -> 2 full weeks
  expect(weeks.length).toBe(2);
  expect(weeks[1].length).toBe(7);
});
