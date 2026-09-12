import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChefHat, Plus, Sparkles, Trash2, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { BabyChef, SpeechBubble } from "@/components/chef";
import { ingredients as availableIngredients } from "@/lib/site-data";
import { playClick } from "@/lib/click-sound";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create Your Own Recipe — Kanjiyum Kariyum" },
      {
        name: "description",
        content: "Create your custom childhood pretend cooking recipe with leaves, stones, and imagination.",
      },
    ],
  }),
  component: CreateRecipePage,
});

interface CustomRecipe {
  id: string;
  name: string;
  desc: string;
  ingredients: string[];
  cookingTime: string;
}

export function CreateRecipePage() {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [cookingTime, setCookingTime] = useState("5 minute");
  const [myRecipes, setMyRecipes] = useState<CustomRecipe[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("kanjiyum_custom_recipes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleIngredient = (ingName: string) => {
    playClick("pop");
    setSelectedIngredients((prev) =>
      prev.includes(ingName)
        ? prev.filter((i) => i !== ingName)
        : [...prev, ingName]
    );
  };

  const handleSaveRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeName.trim() || selectedIngredients.length === 0) return;

    const newRecipe: CustomRecipe = {
      id: Date.now().toString(),
      name: recipeName.trim(),
      desc: description.trim() || "Sontham imagination recipe!",
      ingredients: selectedIngredients,
      cookingTime,
    };

    const updated = [newRecipe, ...myRecipes];
    setMyRecipes(updated);
    try {
      localStorage.setItem("kanjiyum_custom_recipes", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    playClick("pop");
    setShowSuccess(true);
    setRecipeName("");
    setDescription("");
    setSelectedIngredients([]);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = (id: string) => {
    playClick("tap");
    const updated = myRecipes.filter((r) => r.id !== id);
    setMyRecipes(updated);
    try {
      localStorage.setItem("kanjiyum_custom_recipes", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        {/* Header */}
        <div className="card-soft relative overflow-visible bg-sunny p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:max-w-xl">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-xs font-bold text-wood-dark">
              <ChefHat className="h-4 w-4 text-primary" /> Sontham Recipe Builder
            </span>
            <h1 className="font-display text-3xl text-wood-dark sm:text-4xl">
              Create Your Pretend Recipe 🍃
            </h1>
            <p className="text-sm text-wood-dark/80">
              Pick your garden ingredients (leaves, stones, grass, coconut shells) and create your signature 90s Kali Adukkala dish!
            </p>
          </div>
          <BabyChef pose="wave" className="pointer-events-none absolute -bottom-4 right-4 hidden w-44 sm:block" />
        </div>

        {/* Recipe Form */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <form onSubmit={handleSaveRecipe} className="card-soft flex flex-col gap-5 p-6">
            <h2 className="font-display text-2xl text-wood-dark flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> Recipe Details
            </h2>

            {/* Recipe Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-wood-dark">Recipe Name (Malayalam / English)</label>
              <input
                type="text"
                required
                placeholder="e.g. Chiratta Biriyani, Ila Fry..."
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-wood-dark">Description / Nostalgia Note</label>
              <textarea
                rows={2}
                placeholder="Describe how to cook it in your pretend kitchen..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-sm font-medium outline-none transition focus:border-primary resize-none"
              />
            </div>

            {/* Select Ingredients */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-wood-dark">
                Select Pretend Ingredients ({selectedIngredients.length} picked)
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {availableIngredients.map((ing) => {
                  const selected = selectedIngredients.includes(ing.name);
                  return (
                    <button
                      key={ing.name}
                      type="button"
                      onClick={() => toggleIngredient(ing.name)}
                      className={`flex items-center gap-2 rounded-xl border-2 p-2.5 text-left text-xs font-bold transition ${
                        selected
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-card text-foreground hover:bg-leaf-soft"
                      }`}
                    >
                      <span className="text-lg">{ing.emoji}</span>
                      <span className="truncate">{ing.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cooking Time */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-wood-dark">Cooking Time</label>
              <select
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
                className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
              >
                <option value="2 minute">2 minute (Ultra Fast)</option>
                <option value="5 minute">5 minute (Standard)</option>
                <option value="10 minute">10 minute (Slow Dum)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={!recipeName.trim() || selectedIngredients.length === 0}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-display text-lg font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:brightness-110 active:scale-95 disabled:opacity-50"
            >
              <Plus className="h-5 w-5" />
              <span>Save Recipe to Adukkala</span>
            </button>

            {showSuccess && (
              <div className="flex items-center gap-2 rounded-2xl bg-leaf-soft p-3 text-sm font-bold text-wood-dark animate-bubble-in">
                <CheckCircle2 className="h-5 w-5 text-primary" /> Recipe saved successfully!
              </div>
            )}
          </form>

          {/* Chiratta Playground / My Saved Recipes */}
          <div className="flex flex-col gap-4">
            <div className="card-soft bg-leaf-soft p-5">
              <h3 className="font-display text-xl text-wood-dark flex items-center gap-2">
                🥥 Chiratta Bowl Preview
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Your selected ingredients mixed in the coconut shell:
              </p>

              <div className="mt-4 flex min-h-[120px] flex-wrap items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-wood-light bg-cream p-4 text-center">
                {selectedIngredients.length > 0 ? (
                  selectedIngredients.map((name) => {
                    const found = availableIngredients.find((i) => i.name === name);
                    return (
                      <span
                        key={name}
                        className="inline-flex items-center gap-1 rounded-full bg-card px-3 py-1.5 text-xs font-bold text-wood-dark shadow-sm animate-bounce"
                      >
                        {found?.emoji} {name}
                      </span>
                    );
                  })
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Tap ingredients above to add them to your Chiratta bowl! 🍃
                  </p>
                )}
              </div>
            </div>

            {/* My Saved Recipes List */}
            <div className="card-soft flex flex-col gap-3 p-5">
              <h3 className="font-display text-xl text-wood-dark">
                My Custom Recipes ({myRecipes.length})
              </h3>

              {myRecipes.length === 0 ? (
                <p className="text-xs text-muted-foreground">No custom recipes yet. Create your first one above!</p>
              ) : (
                <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {myRecipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-sm text-wood-dark truncate">{recipe.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{recipe.desc}</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {recipe.ingredients.map((ing) => (
                            <span key={ing} className="rounded-md bg-leaf-soft px-1.5 py-0.5 text-[10px] font-semibold text-wood-dark">
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDelete(recipe.id)}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-destructive hover:bg-destructive/10"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
