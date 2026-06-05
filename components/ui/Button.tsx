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
  "inline-flex items-center justify-center gap-2 label-lg tracking-[0.2em] px-7 py-4 rounded-full transition-colors duration-300";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-midnight hover:bg-primary-light border border-primary",
  ghost:
    "bg-transparent text-text border border-border-strong hover:border-primary hover:text-primary",
  outline:
    "bg-transparent text-primary border border-primary hover:bg-primary hover:text-midnight",
};

export function Button({
  variant = "primary",
  className,
  magnetic = false,
  children,
  ...rest
}: ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <ButtonHover magnetic={magnetic} className="rounded-full">
      <button className={cn(base, variants[variant], className)} {...rest}>
        {children}
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
    <ButtonHover magnetic={magnetic} className="rounded-full">
      <Link href={href} className={cn(base, variants[variant], className)} {...rest}>
        {children}
      </Link>
    </ButtonHover>
  );
}
