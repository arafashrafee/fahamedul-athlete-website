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
