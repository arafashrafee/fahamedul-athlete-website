import type { Metadata } from "next";
import { Highlights } from "@/components/sections/Highlights/Highlights";

export const metadata: Metadata = {
  title: "Highlights",
  description: "Selected goals, assists, and key moments from Fahamedul Islam's matches.",
};

export default function HighlightsPage() {
  return (
    <div className="pt-[var(--header-h)]">
      <Highlights />
    </div>
  );
}
