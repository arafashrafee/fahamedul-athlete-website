import type { Metadata } from "next";
import { Identity } from "@/components/sections/Identity/Identity";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fahamedul Islam — Bangladesh national team forward. Origin, identity, and the work behind the player.",
};

export default function AboutPage() {
  return (
    <div className="pt-[var(--header-h)]">
      <Identity />
    </div>
  );
}
