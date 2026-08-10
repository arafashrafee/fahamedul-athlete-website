import {
  Bebas_Neue,
  Chakra_Petch,
  JetBrains_Mono,
  Newsreader,
} from "next/font/google";

export const fontDisplay = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const fontSans = Chakra_Petch({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/* Prose face — editorial serif for running copy. UI chrome (labels,
   buttons, stats) stays on the mono/display pair. */
export const fontBody = Newsreader({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
