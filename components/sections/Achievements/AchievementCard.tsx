import type { Achievement } from "@/types";
import { cn } from "@/lib/utils";
import { CardHover } from "@/components/ui/CardHover";

const tierColor: Record<Achievement["tier"], string> = {
  gold: "text-primary border-primary/40",
  silver: "text-[#C0C0C0] border-[#C0C0C0]/30",
  bronze: "text-[#CD7F32] border-[#CD7F32]/40",
  honor: "text-muted border-border-strong",
};

const tierLabel: Record<Achievement["tier"], string> = {
  gold: "Champion",
  silver: "Runner-up",
  bronze: "Podium",
  honor: "Honor",
};

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <CardHover intensity="subtle" className="h-full">
      <article className="group relative p-7 md:p-8 border border-border bg-midnight h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <span
            className={cn(
              "label-sm px-3 py-1 border rounded-full",
              tierColor[achievement.tier],
            )}
          >
            {tierLabel[achievement.tier]}
          </span>
          <span className="font-display text-2xl text-muted group-hover:text-primary transition-colors duration-500">
            {achievement.year}
          </span>
        </div>

        <h3 className="font-display text-2xl md:text-3xl leading-tight text-text mb-3">
          {achievement.title}
        </h3>

        <div className="label-sm text-faint mb-4">
          {achievement.competition}
        </div>

        {achievement.description && (
          <p className="mt-auto text-sm text-muted leading-relaxed">
            {achievement.description}
          </p>
        )}

        <span className="absolute left-0 bottom-0 h-px w-0 bg-primary transition-all duration-700 group-hover:w-full" />
      </article>
    </CardHover>
  );
}
