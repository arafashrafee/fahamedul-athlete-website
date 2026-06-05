import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ContactForm } from "./ContactForm";
import { SOCIAL_LINKS } from "@/lib/constants";

export function Contact() {
  return (
    <section id="contact" className="section relative bg-midnight">
      <div className="container-page grid gap-16 md:grid-cols-2 md:gap-20 items-start">
        <div className="flex flex-col gap-8">
          <span className="eyebrow">06 · Connect</span>
          <AnimatedText
            text="For bookings, press &amp; partnerships."
            as="h2"
            className="display-md text-text text-balance"
          />
          <RevealOnScroll className="text-muted leading-relaxed max-w-md">
            Reach out for sponsorship, media requests, or representation
            inquiries. Personal responses where possible.
          </RevealOnScroll>

          <div className="mt-6 flex flex-col gap-4">
            <div className="label-sm text-faint">
              Direct
            </div>
            <a
              href="mailto:management@fahamedulislam.com"
              className="font-display text-2xl md:text-3xl text-text hover:text-primary transition-colors w-fit"
            >
              management@fahamedulislam.com
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 pt-6 border-t border-border">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-muted hover:text-primary transition-colors"
              >
                {s.label} →
              </a>
            ))}
          </div>
        </div>

        <RevealOnScroll className="md:sticky md:top-32">
          <ContactForm />
        </RevealOnScroll>
      </div>
    </section>
  );
}
