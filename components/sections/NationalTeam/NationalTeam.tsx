import { NATIONAL_TEAM } from "@/data/stats";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function NationalTeam() {
  return (
    <section id="national-team" className="relative overflow-hidden bg-midnight">
      {/* Bangladesh flag gradient backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, var(--color-bd-green) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--color-primary) 0%, transparent 40%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-transparent to-midnight" />
      </div>

      <div className="relative container-page section flex flex-col items-center text-center gap-10">
        <span className="eyebrow">05 · The Crest</span>

        <AnimatedText
          text="Representing the Green &amp; Red."
          as="h2"
          className="display-lg text-text text-balance max-w-5xl"
          stagger={0.05}
        />

        <RevealOnScroll className="max-w-2xl body-lg">
          Every cap is a privilege. Every minute on the pitch in red and green
          is carried forward by millions back home — a country that has waited
          a long time to be heard in world football.
        </RevealOnScroll>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          <Stat label="Caps" value={NATIONAL_TEAM.caps} />
          <Stat label="Goals" value={NATIONAL_TEAM.goals} />
          <div className="text-center">
            <div className="stat-xl text-text">
              {new Date(NATIONAL_TEAM.debutDate).getFullYear()}
            </div>
            <div className="mt-3 label-sm text-faint">
              Debut Year
            </div>
          </div>
          <div className="text-center">
            <div className="stat-md text-text">
              {NATIONAL_TEAM.debutOpponent}
            </div>
            <div className="mt-3 label-sm text-faint">
              Debut vs
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="stat-xl text-primary">
        <AnimatedCounter to={value} />
      </div>
      <div className="mt-3 label-sm text-faint">
        {label}
      </div>
    </div>
  );
}
