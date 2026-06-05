import { KEY_STATS } from "@/data/stats";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function StatsBar() {
  return (
    <section className="relative border-y border-border bg-surface">
      <div className="container-page">
        <ul className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {KEY_STATS.map((stat, i) => (
            <RevealOnScroll
              key={stat.label}
              delay={i * 0.08}
              className="px-6 py-10 md:py-14 first:pl-0 md:first:pl-6"
              as="li"
            >
              <div className="flex flex-col items-start gap-3">
                <div className="stat-xl text-text">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="label-sm text-faint">
                  {stat.label}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </ul>
      </div>
    </section>
  );
}
