"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedText } from "@/components/ui/AnimatedText";

interface Article {
  id: string;
  tag: string;
  tagColor?: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
}

const FEATURED: Article = {
  id: "p1",
  tag: "FEATURED",
  date: "May 2024",
  title: "Fahamedul Shines in World Cup Qualifier with Crucial Performance",
  excerpt:
    "A masterclass display against Lebanon highlighted Fahamedul's growing influence as Bangladesh's creative engine in the World Cup qualifying campaign.",
  image: "/images/gallery/g4.jpg",
  href: "#",
};

const ARTICLES: Article[] = [
  {
    id: "p2",
    tag: "DOMESTIC",
    tagColor: "#E9393B",
    date: "Mar 2024",
    title: "Sampdoria's Bangladeshi Gem Continues to Impress in Training",
    excerpt:
      "Coaches praise Fahamedul's dedication and rapid development at the Italian club's youth setup.",
    image: "/images/gallery/g1.jpg",
    href: "#",
  },
  {
    id: "p3",
    tag: "FEATURE",
    tagColor: "#E9393B",
    date: "Jan 2024",
    title: "Rising Star: How Fahamedul Islam Is Changing Bangladeshi Football",
    excerpt:
      "An in-depth look at the midfielder's journey from grassroots to international recognition and European interest.",
    image: "/images/gallery/g6.jpg",
    href: "#",
  },
  {
    id: "p4",
    tag: "NATIONAL TEAM",
    tagColor: "#E9393B",
    date: "Nov 2023",
    title: "Bangladesh Squad Announcement: Fahamedul Named in Asian Cup Roster",
    excerpt:
      "The young midfielder earns his place in the squad for the biggest tournament in Asian football.",
    image: "/images/gallery/g7.jpg",
    href: "#",
  },
];

export function Press() {
  return (
    <section id="press" className="section relative bg-midnight">
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16 md:mb-20">
          <span className="eyebrow">
            <span className="text-primary">——</span> PRESS{" "}
            <span className="text-primary">——</span>
          </span>
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
                  INTERNATIONAL
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
                    {article.date}
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
