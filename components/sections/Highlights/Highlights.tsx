import { HIGHLIGHTS } from "@/data/gallery";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { VideoCard } from "./VideoCard";

export function Highlights() {
  const [featured, ...rest] = HIGHLIGHTS;

  return (
    <section id="highlights" className="section relative bg-surface">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">02 · Film Room</span>
            <AnimatedText
              text="Highlights."
              as="h2"
              className="display-md text-text"
            />
          </div>
          <RevealOnScroll className="max-w-sm text-sm text-muted leading-relaxed">
            Selected moments. Goals, assists, and the small movements behind
            them.
          </RevealOnScroll>
        </div>

        <RevealOnScroll className="mb-8">
          <VideoCard item={featured} featured />
        </RevealOnScroll>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item, i) => (
            <RevealOnScroll key={item.id} delay={i * 0.08}>
              <VideoCard item={item} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
