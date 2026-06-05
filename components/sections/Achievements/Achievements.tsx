import { ACHIEVEMENTS } from "@/data/achievements";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AchievementCard } from "./AchievementCard";

export function Achievements() {
  return (
    <section id="achievements" className="section relative bg-surface border-y border-border">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">04 · Honors</span>
            <AnimatedText
              text="Achievements."
              as="h2"
              className="display-md text-text"
            />
          </div>
          <RevealOnScroll className="max-w-sm text-sm text-muted leading-relaxed">
            Trophies, milestones, and recognitions — domestic, regional, and
            international.
          </RevealOnScroll>
        </div>

        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a, i) => (
            <RevealOnScroll key={a.id} delay={(i % 3) * 0.08}>
              <AchievementCard achievement={a} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
