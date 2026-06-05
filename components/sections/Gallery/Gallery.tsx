import { GALLERY } from "@/data/gallery";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { PhotoTile } from "./PhotoTile";

export function Gallery() {
  return (
    <section id="gallery" className="section relative bg-midnight">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">03 · Frames</span>
            <AnimatedText
              text="Gallery."
              as="h2"
              className="display-md text-text"
            />
          </div>
          <RevealOnScroll className="max-w-sm text-sm text-muted leading-relaxed">
            Stillness inside the storm — captured between the whistles.
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[260px]">
          {GALLERY.map((item, i) => (
            <RevealOnScroll
              key={item.id}
              delay={(i % 4) * 0.06}
              className={
                item.aspect === "portrait"
                  ? "row-span-2"
                  : item.aspect === "landscape"
                    ? "col-span-2"
                    : ""
              }
            >
              <PhotoTile item={item} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
