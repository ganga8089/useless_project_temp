import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart } from "lucide-react";
import { useState } from "react";
import { playClick } from "@/lib/click-sound";
import { cn } from "@/lib/utils";

export function ClickButton({
  children,
  className,
  onClick,
  sound = "tap",
  type = "button",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  sound?: "tap" | "pop" | "yay";
}) {
  return (
    <button
      type={type}
      onClick={(e) => {
        playClick(sound);
        onClick?.(e);
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-display text-base font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition active:scale-95 hover:brightness-110",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ClickLink({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      onClick={() => playClick("tap")}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-display text-base font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition active:scale-95 hover:brightness-110",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function WoodSign({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("wood-panel relative px-6 py-6 text-center", className)}>
      <span aria-hidden className="absolute -left-3 -top-3 text-2xl animate-leaf-sway">
        🍃
      </span>
      <span aria-hidden className="absolute -right-3 -top-4 text-2xl animate-leaf-sway">
        🌼
      </span>
      {children}
    </div>
  );
}

export function SectionTitle({
  icon,
  title,
  action,
}: {
  icon: string;
  title: string;
  action?: { label: string; to: string };
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="flex min-w-0 items-center gap-2 text-lg text-foreground sm:text-xl">
        <span aria-hidden className="shrink-0">
          {icon}
        </span>
        <span className="truncate">{title}</span>
      </h2>
      {action && (
        <Link
          to={action.to}
          onClick={() => playClick("tap")}
          className="shrink-0 text-sm font-bold text-primary hover:underline"
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}

export function ArrowPill({ tint }: { tint?: string }) {
  return (
    <span
      aria-hidden
      className="grid h-8 w-8 place-items-center rounded-full bg-background/70 text-foreground shadow-[var(--shadow-soft)]"
      style={tint ? { backgroundColor: tint } : undefined}
    >
      <ArrowRight className="h-4 w-4" />
    </span>
  );
}

const FAV_KEY = "kk-favorites";

export function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function useFavorite(slug: string) {
  const [fav, setFav] = useState(false);
  const [mounted, setMounted] = useState(false);

  if (typeof window !== "undefined" && !mounted) {
    setMounted(true);
    setFav(readFavorites().includes(slug));
  }

  const toggle = () => {
    const list = readFavorites();
    const next = list.includes(slug)
      ? list.filter((s) => s !== slug)
      : [...list, slug];
    localStorage.setItem(FAV_KEY, JSON.stringify(next));
    setFav(next.includes(slug));
    playClick(next.includes(slug) ? "pop" : "tap");
    window.dispatchEvent(new Event("kk-fav-change"));
  };

  return { fav, toggle };
}

export function FavoriteHeart({ slug }: { slug: string }) {
  const { fav, toggle } = useFavorite(slug);
  return (
    <button
      type="button"
      aria-label={fav ? "Favorites-il ninnu maattuka" : "Favorites-il cherkkuka"}
      onClick={toggle}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background transition hover:bg-blush"
    >
      <Heart
        className={cn("h-5 w-5 transition", fav && "animate-pop-heart fill-destructive text-destructive")}
      />
    </button>
  );
}
