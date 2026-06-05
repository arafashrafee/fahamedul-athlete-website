import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedText } from "@/components/ui/AnimatedText";

const PREVIEWS = [
  { href: "/about", num: "01", title: "About", description: "Origin, identity, mindset." },
  { href: "/career", num: "02", title: "Career", description: "Clubs and chapters." },
  { href: "/highlights", num: "03", title: "Highlights", description: "Goals and key moments." },
  { href: "/gallery", num: "04", title: "Gallery", description: "Frames from the pitch." },
  { href: "/achievements", num: "05", title: "Achievements", description: "Trophies and honors." },
  { href: "/national-team", num: "06", title: "National Team", description: "The Green & Red." },
  { href: "/contact", num: "07", title: "Contact", description: "Press & partnerships." },
] as const;

export function SectionNav() {
  return (
    <section className="section container-page">
      <div className="mb-16 flex flex-col gap-4">
        <span className="eyebrow">Index · 07</span>
        <AnimatedText
          text="Explore."
          as="h2"
          className="display-lg text-text"
        />
      </div>

      <ul className="border-t border-border">
        {PREVIEWS.map((p, i) => (
          <RevealOnScroll
            key={p.href}
            delay={i * 0.04}
            as="li"
            className="border-b border-border"
          >
            <Link
              href={p.href}
              className="group relative flex items-baseline justify-between gap-6 py-7 md:py-9 px-1 transition-colors"
            >
              <div className="flex items-baseline gap-6 md:gap-10 min-w-0">
                <span className="label-sm text-faint group-hover:text-primary transition-colors w-6 shrink-0">
                  {p.num}
                </span>
                <span
                  className="font-display leading-[0.95] tracking-tight text-text group-hover:text-primary transition-colors duration-500"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                >
                  {p.title}
                </span>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <span className="hidden md:inline body-sm max-w-xs text-right">
                  {p.description}
                </span>
                <span className="font-display text-2xl text-faint group-hover:text-primary transition-all duration-500 group-hover:translate-x-1">
                  →
                </span>
              </div>
              <span
                aria-hidden
                className="absolute left-0 bottom-0 h-px w-0 bg-primary transition-all duration-700 group-hover:w-full"
              />
            </Link>
          </RevealOnScroll>
        ))}
      </ul>
    </section>
  );
}
