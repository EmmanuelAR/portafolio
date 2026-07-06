export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
export interface ContributionData {
  total: number;
  weeks: ContributionDay[][];
}

export function toWeeks(days: ContributionDay[]): ContributionDay[][] {
  if (days.length === 0) return [];
  const first = new Date(days[0].date + "T00:00:00");
  const pad = first.getDay(); // 0=Sun..6=Sat
  const padded: ContributionDay[] = [
    ...Array.from({ length: pad }, (_, i) => ({
      date: `pad-${i}`,
      count: 0,
      level: 0 as const,
    })),
    ...days,
  ];
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  return weeks;
}

interface ApiDay {
  date: string;
  count: number;
  level: number;
}
interface ApiResponse {
  total: Record<string, number>;
  contributions: ApiDay[];
}

export async function getContributions(
  username: string
): Promise<ContributionData> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 86400 }, signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return { total: 0, weeks: [] };
    const data = (await res.json()) as ApiResponse;
    const days: ContributionDay[] = data.contributions.map((d) => ({
      date: d.date,
      count: d.count,
      level: Math.max(0, Math.min(4, d.level)) as 0 | 1 | 2 | 3 | 4,
    }));
    const total = Object.values(data.total).reduce((a, b) => a + b, 0);
    return { total, weeks: toWeeks(days) };
  } catch {
    return { total: 0, weeks: [] };
  }
}
