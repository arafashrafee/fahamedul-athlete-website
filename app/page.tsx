import { Hero } from "@/components/sections/Hero/Hero";
import { StatsBar } from "@/components/sections/StatsBar/StatsBar";
import { Identity } from "@/components/sections/Identity/Identity";
import { Career } from "@/components/sections/Career/Career";
import { Highlights } from "@/components/sections/Highlights/Highlights";
import { Gallery } from "@/components/sections/Gallery/Gallery";
import { Achievements } from "@/components/sections/Achievements/Achievements";
import { NationalTeam } from "@/components/sections/NationalTeam/NationalTeam";
import { Contact } from "@/components/sections/Contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Identity />
      <Career />
      <Highlights />
      <Gallery />
      <Achievements />
      <NationalTeam />
      <Contact />
    </>
  );
}
