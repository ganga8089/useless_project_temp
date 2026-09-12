import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { UserRound } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { BabyChef, Flower, Leaf } from "@/components/chef";
import { WoodSign } from "@/components/ui-bits";
import { playClick } from "@/lib/click-sound";
import { useUserProfile } from "@/lib/user-profile";
import { ProfileModal } from "@/components/profile-modal";
import { AmbientSoundWidget } from "@/components/ambient-sound-widget";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kanjiyum Kariyum — Childhood Pretend Recipe Book" },
      {
        name: "description",
        content:
          "Kanjiyum Kariyum: a nostalgic Kerala childhood pretend-cooking recipe book with leaves, stones and a Baby Chef guide.",
      },
      { property: "og:title", content: "Kanjiyum Kariyum — Childhood Recipe Book" },
      {
        property: "og:description",
        content: "Imaginary recipes, real memories. Kali adukkala from 90s Kerala.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const { profile, isLoggedIn } = useUserProfile();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const handlePachakamClick = () => {
    playClick("yay");
    setProfileModalOpen(true);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-cream px-4 py-10 text-center">
      {/* Top Header Bar: Sound Effects Board & User Profile Badge */}
      <div className="absolute right-4 top-4 z-20 flex items-center gap-3">
        <AmbientSoundWidget />

        <button
          type="button"
          onClick={() => {
            playClick("pop");
            setProfileModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2 text-xs font-bold text-wood-dark shadow-[var(--shadow-soft)] backdrop-blur transition hover:bg-leaf-soft active:scale-95 sm:text-sm"
        >
          <div className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground font-display">
            {profile?.name ? profile.name.charAt(0).toUpperCase() : <UserRound className="h-3.5 w-3.5" />}
          </div>
          <span>{profile?.name ? `Chef ${profile.name}` : "User Login"}</span>
        </button>
      </div>

      {/* Background image with soft overlay */}
      <img
        src={heroBg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/40 to-cream/80" />

      {/* Floating interactive decorations with sound effects */}
      <button
        type="button"
        onClick={() => playClick("leaf")}
        className="absolute left-[8%] top-[12%] text-4xl opacity-60 transition-transform hover:scale-125 active:scale-90"
        title="Tap leaf"
      >
        <Leaf />
      </button>
      <button
        type="button"
        onClick={() => playClick("pop")}
        className="absolute right-[10%] top-[15%] text-3xl opacity-70 transition-transform hover:scale-125 active:scale-90"
        title="Tap flower"
      >
        <Flower />
      </button>
      <button
        type="button"
        onClick={() => playClick("leaf")}
        className="absolute bottom-[18%] right-[12%] text-3xl opacity-50 transition-transform hover:scale-125 active:scale-90"
        title="Tap leaf"
      >
        <Leaf />
      </button>
      <button
        type="button"
        onClick={() => playClick("pop")}
        className="absolute bottom-[14%] left-[14%] text-4xl opacity-60 transition-transform hover:scale-125 active:scale-90"
        title="Tap flower"
      >
        <Flower />
      </button>
      <span
        aria-hidden
        onClick={() => playClick("leaf")}
        className="absolute left-[18%] top-[30%] text-2xl opacity-40 animate-leaf-sway cursor-pointer hover:scale-125 transition-transform"
      >
        🍃
      </span>
      <span
        aria-hidden
        onClick={() => playClick("pop")}
        className="absolute right-[18%] bottom-[30%] text-2xl opacity-40 animate-leaf-sway cursor-pointer hover:scale-125 transition-transform"
      >
        🌼
      </span>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-6">
        {/* Baby Chef mascot */}
        <div
          className="relative cursor-pointer transition-transform hover:scale-105 active:scale-95"
          onClick={() => playClick("yay")}
          title="Click Baby Chef!"
        >
          <BabyChef
            pose="wave"
            priority
            float
            className="w-64 drop-shadow-[0_24px_30px_oklch(0.42_0.08_55_/_0.35)] sm:w-80"
          />
          <span
            aria-hidden
            className="absolute -right-4 top-4 rounded-full bg-card px-3.5 py-1.5 text-sm font-bold text-wood-dark shadow-[var(--shadow-soft)] animate-bubble-in flex items-center gap-1.5"
          >
            {profile?.name ? `Swagatham, ${profile.name}! 🍃` : "Hi! 🍃"}
          </span>
        </div>

        {/* Wooden signboard title */}
        <button
          type="button"
          onClick={() => playClick("wood")}
          className="w-full max-w-xl text-center cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
          title="Click sign for wood clink sound"
        >
          <WoodSign className="w-full animate-bubble-in">
            <p className="font-display text-4xl leading-tight text-wood-dark sm:text-6xl">
              Kanjiyum Kariyum
            </p>
            <p className="mt-2 font-display text-lg text-wood-dark/90 sm:text-2xl">
              കഞ്ഞിയും കറിയും
            </p>
            <p className="mt-3 text-sm font-semibold text-wood-dark/80 sm:text-base">
              Oru kuttikkaala pachaka pusthakam
            </p>
          </WoodSign>
        </button>

        <p className="hand-text max-w-md text-2xl text-primary sm:text-3xl">
          Cheriya recipes… valiya ormmakal!
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handlePachakamClick}
            className="group relative mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-display text-lg font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:brightness-110 active:scale-95 sm:text-xl"
          >
            <span>Pachakam thudangaam</span>
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              🍃
            </span>
          </button>

          {!isLoggedIn && (
            <p className="text-xs text-muted-foreground font-medium">
              Click to login / set up your account (Name & DOB) before cooking!
            </p>
          )}
        </div>

        <p className="max-w-sm text-xs text-muted-foreground sm:text-sm">
          Sankalpa recipes. Yathartha ormmakal. Pretend ingredients — please don’t eat them!
        </p>
      </div>

      {/* Bottom nostalgic quote strip */}
      <button
        type="button"
        onClick={() => playClick("wood")}
        className="relative z-10 mt-10 w-full max-w-xl rounded-3xl border-2 border-dashed border-wood-light bg-card/80 p-4 shadow-[var(--shadow-soft)] backdrop-blur-sm transition-transform hover:scale-[1.01] active:scale-[0.99] text-center"
      >
        <p className="hand-text text-xl text-wood-dark sm:text-2xl">
          “Cheriya kallukal, oru ila, kurachu imagination — athrayum mathi.”
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Small things. Big imagination.
        </p>
      </button>

      {/* User Login / Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onSaveSuccess={() => navigate({ to: "/home" })}
      />
    </div>
  );
}
