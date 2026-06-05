import type { Metadata } from "next";
import { Gallery } from "@/components/sections/Gallery/Gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Match-day frames, training, and editorial portraits of Fahamedul Islam.",
};

export default function GalleryPage() {
  return (
    <div className="pt-[var(--header-h)]">
      <Gallery />
    </div>
  );
}
