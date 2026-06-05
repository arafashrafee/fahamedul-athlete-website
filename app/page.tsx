import { Hero } from "@/components/sections/Hero/Hero";
import { StatsBar } from "@/components/sections/StatsBar/StatsBar";
import { SectionNav } from "@/components/sections/SectionNav/SectionNav";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <SectionNav />
    </>
  );
}
