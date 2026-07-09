export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
export interface GitHubStats {
  commits: number;
  pullRequests: number;
  issues: number;
  reviews: number;
  currentStreak: number;
}
export interface ContributionData {
  total: number;
  weeks: ContributionDay[][];
  /** Present only when fetched via the authenticated GraphQL API. */
  stats?: GitHubStats;
  /** Top languages by bytes across public repos; falls back to a curated list. */
  languages?: string[];
}

/** Consecutive days (ending on the most recent) with at least one contribution.
 *  The most recent day is allowed to be empty (today may not be done yet). */
function currentStreak(days: ContributionDay[]): number {
  const real = days.filter((d) => !d.date.startsWith("pad"));
  let streak = 0;
  for (let i = real.length - 1; i >= 0; i--) {
    if (real[i].count > 0) streak++;
    else if (i === real.length - 1) continue; // grace for today
    else break;
  }
  return streak;
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

// GitHub's official contribution level enum -> our 0..4 scale.
const LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

interface GraphQLDay {
  date: string;
  contributionCount: number;
  contributionLevel: keyof typeof LEVEL_MAP;
}
interface GraphQLResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        totalCommitContributions: number;
        totalPullRequestContributions: number;
        totalIssueContributions: number;
        totalPullRequestReviewContributions: number;
        contributionCalendar?: {
          totalContributions: number;
          weeks: { contributionDays: GraphQLDay[] }[];
        };
      };
      repositories?: { nodes: GraphQLRepo[] };
    };
  };
}
interface GraphQLRepo {
  languages?: { edges: { size: number; node: { name: string } }[] };
}

// Sum language bytes across repos and return the top N language names.
function topLanguages(repos: GraphQLRepo[], limit = 6): string[] {
  const totals = new Map<string, number>();
  for (const repo of repos) {
    for (const edge of repo.languages?.edges ?? []) {
      totals.set(edge.node.name, (totals.get(edge.node.name) ?? 0) + edge.size);
    }
  }
  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name]) => name);
}

// Uses GitHub's official GraphQL API. When the token belongs to `username`,
// the returned calendar includes PRIVATE contributions — matching the grid
// rendered on github.com exactly.
async function getContributionsFromGraphQL(
  username: string,
  token: string
): Promise<ContributionData | null> {
  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalPullRequestReviewContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount contributionLevel }
          }
        }
      }
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
        nodes {
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges { size node { name } }
          }
        }
      }
    }
  }`;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: username } }),
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as GraphQLResponse;
    const collection = json.data?.user?.contributionsCollection;
    const calendar = collection?.contributionCalendar;
    if (!collection || !calendar) return null;
    const weeks: ContributionDay[][] = calendar.weeks.map((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVEL_MAP[d.contributionLevel] ?? 0,
      }))
    );
    // GitHub's first week may start mid-week; pad its leading days so the
    // column aligns to the weekday grid (Sun at top).
    if (weeks[0]?.length) {
      const pad = new Date(weeks[0][0].date + "T00:00:00").getDay();
      weeks[0] = [
        ...Array.from({ length: pad }, (_, i) => ({
          date: `pad-${i}`,
          count: 0,
          level: 0 as const,
        })),
        ...weeks[0],
      ];
    }
    const languages = topLanguages(json.data?.user?.repositories?.nodes ?? []);
    return {
      total: calendar.totalContributions,
      weeks,
      stats: {
        commits: collection.totalCommitContributions,
        pullRequests: collection.totalPullRequestContributions,
        issues: collection.totalIssueContributions,
        reviews: collection.totalPullRequestReviewContributions,
        currentStreak: currentStreak(weeks.flat()),
      },
      languages: languages.length ? languages : undefined,
    };
  } catch {
    return null;
  }
}

// Public-only fallback used when no GITHUB_TOKEN is configured.
async function getContributionsFromJogruber(
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

export async function getContributions(
  username: string
): Promise<ContributionData> {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    const official = await getContributionsFromGraphQL(username, token);
    if (official) return official;
  }
  return getContributionsFromJogruber(username);
}
