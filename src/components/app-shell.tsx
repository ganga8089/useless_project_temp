import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  BookOpenText,
  ChefHat,
  Dices,
  Heart,
  Home,
  Leaf as LeafIcon,
  Menu,
  Notebook,
  Search,
  Trophy,
  UserRound,
  X,
  Sparkles,
  Volume2,
} from "lucide-react";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { playClick } from "@/lib/click-sound";
import { cn } from "@/lib/utils";
import { useUserProfile } from "@/lib/user-profile";
import { ProfileModal } from "@/components/profile-modal";
import { recipes, ingredients, memories } from "@/lib/site-data";
import { toggleRain, toggleBirds, toggleClinks } from "@/lib/ambient-sound";
import { AmbientSoundWidget } from "@/components/ambient-sound-widget";

const nav = [
  { to: "/home", label: "Home", ml: "Veedu", icon: Home },
  { to: "/recipes", label: "Recipes", ml: "Pachakam", icon: BookOpenText },
  { to: "/ingredients", label: "Ingredients", ml: "Cheruvakal", icon: LeafIcon },
  { to: "/favorites", label: "Favorites", ml: "Ishtappettava", icon: Heart },
  { to: "/random", label: "Random Recipe", ml: "Ethelum onnu", icon: Dices },
  { to: "/create", label: "Create Your Own", ml: "Sontham recipe", icon: ChefHat },
  { to: "/nostalgia", label: "Nostalgia", ml: "Ormmakal", icon: Notebook },
  { to: "/quiz", label: "Quiz / Fun", ml: "Kali", icon: Sparkles },
  { to: "/achievements", label: "Achievements", ml: "Sammanangal", icon: Trophy },
  { to: "/profile", label: "My Account", ml: "Profile", icon: UserRound },
];

