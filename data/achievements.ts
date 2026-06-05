import type { Achievement } from "@/types";

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "league-champ-23",
    title: "Bangladesh Premier League Champion",
    year: 2023,
    competition: "BPL",
    tier: "gold",
  },
  {
    id: "league-topscorer-25",
    title: "League Top Scorer",
    year: 2025,
    competition: "BPL",
    tier: "gold",
    description: "14 goals in 22 appearances.",
  },
  {
    id: "fed-cup-24",
    title: "Federation Cup Runner-up",
    year: 2024,
    competition: "Federation Cup",
    tier: "silver",
  },
  {
    id: "saff-25",
    title: "SAFF Championship — Group Stage",
    year: 2025,
    competition: "SAFF",
    tier: "honor",
    description: "Senior national team call-up.",
  },
  {
    id: "u20-mvp",
    title: "U-20 Tournament MVP",
    year: 2020,
    competition: "U-20 Regional",
    tier: "bronze",
  },
  {
    id: "debut-cap",
    title: "Senior National Team Debut",
    year: 2023,
    competition: "Friendly vs Seychelles",
    tier: "honor",
  },
];
