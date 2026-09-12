import { useState, useEffect } from "react";
import { UserRound, Calendar, Save, Trash2, X, Sparkles } from "lucide-react";
import { useUserProfile, calculateAgeAndEra } from "@/lib/user-profile";
import { playClick } from "@/lib/click-sound";

export function ProfileModal({
  isOpen,
  onClose,
  onSaveSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess?: () => void;
}) {
  const { profile, saveProfile, removeProfile } = useUserProfile();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setDob(profile.dob || "");
    } else {
      setName("");
      setDob("");
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dob) return;
    saveProfile({ name: name.trim(), dob });
    playClick("pop");
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
      onSaveSuccess?.();
    }, 900);
  };

  const handleClear = () => {
    playClick("tap");
    removeProfile();
    setName("");
    setDob("");
  };

  const { era, title } = dob ? calculateAgeAndEra(dob) : { era: "", title: "" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-wood-dark/50 backdrop-blur-sm animate-fade-in"
        onClick={() => {
          playClick("tap");
          onClose();
        }}
      />

      {/* Dialog box */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border-2 border-wood-light bg-cream p-6 shadow-[var(--shadow-lift)] animate-bubble-in">
        <button
          type="button"
          onClick={() => {
            playClick("tap");
            onClose();
          }}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-card hover:bg-accent"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
            <UserRound className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-2xl text-wood-dark">
              {profile ? "Chef Profile" : "Create Chef Account"}
            </h2>
            <p className="text-xs text-muted-foreground">
              Enter your Name and Date of Birth
            </p>
          </div>
        </div>

        {savedSuccess ? (
          <div className="my-8 flex flex-col items-center justify-center gap-3 text-center">
            <span className="text-5xl animate-bounce">✨</span>
            <p className="font-display text-xl text-primary">
              Profile Saved Successfully!
            </p>
            <p className="text-sm text-muted-foreground">
              Welcome aboard, Chef {name}!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
            {/* Name Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="user-name" className="text-sm font-bold text-wood-dark flex items-center gap-1.5">
                <UserRound className="h-4 w-4 text-primary" /> Full Name
              </label>
              <input
                id="user-name"
                type="text"
                required
                placeholder="e.g. Aishwarya"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-sm font-medium text-foreground outline-none transition focus:border-primary"
              />
            </div>

            {/* Date of Birth Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="user-dob" className="text-sm font-bold text-wood-dark flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" /> Date of Birth
              </label>
              <input
                id="user-dob"
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-sm font-medium text-foreground outline-none transition focus:border-primary"
              />
            </div>

            {/* Preview Era Badge */}
            {dob && (
              <div className="mt-1 rounded-2xl border border-dashed border-wood-light bg-sand/60 p-3 text-center">
                <p className="text-xs font-semibold text-muted-foreground">Your Nostalgia Badge</p>
                <p className="font-display text-base text-wood-dark mt-0.5">{title}</p>
                <p className="text-xs text-primary font-bold">{era}</p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-3 flex items-center gap-2">
              <button
                type="submit"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:brightness-110 active:scale-95"
              >
                <Save className="h-4 w-4" />
                <span>Save Profile</span>
              </button>

              {profile && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-destructive/30 bg-destructive/10 text-destructive transition hover:bg-destructive/20"
                  title="Clear Account"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