function SidebarInner({ onNavigate, onOpenProfile }: { onNavigate?: () => void; onOpenProfile?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { profile } = useUserProfile();

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto bg-cream px-4 py-5">
      <div className="wood-panel relative px-4 py-5 text-center">
        <span aria-hidden className="absolute -left-2 -top-3 text-xl animate-leaf-sway">
          🍃
        </span>
        <span aria-hidden className="absolute -right-2 -top-3 text-xl animate-leaf-sway">
          🌼
        </span>
        <p className="font-display text-2xl leading-tight text-wood-dark">
          Kanjiyum
          <br />
          Kariyum
        </p>
        <p className="mt-1 text-xs font-semibold text-wood-dark/80">
          Sankalpa pachakam. Yathartha ormmakal.
        </p>
      </div>

      {/* Profile quick banner */}
      <button
        type="button"
        onClick={() => {
          playClick("tap");
          onOpenProfile?.();
        }}
        className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left shadow-[var(--shadow-soft)] hover:bg-leaf-soft transition"
      >
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground font-bold font-display text-lg">
          {profile?.name ? profile.name.charAt(0).toUpperCase() : <UserRound className="h-5 w-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-foreground">
            {profile?.name ? profile.name : "Guest Chef"}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {profile?.dob ? `DOB: ${profile.dob}` : "Tap to set account"}
          </p>
        </div>
      </button>

      <nav className="flex flex-col gap-1">
        {nav.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => {
                playClick("tap");
                onNavigate?.();
              }}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition",
                active
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                  : "text-foreground hover:bg-leaf-soft",
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="min-w-0 truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border-2 border-dashed border-wood-light bg-sand p-4 text-center">
        <p className="hand-text text-xl leading-snug text-wood-dark">
          “Cheriya kallukal, oru ila, kurachu imagination — athrayum mathi.”
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Small things. Big imagination.
        </p>
      </div>
    </div>
  );
}

function LiveSearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const q = query.trim().toLowerCase();

  const matchingRecipes = q
    ? recipes.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.nameEn.toLowerCase().includes(q) ||
          r.desc.toLowerCase().includes(q) ||
          r.ingredients.some((i) => i.toLowerCase().includes(q))
      )
    : [];

  const matchingIngredients = q
    ? ingredients.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.nameEn.toLowerCase().includes(q) ||
          i.desc.toLowerCase().includes(q)
      )
    : [];

  const matchingMemories = q
    ? memories.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.text.toLowerCase().includes(q) ||
          m.tag.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    matchingRecipes.length + matchingIngredients.length + matchingMemories.length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectRecipe = (slug: string) => {
    playClick("tap");
    setQuery("");
    setIsOpen(false);
    navigate({ to: `/recipes/${slug}` });
  };

  const handleSelectIngredient = () => {
    playClick("tap");
    setQuery("");
    setIsOpen(false);
    navigate({ to: "/ingredients" });
  };

  const handleSelectMemory = () => {
    playClick("tap");
    setQuery("");
    setIsOpen(false);
    navigate({ to: "/nostalgia" });
  };

  return (
    <div ref={containerRef} className="relative flex-1 max-w-md">
      <label className="flex min-w-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 shadow-[var(--shadow-soft)] transition focus-within:border-primary">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search recipes, ingredients, memories..."
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="grid h-5 w-5 place-items-center rounded-full text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </label>

      {/* Dropdown Results Overlay */}
      {isOpen && q && (
        <div className="absolute left-0 right-0 top-12 z-50 max-h-[380px] overflow-y-auto rounded-3xl border-2 border-wood-light bg-cream p-3 shadow-[var(--shadow-lift)] animate-bubble-in flex flex-col gap-3">
          {totalResults === 0 ? (
            <div className="p-4 text-center text-xs text-muted-foreground">
              No pretend recipes or ingredients found for "{query}" 🍃
            </div>
          ) : (
            <>
              {/* Recipes */}
              {matchingRecipes.length > 0 && (
                <div className="flex flex-col gap-1">
                  <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Recipes ({matchingRecipes.length})
                  </p>
                  {matchingRecipes.map((r) => (
                    <button
                      key={r.slug}
                      type="button"
                      onClick={() => handleSelectRecipe(r.slug)}
                      className="flex items-center justify-between rounded-xl p-2.5 text-left text-xs transition hover:bg-leaf-soft"
                    >
                      <div>
                        <p className="font-bold text-wood-dark">{r.name}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{r.desc}</p>
                      </div>
                      <span className="shrink-0 text-[10px] font-bold rounded-full bg-sand px-2 py-0.5">
                        {r.time}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Ingredients */}
              {matchingIngredients.length > 0 && (
                <div className="flex flex-col gap-1">
                  <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Ingredients ({matchingIngredients.length})
                  </p>
                  {matchingIngredients.map((i) => (
                    <button
                      key={i.name}
                      type="button"
                      onClick={handleSelectIngredient}
                      className="flex items-center gap-2 rounded-xl p-2.5 text-left text-xs transition hover:bg-leaf-soft"
                    >
                      <span className="text-base">{i.emoji}</span>
                      <div>
                        <p className="font-bold text-wood-dark">{i.name} ({i.nameEn})</p>
                        <p className="text-[11px] text-muted-foreground">{i.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Memories */}
              {matchingMemories.length > 0 && (
                <div className="flex flex-col gap-1">
                  <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Stories & Memories ({matchingMemories.length})
                  </p>
                  {matchingMemories.map((m) => (
                    <button
                      key={m.title}
                      type="button"
                      onClick={handleSelectMemory}
                      className="flex items-center justify-between rounded-xl p-2.5 text-left text-xs transition hover:bg-leaf-soft"
                    >
                      <div>
                        <p className="font-bold text-wood-dark">{m.title}</p>
                        <p className="text-[11px] text-muted-foreground truncate max-w-[220px]">
                          {m.text}
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] font-bold rounded-full bg-peach px-2 py-0.5">
                        #{m.tag}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// AmbientSoundWidget is imported from "@/components/ambient-sound-widget"

function TopHeader({ onMenu, onOpenProfile }: { onMenu: () => void; onOpenProfile: () => void }) {
  const { profile } = useUserProfile();

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/85 px-3 py-3 backdrop-blur sm:px-5">
      <button
        type="button"
        aria-label="Menu thurakkuka"
        onClick={() => {
          playClick("tap");
          onMenu();
        }}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-border bg-card lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Live Interactive Search Bar */}
      <LiveSearchBar />

      {/* Ambient Soundboard Widget */}
      <AmbientSoundWidget />


      <button
        type="button"
        aria-label="Profile Account"
        onClick={() => {
          playClick("tap");
          onOpenProfile();
        }}
        className="flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-primary-foreground shadow-[var(--shadow-soft)] transition hover:brightness-110 active:scale-95 shrink-0"
      >
        <div className="grid h-7 w-7 place-items-center rounded-full bg-primary-foreground/20 font-display text-sm font-bold">
          {profile?.name ? profile.name.charAt(0).toUpperCase() : <UserRound className="h-4 w-4" />}
        </div>
        <span className="hidden sm:inline text-xs font-bold truncate max-w-[100px]">
          {profile?.name ? profile.name : "Account"}
        </span>
      </button>
    </header>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border lg:block">
        <SidebarInner onOpenProfile={() => setProfileModalOpen(true)} />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Menu adakkuka"
            className="absolute inset-0 bg-wood-dark/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85vw] shadow-[var(--shadow-lift)]">
            <button
              type="button"
              aria-label="Adakkuka"
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full bg-card"
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarInner
              onNavigate={() => setOpen(false)}
              onOpenProfile={() => {
                setOpen(false);
                setProfileModalOpen(true);
              }}
            />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <TopHeader onMenu={() => setOpen(true)} onOpenProfile={() => setProfileModalOpen(true)} />
        <main className="min-w-0 flex-1 px-3 pb-10 pt-4 sm:px-5">{children}</main>
      </div>

      {/* User Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </div>
  );
}
