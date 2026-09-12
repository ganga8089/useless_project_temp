import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { BabyChef, SpeechBubble } from "@/components/chef";
import { FavoriteHeart } from "@/components/ui-bits";
import { playClick } from "@/lib/click-sound";
import { recipes } from "@/lib/site-data";
import { getRecipeImage } from "@/lib/recipe-images";

const recipeEmojis: Record<string, string> = {
  "ila-curry": "🍃",
  "manchatti-payasam": "🍯",
  "kallu-biryani": "🪨",
  "poovu-juice": "🌸",
  "manal-dosa": "🥞",
  "chiratta-sambar": "🥥",
};

export const Route = createFileRoute("/recipes/")({
  head: () => ({
    meta: [
      { title: "Recipes — Kanjiyum Kariyum" },
      {
        name: "description",
        content:
          "Muttathe pretend recipes: ila curry, kallu biryani, manchatti payasam and more childhood classics.",
      },
      { property: "og:title", content: "Recipes — Kanjiyum Kariyum" },
      {
        property: "og:description",
        content: "Pretend-cooking recipes made of leaves, stones, mud and imagination.",
      },
    ],
  }),
  component: RecipesPage,
});

function RecipesPage() {
  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <div className="card-soft flex flex-wrap items-center gap-4 bg-leaf-soft p-4">
          <BabyChef pose="wave" className="w-24 shrink-0" />
          <SpeechBubble>Ethaa ninakku ishtam? Ella recipes-um ivide undu!</SpeechBubble>
          <h1 className="ml-auto text-2xl font-display text-wood-dark">Muttathe Recipes</h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recipes.map((r) => {
            const imgSrc = getRecipeImage(r.slug);
            const emoji = recipeEmojis[r.slug] || "🍃";

            return (
              <article
                key={r.slug}
                className="lift card-soft flex flex-col overflow-hidden p-0"
                style={{ backgroundColor: r.tint }}
              >
                {/* Header (Image if available, otherwise Icon Banner) */}
                {imgSrc ? (
                  <div className="relative h-48 w-full overflow-hidden bg-cream">
                    <img
                      src={imgSrc}
                      alt={r.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute right-3 top-3 rounded-full bg-card/90 p-1 shadow-sm backdrop-blur">
                      <FavoriteHeart slug={r.slug} />
                    </div>
                  </div>
                ) : (
                  <div className="relative flex h-32 w-full items-center justify-center bg-cream/40 p-4">
                    <span className="text-6xl animate-bounce">{emoji}</span>
                    <div className="absolute right-3 top-3 rounded-full bg-card/90 p-1 shadow-sm backdrop-blur">
                      <FavoriteHeart slug={r.slug} />
                    </div>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="truncate text-xl font-bold text-wood-dark">{r.name}</h2>
                      <p className="text-xs text-muted-foreground">{r.nameEn}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                    <span className="inline-flex items-center gap-1 rounded-full bg-background/80 px-3 py-1 text-wood-dark shadow-sm">
                      <Clock className="h-3.5 w-3.5 text-primary" /> {r.time}
                    </span>
                    <span className="rounded-full bg-background/80 px-3 py-1 text-wood-dark shadow-sm">{r.level}</span>
                  </div>
                  <Link
                    to={`/recipes/${r.slug}`}
                    onClick={() => playClick("tap")}
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 font-display text-sm font-bold text-primary-foreground transition active:scale-95 hover:brightness-110 shadow-[var(--shadow-soft)]"
                  >
                    Recipe kaanaam →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
