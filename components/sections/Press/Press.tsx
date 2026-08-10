"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedText } from "@/components/ui/AnimatedText";

interface Article {
  id: string;
  tag: string;
  tagColor?: string;
  /** Publication date — omitted for evergreen profile pages. */
  date?: string;
  source: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
}

const FEATURED: Article = {
  id: "p1",
  tag: "FEATURED",
  date: "9 October 2025",
  source: "The Daily Star",
  title: "Bangladesh start without Shamit, Fahamedul against Hong Kong, China",
  excerpt:
    "Fahamedul Islam and Shamit Shome were kept out of the starting eleven for Bangladesh's 2026 Asian Cup qualifier against Hong Kong, China at the National Stadium in Dhaka.",
  image: "/images/gallery/g4.jpg",
  href: "https://www.thedailystar.net/sports/football/news/bangladesh-start-without-shamit-fahamedul-against-hong-kong-china-4005811",
};

const ARTICLES: Article[] = [
  {
    id: "p2",
    tag: "NATIONAL TEAM",
    date: "28 May 2025",
    source: "Somoy News",
    title: "Fahamedul arrives in Dhaka for Asian Cup qualifying match",
    excerpt:
      "The Italy-based forward landed in Dhaka to join the national camp ahead of Bangladesh's Asian Cup qualifier against Singapore on 10 June.",
    image: "/images/gallery/g1.jpg",
    href: "https://en.somoynews.tv/news/2025-05-28/6XKG54X5",
  },
  {
    id: "p3",
    tag: "PROFILE",
    source: "BeSoccer",
    title: "Fahamedul Islam — Player Profile",
    excerpt:
      "Squad data and season records for the Bangladesh international, listed at Italian club Olbia Calcio in Serie D.",
    image: "/images/gallery/g6.jpg",
    href: "https://www.besoccer.com/player/fahamedul-islam-3273716",
  },
  {
    id: "p4",
    tag: "PROFILE",
    source: "Transfermarkt",
    title: "Fahamedul Islam — Transfermarkt Profile",
    excerpt:
      "Career record, transfer history, and market valuation tracked across his club and international appearances.",
    image: "/images/gallery/g7.jpg",
    href: "https://www.transfermarkt.com/fahamedul-islam/profil/spieler/987443",
  },
];

export function Press() {
  return (
    <section id="press" className="section relative bg-midnight">
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16 md:mb-20">
          <span className="eyebrow">Press</span>
          <AnimatedText
            text="Latest Stories."
            as="h2"
            className="display-md text-text"
          />
          <RevealOnScroll className="max-w-md text-sm text-muted leading-relaxed">
            Latest updates, media mentions, and football news.
          </RevealOnScroll>
        </div>

        {/* Featured article */}
        <RevealOnScroll>
          <a
            href={FEATURED.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid md:grid-cols-2 gap-0 border border-white/[0.06] rounded-lg overflow-hidden mb-8 md:mb-12 transition-all duration-500 hover:border-white/[0.12]"
          >
            <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
              <Image
                src={FEATURED.image}
                alt={FEATURED.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-[10px] font-mono uppercase tracking-[0.15em] rounded-sm">
                {FEATURED.tag}
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] font-mono text-faint tracking-wide">
                  {FEATURED.date}
                </span>
                <span className="px-2 py-0.5 border border-primary/40 text-primary text-[10px] font-mono uppercase tracking-[0.15em] rounded-sm">
                  {FEATURED.source}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl lg:text-3xl tracking-[0.05em] text-text leading-tight mb-4 group-hover:text-primary transition-colors duration-500">
                {FEATURED.title.toUpperCase()}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6">
                {FEATURED.excerpt}
              </p>
              <span className="label-sm text-primary tracking-[0.2em] group-hover:tracking-[0.3em] transition-all duration-500">
                READ MORE →
              </span>
            </div>
          </a>
        </RevealOnScroll>

        {/* Article grid */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {ARTICLES.map((article, i) => (
            <RevealOnScroll key={article.id} delay={i * 0.08}>
              <a
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span
                    className="absolute top-3 left-3 px-2.5 py-0.5 text-white text-[10px] font-mono uppercase tracking-[0.15em] rounded-sm"
                    style={{ backgroundColor: article.tagColor || "#E9393B" }}
                  >
                    {article.tag}
                  </span>
                </div>
                <div className="pt-5 flex flex-col gap-2">
                  <span className="text-[11px] font-mono text-faint tracking-wide">
                    {article.source}
                    {article.date ? ` · ${article.date}` : ""}
                  </span>
                  <h4 className="font-display text-sm md:text-base tracking-[0.05em] text-text leading-snug group-hover:text-primary transition-colors duration-500">
                    {article.title.toUpperCase()}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
