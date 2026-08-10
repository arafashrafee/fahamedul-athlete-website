import type { Stat, NationalTeamStats } from "@/types";

/* Totals derived from the career table in data/career.ts:
   goals 1 (Olbia) + 1 (U-23) + 4 (Sampdoria U-18) = 6
   clubs Olbia, Livorno, SC Ligorna 1922, Sampdoria U-18, Spezia Youth = 5 */
export const KEY_STATS: Stat[] = [
  { label: "Senior Caps", value: 6 },
  { label: "Career Goals", value: 6 },
  { label: "Clubs", value: 5 },
  { label: "Years Pro", value: 2 },
];

export const NATIONAL_TEAM: NationalTeamStats = {
  caps: 6,
  goals: 0,
  debutDate: "2025-06",
  debutOpponent: "",
};
