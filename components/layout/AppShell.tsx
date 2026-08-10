"use client";

import { useState, useCallback, useEffect } from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [splashDone, setSplashDone] = useState(false);
  const [SplashComp, setSplashComp] = useState<React.ComponentType<{
    onComplete: () => void;
  }> | null>(null);

  useEffect(() => {
    import("./SplashScreen").then((m) => {
      setSplashComp(() => m.SplashScreen);
    });
  }, []);

  /**
   * A reload always lands on the hero, never where the reader left off.
   * Two things would otherwise restore the old position: the browser's own
   * scroll restoration, and the #section the nav drawer pushes into the URL.
   * Deep links still work — a first visit to /#press is left alone.
   */
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const isReload = nav?.type === "reload";

    if (!isReload && window.location.hash) return;

    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }

    const toTop = () => {
      window.__lenis?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    };

    toTop();
    /* Restoration can land after hydration, so re-assert once on load. */
    window.addEventListener("load", toTop, { once: true });
    return () => window.removeEventListener("load", toTop);
  }, []);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  const showSplash = SplashComp && !splashDone;

  return (
    <>
      {showSplash && <SplashComp onComplete={handleSplashComplete} />}
      {children}
    </>
  );
}
