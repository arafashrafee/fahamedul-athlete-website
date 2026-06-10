import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface Brand {
  name: string;
  subtitle?: string;
}

const BRANDS: Brand[] = [
  { name: "NIKE" },
  { name: "ADIDAS" },
  { name: "PUMA" },
  { name: "GRAMEENPHONE" },
  { name: "BKASH" },
  { name: "WALTON" },
];

/* Elongated hexagon — pointed left/right edges, no right angles. */
const HEX_CLIP =
  "polygon(28px 0, calc(100% - 28px) 0, 100% 50%, calc(100% - 28px) 100%, 28px 100%, 0 50%)";

function BrandPlate({ brand, index }: { brand: Brand; index: number }) {
  return (
    <RevealOnScroll delay={index * 0.06}>
      <div className="group relative flex flex-col items-center justify-center gap-1 px-14 py-7 transition-[filter] duration-500 [filter:drop-shadow(0_0_0_rgba(233,58,59,0))] hover:[filter:drop-shadow(0_0_14px_rgba(233,58,59,0.3))]">
        {/* Neon rim */}
        <span
          aria-hidden
          className="absolute inset-0 bg-primary/40 transition-colors duration-500 group-hover:bg-primary/80"
          style={{ clipPath: HEX_CLIP }}
        />
        {/* Plate fill */}
        <span
          aria-hidden
          className="absolute inset-[2px] bg-card transition-colors duration-500 group-hover:bg-[#1d1112]"
          style={{ clipPath: HEX_CLIP }}
        />

        <span className="relative font-display text-xl md:text-2xl tracking-[0.1em] text-text opacity-50 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0">
          {brand.name}
        </span>
        {brand.subtitle && (
          <span className="relative label-sm text-faint tracking-[0.2em] opacity-60 transition-opacity duration-500 group-hover:opacity-100">
            {brand.subtitle}
          </span>
        )}
      </div>
    </RevealOnScroll>
  );
}

export function Brands() {
  return (
    <section className="relative bg-midnight py-24 md:py-32">
      <div className="container-page">
        {/* Heading */}
        <RevealOnScroll className="text-center mb-16 md:mb-20">
          <h2 className="font-display text-3xl md:text-5xl tracking-[0.15em] text-text">
            FAHAMEDUL <span className="text-primary">×</span> BRANDS
          </h2>
        </RevealOnScroll>

        {/* Brand plates */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
          {BRANDS.map((brand, i) => (
            <BrandPlate key={brand.name} brand={brand} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
