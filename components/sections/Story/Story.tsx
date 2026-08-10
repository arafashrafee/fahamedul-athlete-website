"use client";

import { useRef } from "react";
import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedText } from "@/components/ui/AnimatedText";

interface StoryPost {
  id: string;
  image: string;
  caption: string;
  date: string;
}

const POSTS: StoryPost[] = [
  {
    id: "s1",
    image: "/images/gallery/g4.jpg",
    date: "15TH MAY 2024",
    caption:
      "“What a night! Proud to represent Bangladesh on the international stage. The fans were incredible — this one was for you all”",
  },
  {
    id: "s2",
    image: "/images/gallery/g1.jpg",
    date: "2ND APRIL 2024",
    caption:
      "“Sampdoria days. A chapter that shaped everything — grateful for every lesson learned in Italy”",
  },
  {
    id: "s3",
    image: "/images/gallery/g7.jpg",
    date: "18TH JANUARY 2024",
    caption:
      "“Match day energy. Full sprint, full commitment. Every minute on the pitch counts”",
  },
  {
    id: "s4",
    image: "/images/gallery/g6.jpg",
    date: "5TH NOVEMBER 2023",
    caption:
      "“Training never stops. Early mornings, late evenings — the grind behind the goals nobody sees”",
  },
  {
    id: "s5",
    image: "/images/gallery/g5.jpg",
    date: "20TH SEPTEMBER 2023",
    caption:
      "“Off the pitch, still locked in. Game day prep — focused and ready”",
  },
  {
    id: "s6",
    image: "/images/gallery/g3.jpg",
    date: "8TH JULY 2023",
    caption:
      "“Always moving forward. On and off the pitch, the journey continues”",
  },
];

export function Story() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const slide = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? card.clientWidth + 24 : 360;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id="story"
      className="section relative bg-surface border-y border-border"
    >
      <div className="container-page">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-14 md:mb-20">
          <AnimatedText
            text="Features."
            as="h2"
            className="display-md text-text"
          />

          {/* Slider controls */}
          <div className="hidden sm:flex items-center gap-3 pb-2">
            <button
              aria-label="Previous stories"
              onClick={() => slide(-1)}
              className="w-12 h-12 flex items-center justify-center border border-white/[0.12] text-faint transition-all duration-300 hover:border-primary/50 hover:text-primary"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              aria-label="Next stories"
              onClick={() => slide(1)}
              className="w-12 h-12 flex items-center justify-center border border-white/[0.12] text-faint transition-all duration-300 hover:border-primary/50 hover:text-primary"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Posts — single sliding row */}
      <RevealOnScroll>
        <div
          ref={scrollerRef}
          className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-[clamp(1.25rem,4vw,3rem)] px-[clamp(1.25rem,4vw,3rem)]"
        >
          {POSTS.map((post) => (
            <article
              key={post.id}
              className="snap-start shrink-0 w-[280px] md:w-[330px] flex flex-col gap-4 group"
            >
              <span className="label-sm text-faint tracking-[0.3em]">
                {post.date}
              </span>
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 280px, 330px"
                />
              </div>
              <p className="text-sm text-muted italic leading-relaxed">
                {post.caption}
              </p>
            </article>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
