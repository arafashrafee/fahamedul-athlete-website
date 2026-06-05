import { CAREER } from "@/data/career";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ClubCard } from "./ClubCard";

export function Career() {
  return (
    <section id="career" className="section relative bg-midnight">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">01 · Career</span>
            <AnimatedText
              text="Clubs &amp; Chapters."
              as="h2"
              className="display-md text-text"
            />
          </div>
          <RevealOnScroll className="max-w-sm text-sm text-muted leading-relaxed">
            Every minute, every match, every move — tracked from the academy
            pitches to the senior national team.
          </RevealOnScroll>
        </div>

        <ol className="relative">
          <div
            aria-hidden
            className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-border"
          />
          {CAREER.map((entry, i) => (
            <ClubCard
              key={entry.id}
              entry={entry}
              index={i}
              side={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
