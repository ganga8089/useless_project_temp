import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Star } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { AppShell } from "@/components/app-shell";
import { BabyChef, SpeechBubble } from "@/components/chef";
import {
  ArrowPill,
  ClickLink,
  FavoriteHeart,
  SectionTitle,
  WoodSign,
} from "@/components/ui-bits";
import { playClick } from "@/lib/click-sound";
import { recipes } from "@/lib/site-data";
import { useUserProfile } from "@/lib/user-profile";
import { getRecipeImage } from "@/lib/recipe-images";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — Kanjiyum Kariyum" },
      {
        name: "description",
        content:
          "Kanjiyum Kariyum: a nostalgic Kerala childhood pretend-cooking recipe book with leaves, stones and a Baby Chef guide.",
      },
    ],
  }),
  component: Home,
});

const quickCards = [
  { to: "/recipes", emoji: "🍲", title: "Recipes", sub: "Muttathe pachakam", tint: "var(--sand)" },
  { to: "/ingredients", emoji: "🍃", title: "Ingredients", sub: "Kallum ilayum", tint: "var(--leaf-soft)" },
  { to: "/favorites", emoji: "❤️", title: "Favorites", sub: "Ninte ishtangal", tint: "var(--blush)" },
  { to: "/random", emoji: "🎲", title: "Random Recipe", sub: "Ethelum onnu", tint: "var(--sky-soft)" },
  { to: "/create", emoji: "👩‍🍳", title: "Create Your Own", sub: "Sontham recipe", tint: "var(--sunny)" },
  { to: "/nostalgia", emoji: "📖", title: "Nostalgia", sub: "Pazhaya ormmakal", tint: "var(--peach)" },
];

const funCorner = [
  { to: "/quiz", emoji: "💡", title: "Mini Quiz", tint: "var(--blush)" },
  { to: "/achievements", emoji: "🏆", title: "Achievements", tint: "var(--sunny)" },
  { to: "/ingredients", emoji: "🍃", title: "Ingredient of the Day", tint: "var(--leaf-soft)" },
  { to: "/nostalgia", emoji: "💬", title: "Chef Talks", tint: "var(--sky-soft)" },
];

