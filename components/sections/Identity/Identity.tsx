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
            <Badge>1.70 m</Badge>
          </div>

          <span className="eyebrow">The Athlete</span>

          <AnimatedText
            as="h2"
            text="Fahamedul Islam"
            className="display-md text-text text-balance"
            stagger={0.06}
          />

          <div className="space-y-5 max-w-xl text-muted text-base leading-relaxed">
            <p>
              A Bangladeshi boy grew up in the coastal city of La Spezia, Italy,
              where his football journey began. Through years of dedication in
              Italian football, he turned a childhood dream into reality, rising
              through the ranks to become a professional player and proving that
              talent and perseverance know no borders.
            </p>
            <p>
              His journey in Italy eventually earned him recognition from the
              Bangladesh National Team. Although his first senior call-up in
              March 2025 didn&apos;t lead to a debut, he refused to give up. A
              second opportunity came in May, and in June 2025, he proudly
              stepped onto the pitch in the red and green. Since then, he has
              continued to represent Bangladesh while building a career in
              Europe.
            </p>
          </div>

          <span className="eyebrow">The Journey</span>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
            <div>
              <div className="label-sm text-faint mb-2">
                Born
              </div>
              <div className="font-display text-2xl">FENI</div>
            </div>
            <div>
              <div className="label-sm text-faint mb-2">
                Age
              </div>
              <div className="font-display text-2xl">19</div>
            </div>
            <div>
              <div className="label-sm text-faint mb-2">
                Position
              </div>
              <div className="font-display text-2xl">LW</div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
