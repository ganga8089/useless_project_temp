import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, Star } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { BabyChef, SpeechBubble } from "@/components/chef";
import { FavoriteHeart, SectionTitle } from "@/components/ui-bits";
import { playClick } from "@/lib/click-sound";
import { recipes } from "@/lib/site-data";
import { getRecipeImage } from "@/lib/recipe-images";

export const Route = createFileRoute("/recipes/$slug")({
  loader: ({ params }) => {
    const recipe = recipes.find((r) => r.slug === params.slug);
    if (!recipe) throw notFound();
    return recipe;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Recipe"} — Kanjiyum Kariyum` },
      { name: "description", content: loaderData?.descEn ?? "A pretend childhood recipe." },
      { property: "og:title", content: `${loaderData?.name ?? "Recipe"} — Kanjiyum Kariyum` },
      { property: "og:description", content: loaderData?.descEn ?? "A pretend childhood recipe." },
    ],
  }),
  component: RecipePage,
});

function RecipePage() {
  const recipe = Route.useLoaderData();
  const related = recipes.filter((r) => r.slug !== recipe.slug).slice(0, 3);
  const imgSrc = getRecipeImage(recipe.slug);

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5">
        <section className="card-soft overflow-hidden p-0" style={{ backgroundColor: recipe.tint }}>
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={`${recipe.nameEn} made with leaves and pebbles`}
              width={1024}
              height={704}
              className="h-56 w-full object-cover sm:h-72"
            />
          ) : (
            <div className="flex h-36 w-full items-center justify-center bg-cream/40 p-4">
              <span className="text-6xl animate-bounce">🍃</span>
            </div>
          )}
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 p-4 sm:flex sm:items-center">
            <div className="min-w-0">
              <h1 className="truncate text-2xl sm:text-3xl">{recipe.name}</h1>
              <p className="text-sm text-muted-foreground">{recipe.desc}</p>
            </div>
            <FavoriteHeart slug={recipe.slug} />
          </div>
          <div className="flex flex-wrap gap-2 px-4 pb-4 text-xs font-bold">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1">
              <Clock className="h-3.5 w-3.5" /> {recipe.time}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-sunny px-3 py-1">
              <Star className="h-3.5 w-3.5" /> {recipe.level}
            </span>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="card-soft bg-leaf-soft p-4">
            <SectionTitle icon="🍃" title="Cheruvakal (Ingredients)" />
            <ul className="flex flex-col gap-2">
              {recipe.ingredients.map((i) => (
                <li key={i} className="rounded-2xl bg-card px-3 py-2 text-sm font-semibold">
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-soft bg-peach p-4">
            <SectionTitle icon="🥄" title="Pachaka saamagrikal (Tools)" />
            <ul className="flex flex-col gap-2">
              {recipe.tools.map((t) => (
                <li key={t} className="rounded-2xl bg-card px-3 py-2 text-sm font-semibold">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="card-soft p-4">
          <SectionTitle icon="📖" title="Undaakkunna vidham (Method)" />
          <ol className="flex flex-col gap-3">
            {recipe.steps.map((s, i) => (
              <li
                key={s}
                className="flex items-start gap-3 rounded-2xl border border-border bg-cream p-3"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-display text-primary-foreground">
                  {i + 1}
                </span>
                <p className="min-w-0 text-sm font-semibold">{s}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="card-soft flex flex-wrap items-center gap-4 bg-sunny p-4">
          <BabyChef className="w-28 shrink-0" />
          <SpeechBubble className="max-w-md">{recipe.chefTip}</SpeechBubble>
        </section>

        <section>
          <SectionTitle icon="🌿" title="Ithu pole vere recipes" action={{ label: "Ellaam", to: "/recipes" }} />
          <div className="grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/recipes/${r.slug}`}
                onClick={() => playClick("tap")}
                className="lift card-soft p-4"
                style={{ backgroundColor: r.tint }}
              >
                <h3 className="truncate text-lg">{r.name}</h3>
                <p className="text-xs text-muted-foreground">{r.time}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
