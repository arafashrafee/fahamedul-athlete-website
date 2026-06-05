import type { Metadata } from "next";
import { NationalTeam } from "@/components/sections/NationalTeam/NationalTeam";

export const metadata: Metadata = {
  title: "National Team",
  description:
    "Representing the Green & Red — Fahamedul Islam's record with the Bangladesh national football team.",
};

export default function NationalTeamPage() {
  return (
    <div className="pt-[var(--header-h)]">
      <NationalTeam />
    </div>
  );
}
