import { Hero } from "@/components/sections/Hero/Hero";
import { Identity } from "@/components/sections/Identity/Identity";
import { CareerHighlights } from "@/components/sections/CareerHighlights/CareerHighlights";
import { Career } from "@/components/sections/Career/Career";
import { Story } from "@/components/sections/Story/Story";
import { NationalTeam } from "@/components/sections/NationalTeam/NationalTeam";
import { Press } from "@/components/sections/Press/Press";
import { Brands } from "@/components/sections/Brands/Brands";
import { Contact } from "@/components/sections/Contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Identity />
      <CareerHighlights />
      <Career />
      <Story />
      <Press />
      <NationalTeam />
      <Contact />
      <Brands />
    </>
  );
}
