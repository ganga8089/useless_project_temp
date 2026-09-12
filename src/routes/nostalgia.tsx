import { createFileRoute } from "@tanstack/react-router";
import { Notebook, Sparkles, Volume2, Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { BabyChef, SpeechBubble } from "@/components/chef";
import { memories } from "@/lib/site-data";
import { playClick } from "@/lib/click-sound";

export const Route = createFileRoute("/nostalgia")({
  head: () => ({
    meta: [
      { title: "Nostalgia — Kanjiyum Kariyum" },
      {
        name: "description",
        content: "Childhood memories and stories from 90s Kerala Kali Adukkala.",
      },
    ],
  }),
  component: NostalgiaPage,
});

export function NostalgiaPage() {
  const [likedMemories, setLikedMemories] = useState<Record<number, boolean>>({});

  const toggleLike = (index: number) => {
    playClick("pop");
    setLikedMemories((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        {/* Header */}
        <div className="card-soft relative overflow-visible bg-peach p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:max-w-xl">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-xs font-bold text-wood-dark">
              <Notebook className="h-4 w-4 text-primary" /> Pazhaya Ormmakal
            </span>
            <h1 className="font-display text-3xl text-wood-dark sm:text-4xl">
              Nostalgia & Chef Stories 📖
            </h1>
            <p className="text-sm text-wood-dark/80">
              Cheriya kallukal, oru ila, kurachu vellam — memories of lazy sunny afternoons playing kitchen in 90s Kerala.
            </p>
          </div>
          <BabyChef pose="sitting" className="pointer-events-none absolute -bottom-4 right-4 hidden w-44 sm:block" />
        </div>

        {/* Stories Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {memories.map((m, idx) => (
            <div
              key={m.title}
              className="card-soft flex flex-col justify-between gap-4 p-5 transition hover:shadow-[var(--shadow-lift)]"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-leaf-soft px-3 py-1 text-xs font-bold text-wood-dark">
                    #{m.tag}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleLike(idx)}
                    className="flex items-center gap-1 text-xs font-bold text-destructive"
                  >
                    <Heart className={`h-4 w-4 ${likedMemories[idx] ? "fill-destructive" : ""}`} />
                  </button>
                </div>

                <h3 className="font-display text-xl text-wood-dark">{m.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{m.text}</p>
              </div>

              <div className="rounded-2xl border border-dashed border-wood-light bg-sand/60 p-3 text-xs font-medium text-wood-dark flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary shrink-0" />
                <span>"Cheriya recipes… valiya ormmakal!"</span>
              </div>
            </div>
          ))}
        </div>

        {/* Baby Chef Dialogue Corner */}
        <div className="card-soft bg-sand p-6 flex flex-col items-center text-center gap-4 sm:flex-row sm:text-left">
          <BabyChef pose="wave" className="w-32 shrink-0" />
          <div className="flex flex-col gap-2">
            <SpeechBubble tail="left" className="w-full max-w-none">
              “Ningo kuttikkaalathu ila curry undaakkiyittundo? Enkil athu thanne aanu lokathile ettavum nalla recipe!”
            </SpeechBubble>
            <p className="text-xs text-muted-foreground mt-1">
              (Did you ever make leaf curry in your childhood? Then that is truly the best recipe in the world!)
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
