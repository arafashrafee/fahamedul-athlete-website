import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Bookings, press, and partnership inquiries for Fahamedul Islam.",
};

export default function ContactPage() {
  return (
    <div className="pt-[var(--header-h)]">
      <Contact />
    </div>
  );
}
