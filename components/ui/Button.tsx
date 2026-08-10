import Link from "next/link";
import { cn } from "@/lib/utils";
import { ButtonHover } from "./ButtonHover";

type Variant = "primary" | "ghost" | "outline";

type ButtonBaseProps = {
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
  children: React.ReactNode;
};

const base =
  "btn-cyber group inline-flex items-center justify-center label-lg tracking-[0.2em] px-10 py-4";

/* Outer clipped layer — reads as the 1px neon border. */
const frame: Record<Variant, string> = {
  primary: "bg-primary group-hover:bg-primary-bright",
  ghost: "bg-border-strong group-hover:bg-primary",
  outline: "bg-primary group-hover:bg-primary-bright",
};

/* Inner clipped layer — the plate fill. */
const fill: Record<Variant, string> = {
  primary: "bg-primary group-hover:bg-primary-bright",
  ghost: "bg-midnight/60 backdrop-blur-sm",
  outline: "bg-midnight group-hover:bg-primary/10",
};

const text: Record<Variant, string> = {
  primary: "text-midnight",
  ghost: "text-text group-hover:text-primary",
  outline: "text-primary",
};

/* HUD chrome: border + fill plates, scanline, corner bracket,
   hazard stripes, detached underline, edge stud. */
function CyberSkin({ variant }: { variant: Variant }) {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          "btn-cyber-shape absolute inset-0 -z-20 transition-colors duration-300",
          frame[variant],
        )}
      />
      <span
        aria-hidden
        className={cn(
          "btn-cyber-shape absolute inset-[1.5px] -z-10 overflow-hidden transition-colors duration-300",
          fill[variant],
        )}
      />

      {/* Corner bracket — top-left, echoes the 45° cut */}
      <span
        aria-hidden
        className="absolute -left-[6px] -top-[6px] w-3.5 h-3.5 border-l-2 border-t-2 border-primary/70 transition-colors duration-300 group-hover:border-primary"
      />

      {/* Hazard stripes — tucked above the bottom-right cut */}
      <span
        aria-hidden
        className="absolute right-5 bottom-[4px] w-8 h-[5px] opacity-50 transition-opacity duration-300 group-hover:opacity-90"
        style={{
          background:
            "repeating-linear-gradient(-55deg, currentColor 0 2px, transparent 2px 5px)",
        }}
      />

      {/* Detached accent line — floats under the bottom-left edge */}
      <span
        aria-hidden
        className="absolute left-4 -bottom-[7px] h-[2px] w-2/5 bg-primary/80 glow-sm transition-colors duration-300 group-hover:bg-primary"
      />

      {/* Edge stud — tiny square on the stepped right shelf */}
      <span
        aria-hidden
        className="absolute right-[10px] top-[2px] w-[3px] h-[3px] bg-primary/90"
      />
    </>
  );
}

export function Button({
  variant = "primary",
  className,
  magnetic = false,
  children,
  ...rest
}: ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <ButtonHover magnetic={magnetic}>
      <button className={cn(base, text[variant], className)} {...rest}>
        <CyberSkin variant={variant} />
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </button>
    </ButtonHover>
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  magnetic = false,
  href,
  children,
  ...rest
}: ButtonBaseProps & React.ComponentProps<typeof Link>) {
  return (
    <ButtonHover magnetic={magnetic}>
      <Link href={href} className={cn(base, text[variant], className)} {...rest}>
        <CyberSkin variant={variant} />
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </Link>
    </ButtonHover>
  );
}
