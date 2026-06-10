import { Bebas_Neue, Chakra_Petch, JetBrains_Mono } from "next/font/google";

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

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
