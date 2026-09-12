import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { BabyChef, SpeechBubble } from "@/components/chef";
import { ClickLink, FavoriteHeart, readFavorites } from "@/components/ui-bits";
import { playClick } from "@/lib/click-sound";
import { recipes } from "@/lib/site-data";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Ishtappettava — Kanjiyum Kariyum" },
      { name: "description", content: "Your saved pretend recipes from the childhood courtyard kitchen." },
      { property: "og:title", content: "Favorites — Kanjiyum Kariyum" },
      { property: "og:description", content: "The pretend recipes you loved the most." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setSlugs(readFavorites());
    sync();
    window.addEventListener("kk-fav-change", sync);
    return () => window.removeEventListener("kk-fav-change", sync);
  }, []);

  const list = recipes.filter((r) => slugs.includes(r.slug));

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5">
        <h1 className="text-2xl">Ishtappettava ❤️</h1>

        {list.length === 0 ? (
          <div className="card-soft flex flex-col items-center gap-4 bg-blush p-8 text-center">
            <BabyChef className="w-40" />
            <SpeechBubble tail="bottom">
              Ivide onnumilla! Oru recipe-inte heart amarthiyaal ivide varum.
            </SpeechBubble>
            <ClickLink to="/recipes">Recipes nokkaam →</ClickLink>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((r) => (
              <article key={r.slug} className="lift card-soft p-4" style={{ backgroundColor: r.tint }}>
                <div className="flex items-start justify-between gap-2">
                  <h2 className="truncate text-xl">{r.name}</h2>
                  <FavoriteHeart slug={r.slug} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                <Link
                  to={`/recipes/${r.slug}`}
                  onClick={() => playClick("tap")}
                  className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 font-display text-sm font-bold text-primary-foreground"
                >
                  Recipe kaanaam →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
