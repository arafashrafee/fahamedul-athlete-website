import { cn } from "@/lib/utils";

type Variant = "default" | "primary" | "green";

const variants: Record<Variant, string> = {
  default: "text-muted",
  primary: "text-primary",
  green: "text-[--color-bd-green]",
};

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
}) {
  return (
    <span
      className={cn(
        "badge-cyber label-sm tracking-[0.2em]",
        variants[variant],
        className,
      )}
    >
      {/* edge */}
      <span
        aria-hidden
        className="badge-cyber-shape absolute inset-0 bg-current opacity-45"
      />
      {/* fill */}
      <span
        aria-hidden
        className="badge-cyber-shape absolute inset-px bg-midnight"
      />
      {/* scanlines */}
      <span
        aria-hidden
        className="badge-cyber-shape badge-cyber-scan absolute inset-px pointer-events-none"
      />

      <span className="relative z-10 flex items-center gap-2">
        <span aria-hidden className="badge-cyber-dot" />
        {children}
      </span>
    </span>
  );
}
