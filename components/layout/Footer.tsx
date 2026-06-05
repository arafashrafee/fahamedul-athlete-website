import { NAV_LINKS, SOCIAL_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border bg-midnight">
      <div className="container-page py-20">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12">
          <div>
            <div className="font-display text-6xl md:text-8xl leading-none tracking-tight">
              {SITE.shortName.toUpperCase()}
              <span className="text-primary">.</span>
            </div>
            <p className="mt-6 max-w-sm text-sm text-muted leading-relaxed">
              {SITE.tagline}
            </p>
          </div>

          <div>
            <h4 className="label-sm text-faint mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-sm text-faint mb-5">
              Connect
            </h4>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {s.label} — {s.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-faint">
          <span>© {year} {SITE.name}. All rights reserved.</span>
          <span>Made with care · Bangladesh</span>
        </div>
      </div>
    </footer>
  );
}