function Home() {
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const featured = recipes[featuredIdx] || recipes[0];
  const { profile } = useUserProfile();
  const featuredImg = getRecipeImage(featured.slug);

  const rotateFeatured = () => {
    playClick("pop");
    setFeaturedIdx((prev) => (prev + 1) % recipes.length);
  };

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        {/* HERO BANNER */}
        <section className="relative overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
          <img
            src={heroBg}
            alt="Sunny Kerala village courtyard with palms and a tiled-roof house"
            width={1920}
            height={912}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/80 via-cream/30 to-cream/70" />

          <div className="relative grid gap-6 px-4 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:py-12">
            <div className="relative flex flex-col items-center">
              <SpeechBubble tail="bottom" className="z-10 mb-[-8px] self-start sm:ml-6">
                {profile?.name ? `Hi Chef ${profile.name}! Enthaa innu undaakkaan pokunnathu?` : "Hi! Enthaa innu undaakkaan pokunnathu?"}
                <span className="ml-2" aria-hidden>
                  🔊
                </span>
              </SpeechBubble>
              <BabyChef priority className="w-56 sm:w-72 lg:w-80" />
            </div>

            <div className="flex flex-col items-center gap-4 text-center">
              <WoodSign className="w-full max-w-lg">
                <h1 className="font-display text-3xl leading-tight text-wood-dark sm:text-5xl">
                  Kanjiyum Kariyum
                </h1>
                <p className="mt-1 font-display text-lg text-wood-dark/90 sm:text-2xl">
                  Oru kuttikkaala pachaka pusthakam
                </p>
                <p className="mt-2 text-sm text-wood-dark/80">
                  Sankalpa recipes. Yathartha ormmakal.
                </p>
              </WoodSign>
              <p className="hand-text max-w-md text-2xl text-primary">
                Cheriya recipes… valiya ormmakal!
              </p>
              <ClickLink to="/recipes" className="px-7 py-3.5 text-lg">
                Recipes Kaanaam 🍃
              </ClickLink>
            </div>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          {quickCards.map((c) => (
            <Link
              key={c.title}
              to={c.to}
              onClick={() => playClick("pop")}
              className="lift card-soft flex flex-col gap-2 p-4"
              style={{ backgroundColor: c.tint }}
            >
              <span aria-hidden className="text-3xl">
                {c.emoji}
              </span>
              <span className="font-display text-base leading-tight">{c.title}</span>
              <span className="text-xs text-muted-foreground">{c.sub}</span>
              <ArrowPill />
            </Link>
          ))}
        </section>

        {/* MAIN GRID */}
        <section className="grid gap-4 xl:grid-cols-[1.1fr_1fr_1fr]">
          {/* Featured */}
          <div className="card-soft p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <SectionTitle icon="🍃" title="Featured Recipe" action={{ label: "View all", to: "/recipes" }} />
                <button
                  type="button"
                  onClick={rotateFeatured}
                  className="text-xs font-bold text-primary hover:underline"
                  title="Next featured recipe"
                >
                  🎲 Change
                </button>
              </div>

              {featuredImg ? (
                <img
                  src={featuredImg}
                  alt={featured.name}
                  width={1024}
                  height={704}
                  loading="lazy"
                  className="h-48 w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="flex h-48 w-full items-center justify-center rounded-2xl bg-leaf-soft p-4">
                  <span className="text-6xl animate-bounce">🍃</span>
                </div>
              )}

              <h3 className="mt-3 text-xl font-bold text-wood-dark">{featured.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{featured.desc}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 font-semibold">
                  <Clock className="h-4 w-4" /> {featured.time}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-sunny px-3 py-1 font-semibold">
                  <Star className="h-4 w-4" /> {featured.level}
                </span>
                <div className="ml-auto">
                  <FavoriteHeart slug={featured.slug} />
                </div>
              </div>
            </div>

            <ClickLink to={`/recipes/${featured.slug}`} className="mt-4 w-full">
              Recipe kaanaam →
            </ClickLink>
          </div>

          {/* Baby chef card */}
          <div className="card-soft relative overflow-visible bg-leaf-soft p-4 pt-10">
            <SectionTitle icon="👑" title="Innathe Special" />
            <BabyChef
              pose="wave"
              className="pointer-events-none absolute -top-10 right-2 w-28 sm:w-32"
            />
            <SpeechBubble tail="bottom" className="max-w-none">
              Ellaam ready aano? Vaa, namukku innathe recipe nokkaam!
            </SpeechBubble>
            <div className="mt-4 rounded-3xl border-2 border-dashed border-wood-light bg-cream p-4">
              <p className="hand-text text-2xl leading-snug text-wood-dark">
                “Nallа bhakshanam alla… nalla koottukaar aanu വലുത്.”
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Good food, happier friends.
              </p>
            </div>
            <ClickLink to="/create" className="mt-4 w-full">
              Sontham recipe undaakkam 🥄
            </ClickLink>
          </div>

          {/* Fun corner */}
          <div className="card-soft p-4">
            <SectionTitle icon="🌿" title="Fun Corner" />
            <div className="grid grid-cols-2 gap-3">
              {funCorner.map((f) => (
                <Link
                  key={f.title}
                  to={f.to}
                  onClick={() => playClick("pop")}
                  className="lift flex flex-col gap-2 rounded-2xl p-3"
                  style={{ backgroundColor: f.tint }}
                >
                  <span aria-hidden className="text-2xl">
                    {f.emoji}
                  </span>
                  <span className="text-sm font-bold leading-tight">{f.title}</span>
                  <ArrowPill />
                </Link>
              ))}
            </div>
            <div className="mt-3 rounded-2xl bg-sand p-3 text-sm">
              <p className="font-bold">Ingredient of the day</p>
              <p className="text-muted-foreground">
                Chiratta 🥥 — nammude ettavum nalla pathram.
              </p>
            </div>
          </div>
        </section>

        {/* SAFETY BANNER */}
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-peach px-5 py-4">
          <p className="flex min-w-0 items-center gap-2 text-sm font-semibold">
            <span aria-hidden className="text-xl animate-leaf-sway">
              🍃
            </span>
            Ithokke pretend ingredients aanu. Kazhikkaruthu ketto!
            <span className="text-muted-foreground">
              (Pretend ingredients — please don’t eat them.)
            </span>
          </p>
          <p className="hand-text text-2xl text-primary">Prakruthi innu, ormmakal ennum!</p>
        </section>
      </div>
    </AppShell>
  );
}
