import type { GalleryItem, Highlight } from "@/types";

/**
 * Add more shots to /public/images/gallery/ and append entries here.
 * `aspect` drives the masonry layout — portrait spans 2 rows, landscape 2 cols.
 */
export const GALLERY: GalleryItem[] = [
  { id: "g1", src: "/images/gallery/g1.jpg", alt: "Sampdoria youth — matchday", aspect: "landscape" },
  { id: "g2", src: "/images/gallery/g2.jpg", alt: "International duel vs Hong Kong", aspect: "landscape" },
  { id: "g3", src: "/images/gallery/g3.jpg", alt: "National team — running on", aspect: "portrait" },
];

/**
 * Highlights — drop poster images into /public/images/highlights/ and use
 * real YouTube embed IDs in `videoUrl`.
 */
export const HIGHLIGHTS: Highlight[] = [
  {
    id: "h1",
    title: "Senior National Team Highlights",
    thumbnail: "/images/highlights/h1.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "3:00",
    date: "2025",
  },
  {
    id: "h2",
    title: "Sampdoria Primavera — Selected Moments",
    thumbnail: "/images/highlights/h2.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "2:14",
    date: "2024",
  },
  {
    id: "h3",
    title: "Bangladesh Debut",
    thumbnail: "/images/highlights/h3.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "1:48",
    date: "2023",
  },
  {
    id: "h4",
    title: "Season Compilation",
    thumbnail: "/images/highlights/h4.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "5:30",
    date: "2025",
  },
];
