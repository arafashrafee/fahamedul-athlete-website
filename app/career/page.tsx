import type { Metadata } from "next";
import { Career } from "@/components/sections/Career/Career";
import { StatsBar } from "@/components/sections/StatsBar/StatsBar";

export const metadata: Metadata = {
  title: "Career",
  description: "Clubs, chapters, appearances and goals — the professional path of Fahamedul Islam.",
};

export default function CareerPage() {
  return (
    <div className="pt-[var(--header-h)]">
      <StatsBar />
      <Career />
    </div>
  );
}
