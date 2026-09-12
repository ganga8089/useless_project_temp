import { useState, useEffect } from "react";
import { Volume2, X } from "lucide-react";
import { playClick } from "@/lib/click-sound";
import { cn } from "@/lib/utils";
import {
  toggleRain,
  toggleBirds,
  toggleClinks,
  getAudioStates,
} from "@/lib/ambient-sound";

export function AmbientSoundWidget({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [states, setStates] = useState({ rain: false, birds: false, clinks: false });

  useEffect(() => {
    setStates(getAudioStates());
  }, [isOpen]);

  const toggleTrack = (type: "rain" | "birds" | "clinks") => {
    playClick("tap");
    if (type === "rain") {
      const active = toggleRain();
      setStates((s) => ({ ...s, rain: active }));
    } else if (type === "birds") {
      const active = toggleBirds();
      setStates((s) => ({ ...s, birds: active }));
    } else if (type === "clinks") {
      const active = toggleClinks();
      setStates((s) => ({ ...s, clinks: active }));
    }
  };

  const isAnyActive = states.rain || states.birds || states.clinks;

  return (
    <div className={cn("relative z-30", className)}>
      <button
        type="button"
        onClick={() => {
          playClick("pop");
          setIsOpen((prev) => !prev);
        }}
        className={cn(
          "flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold transition shadow-[var(--shadow-soft)] backdrop-blur active:scale-95 sm:text-sm",
          isAnyActive
            ? "border-primary bg-primary/20 text-wood-dark animate-pulse"
            : "border-border bg-card/90 text-wood-dark hover:bg-leaf-soft"
        )}
        title="90s Kerala Adukkala Ambient Soundboard"
      >
        <Volume2 className={cn("h-4 w-4 shrink-0", isAnyActive && "text-primary")} />
        <span className="font-display">Sound Effects</span>
        {isAnyActive && (
          <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-72 rounded-3xl border-2 border-wood-light bg-cream p-4 shadow-[var(--shadow-lift)] animate-bubble-in flex flex-col gap-3 text-left">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div>
              <p className="font-display text-sm font-bold text-wood-dark">
                Adukkala Soundboard 🔊
              </p>
              <p className="text-[10px] text-muted-foreground">
                90s Kerala Courtyard Audio
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                playClick("tap");
                setIsOpen(false);
              }}
              className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-sand hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col gap-2 text-xs">
            <button
              type="button"
              onClick={() => toggleTrack("rain")}
              className={cn(
                "flex items-center justify-between rounded-2xl border p-3 font-bold transition text-left",
                states.rain
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-wood-dark hover:bg-leaf-soft"
              )}
            >
              <div className="flex flex-col">
                <span>🌧️ Mazha (Kerala Rain)</span>
                <span className="text-[10px] font-normal opacity-80">Monsoon sound on leaves</span>
              </div>
              <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px]">
                {states.rain ? "ON" : "OFF"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => toggleTrack("birds")}
              className={cn(
                "flex items-center justify-between rounded-2xl border p-3 font-bold transition text-left",
                states.birds
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-wood-dark hover:bg-leaf-soft"
              )}
            >
              <div className="flex flex-col">
                <span>🐦 Kili (Courtyard Birds)</span>
                <span className="text-[10px] font-normal opacity-80">Prabhatha kili chirps</span>
              </div>
              <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px]">
                {states.birds ? "ON" : "OFF"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => toggleTrack("clinks")}
              className={cn(
                "flex items-center justify-between rounded-2xl border p-3 font-bold transition text-left",
                states.clinks
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-wood-dark hover:bg-leaf-soft"
              )}
            >
              <div className="flex flex-col">
                <span>🥥 Chiratta (Wood Clinks)</span>
                <span className="text-[10px] font-normal opacity-80">Pretend pot stirring sound</span>
              </div>
              <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px]">
                {states.clinks ? "ON" : "OFF"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
