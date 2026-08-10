import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Badge } from "@/components/ui/Badge";
import { slideInLeft, slideInRight } from "@/lib/animations";

export function Identity() {
  return (
    <section id="about" className="section relative overflow-hidden">
      <div className="container-page grid gap-16 md:grid-cols-2 md:gap-20 items-center">
        <RevealOnScroll variants={slideInLeft}>
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto md:mx-0 bg-surface border border-border overflow-hidden">
            <Image
              src="/images/portrait/main.jpg"
              alt="Fahamedul Islam portrait"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              quality={88}
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 flex justify-end items-end z-10">
              <span className="label-sm text-text">
                Portrait · 2025
              </span>
            </div>
            <div className="absolute top-6 left-6 w-3 h-3 border border-primary z-10" />
            <div className="absolute top-6 right-6 w-3 h-3 border border-primary z-10" />
          </div>
        </RevealOnScroll>

        <RevealOnScroll variants={slideInRight} className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary">Forward</Badge>
            <Badge variant="green">Bangladesh</Badge>
            <Badge>Right Foot</Badge>
            <Badge>5&apos;11&quot;</Badge>
          </div>

          <span className="eyebrow">The Athlete</span>

          <AnimatedText
            as="h2"
            text="Made in Bangladesh. Forged for the world stage."
            className="display-md text-text text-balance"
            stagger={0.06}
          />

          <div className="space-y-5 max-w-xl text-muted text-base leading-relaxed">
            <p>
              From the dusty pitches of Bangladesh to the floodlights of
              international football, Fahamedul Islam has built his game on
              relentless work and quiet ambition.
            </p>
            <p>
              A forward defined by movement, instinct, and finishing in tight
              spaces — and a generational opportunity to lift his country&apos;s
              football into a new era.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
            <div>
              <div className="label-sm text-faint mb-2">
                Born
              </div>
              <div className="font-display text-2xl">DHAKA</div>
            </div>
            <div>
              <div className="label-sm text-faint mb-2">
                Age
              </div>
              <div className="font-display text-2xl">22</div>
            </div>
            <div>
              <div className="label-sm text-faint mb-2">
                Position
              </div>
              <div className="font-display text-2xl">CF</div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
