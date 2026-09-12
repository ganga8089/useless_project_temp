import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { BabyChef, SpeechBubble } from "@/components/chef";
import { playClick } from "@/lib/click-sound";
import { ingredients } from "@/lib/site-data";

export const Route = createFileRoute("/ingredients")({
  head: () => ({
    meta: [
      { title: "Cheruvakal — Kanjiyum Kariyum" },
      {
        name: "description",
        content:
          "Stones, leaves, flowers, mud and water — the collectible pretend ingredients of a Kerala childhood kitchen.",
      },
      { property: "og:title", content: "Cheruvakal (Ingredients) — Kanjiyum Kariyum" },
      {
        property: "og:description",
        content: "A playful collectible grid of childhood pretend-cooking ingredients.",
      },
    ],
  }),
  component: IngredientsPage,
});

function IngredientsPage() {
  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5">
        <div className="card-soft flex flex-wrap items-center gap-4 bg-sand p-4">
          <BabyChef className="w-24 shrink-0" />
          <SpeechBubble>Muttathu ninnu pericha ente cheruvakal! Kazhikkaruthu ketto.</SpeechBubble>
          <h1 className="ml-auto text-2xl">Cheruvakal</h1>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {ingredients.map((i) => (
            <button
              key={i.name}
              type="button"
              onClick={() => playClick("pop")}
              className="lift card-soft flex flex-col items-center gap-1 p-4 text-center"
              style={{ backgroundColor: i.tint }}
            >
              <span aria-hidden className="text-4xl">
                {i.emoji}
              </span>
              <span className="font-display text-base">{i.name}</span>
              <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {i.nameEn}
              </span>
              <span className="text-xs text-muted-foreground">{i.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
