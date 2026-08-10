export type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

export type CareerEntry = {
  id: string;
  club: string;
  league?: string;
  country: string;
  yearStart: number;
  yearEnd: number | "Present";
  /** "—" for spells where no official tally is published (youth academy). */
  appearances: number | "—";
  goals: number | "—";
  logo?: string;
  image?: string;
  notes?: string;
};

export type Achievement = {
  id: string;
  title: string;
  year: number;
  competition: string;
  tier: "gold" | "silver" | "bronze" | "honor";
  description?: string;
};

export type Highlight = {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration?: string;
  date?: string;
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  aspect: "portrait" | "landscape" | "square";
};

export type NationalTeamStats = {
  caps: number;
  goals: number;
  debutDate: string;
  debutOpponent: string;
};
