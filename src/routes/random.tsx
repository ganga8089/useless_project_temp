import { createFileRoute, Link } from "@tanstack/react-router";
import { Dices } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { BabyChef, SpeechBubble } from "@/components/chef";
import { ClickButton } from "@/components/ui-bits";
import { playClick } from "@/lib/click-sound";
import { recipes } from "@/lib/site-data";

export const Route = createFileRoute("/random")({
  head: () => ({
    meta: [
      { title: "Ethelum Onnu — Kanjiyum Kariyum" },
      { name: "description", content: "Let the Baby Chef pick a random pretend recipe for today's play kitchen." },
      { property: "og:title", content: "Random Recipe — Kanjiyum Kariyum" },
      { property: "og:description", content: "Roll the dice and cook whatever the Baby Chef picks." },
    ],
  }),
  component: RandomPage,
});

function RandomPage() {
  const [pick, setPick] = useState(recipes[2]);

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-[900px] flex-col items-center gap-5 text-center">
        <h1 className="text-2xl">Ethelum onnu 🎲</h1>

        <div className="card-soft w-full bg-sky-soft p-6">
          <div className="flex flex-col items-center gap-3">
            <SpeechBubble tail="bottom">Innu namukku ithu undaakkam!</SpeechBubble>
            <BabyChef pose="wave" className="w-40" />
          </div>
          <div
            className="mx-auto mt-4 max-w-md rounded-3xl border-2 border-dashed border-wood-light p-5"
            style={{ backgroundColor: pick.tint }}
          >
            <h2 className="text-2xl">{pick.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{pick.desc}</p>
            <Link
              to={`/recipes/${pick.slug}`}
              onClick={() => playClick("tap")}
              className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 font-display font-bold text-primary-foreground"
            >
              Recipe kaanaam →
            </Link>
          </div>
          <ClickButton
            sound="pop"
            className="mt-5"
            onClick={() => setPick(recipes[Math.floor(Math.random() * recipes.length)])}
          >
            <Dices className="h-5 w-5" /> Vere onnu edukku
          </ClickButton>
        </div>
      </div>
    </AppShell>
  );
}
