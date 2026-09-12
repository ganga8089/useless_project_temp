import { createFileRoute } from "@tanstack/react-router";
import { UserRound, Calendar, Award, Sparkles, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ProfileModal } from "@/components/profile-modal";
import { useUserProfile, calculateAgeAndEra } from "@/lib/user-profile";
import { BabyChef } from "@/components/chef";
import { playClick } from "@/lib/click-sound";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Account — Kanjiyum Kariyum" },
      {
        name: "description",
        content: "User account and profile details for Kanjiyum Kariyum.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { profile, removeProfile } = useUserProfile();
  const [modalOpen, setModalOpen] = useState(false);

  const { age, era, title } = profile?.dob
    ? calculateAgeAndEra(profile.dob)
    : { age: 0, era: "Unknown Era", title: "Guest Pretend Chef" };

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="card-soft relative overflow-hidden p-6 sm:p-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className="relative grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-primary text-primary-foreground font-display text-4xl shadow-[var(--shadow-soft)]">
              {profile?.name ? (
                profile.name.charAt(0).toUpperCase()
              ) : (
                <UserRound className="h-12 w-12" />
              )}
              <span className="absolute -bottom-2 -right-2 text-2xl">🍃</span>
            </div>

            {/* Profile Info */}
            <div className="flex flex-1 flex-col items-center text-center sm:items-start sm:text-left">
              <span className="inline-flex items-center gap-1 rounded-full bg-leaf-soft px-3 py-1 text-xs font-bold text-wood-dark">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> {era}
              </span>

              <h1 className="mt-2 font-display text-3xl text-wood-dark sm:text-4xl">
                {profile?.name ? profile.name : "Guest Chef"}
              </h1>

              <p className="mt-1 font-display text-lg text-primary">{title}</p>

              {profile?.dob ? (
                <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <Calendar className="h-4 w-4 text-primary" /> DOB: {profile.dob}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <Award className="h-4 w-4 text-primary" /> Age: {age} years
                  </span>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  No profile setup yet. Add your name and date of birth to customize your experience!
                </p>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    playClick("tap");
                    setModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:brightness-110 active:scale-95"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>{profile ? "Edit Account" : "Create Account"}</span>
                </button>

                {profile && (
                  <button
                    type="button"
                    onClick={() => {
                      playClick("tap");
                      removeProfile();
                    }}
                    className="inline-flex items-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 font-bold text-destructive transition hover:bg-destructive/20 active:scale-95"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Clear Account</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Nostalgia Chef Badge Card */}
        <div className="card-soft relative bg-sand p-6">
          <BabyChef pose="wave" className="pointer-events-none absolute -top-8 right-4 w-28 opacity-80" />
          <h3 className="font-display text-xl text-wood-dark">Your Childhood Adukkala Badge</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-md">
            Based on your date of birth ({profile?.dob || "Not set"}), you belong to the <strong>{era}</strong> era!
          </p>
          <div className="mt-4 rounded-2xl border-2 border-dashed border-wood-light bg-cream p-4">
            <p className="hand-text text-xl text-wood-dark">
              “Cheriya kallukal, oru ila, kurachu imagination — athrayum mathi.”
            </p>
          </div>
        </div>
      </div>

      <ProfileModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </AppShell>
  );
}
