import { cn } from "@/lib/utils";

type Variant = "default" | "primary" | "green";

const variants: Record<Variant, string> = {
  default: "border-border-strong text-muted",
  primary: "border-primary/40 text-primary",
  green: "border-bd-green/40 text-[--color-bd-green]",
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
        "inline-flex items-center gap-2 px-3 py-1 rounded-full border label-sm tracking-[0.2em]",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
