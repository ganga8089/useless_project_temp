import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Award, Lock, CheckCircle2, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { BabyChef } from "@/components/chef";
import { achievements } from "@/lib/site-data";
import { useUserProfile, calculateAgeAndEra } from "@/lib/user-profile";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements & Badges — Kanjiyum Kariyum" },
      {
        name: "description",
        content: "Track your pretend chef achievements and nostalgia badges.",
      },
    ],
  }),
  component: AchievementsPage,
});

export function AchievementsPage() {
  const { profile } = useUserProfile();
  const { era, title: eraTitle } = profile?.dob
    ? calculateAgeAndEra(profile.dob)
    : { era: "90s Adukkala Kid", eraTitle: "Pretend Chef" };

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        {/* Header */}
        <div className="card-soft relative overflow-visible bg-sunny p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:max-w-xl">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-xs font-bold text-wood-dark">
              <Trophy className="h-4 w-4 text-primary" /> Sammanangal & Badges
            </span>
            <h1 className="font-display text-3xl text-wood-dark sm:text-4xl">
              Achievements & Trophies 🏆
            </h1>
            <p className="text-sm text-wood-dark/80">
              Collect badges as you explore recipes, play quizzes, and build custom pretend dishes!
            </p>
          </div>
          <BabyChef pose="wave" className="pointer-events-none absolute -bottom-4 right-4 hidden w-44 sm:block" />
        </div>

        {/* User Era Special Badge */}
        <div className="card-soft bg-sand p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-3xl bg-primary text-primary-foreground font-display text-3xl shadow-[var(--shadow-soft)]">
              👑
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground">Your Special Era Badge</p>
              <h3 className="font-display text-2xl text-wood-dark">{eraTitle}</h3>
              <p className="text-xs font-bold text-primary">{era}</p>
            </div>
          </div>
          <Sparkles className="h-8 w-8 text-primary animate-pulse hidden sm:block" />
        </div>

        {/* Badges Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a) => (
            <div
              key={a.title}
              className={`card-soft flex items-center gap-4 p-4 border-2 transition ${
                a.got
                  ? "border-primary bg-cream"
                  : "border-border bg-card/60 opacity-60"
              }`}
            >
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-leaf-soft text-3xl shadow-sm">
                {a.emoji}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-bold text-base text-wood-dark truncate">{a.title}</h4>
                  {a.got ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
