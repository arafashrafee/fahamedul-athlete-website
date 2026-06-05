import type { Metadata } from "next";
import { Achievements } from "@/components/sections/Achievements/Achievements";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Trophies, honors and recognitions earned through Fahamedul Islam's career.",
};

export default function AchievementsPage() {
  return (
    <div className="pt-[var(--header-h)]">
      <Achievements />
    </div>
  );
}
