import { useState, useEffect } from "react";

export interface UserProfile {
  name: string;
  dob: string; // YYYY-MM-DD format
}

const STORAGE_KEY = "kanjiyum_user_profile";

export function getStoredProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load user profile", err);
    return null;
  }
}

export function saveStoredProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event("kanjiyum_profile_update"));
  } catch (err) {
    console.error("Failed to save user profile", err);
  }
}

export function clearStoredProfile(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("kanjiyum_profile_update"));
  } catch (err) {
    console.error("Failed to clear user profile", err);
  }
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(() => getStoredProfile());

  useEffect(() => {
    const handleUpdate = () => {
      setProfile(getStoredProfile());
    };

    window.addEventListener("kanjiyum_profile_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("kanjiyum_profile_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const saveProfile = (newProfile: UserProfile) => {
    saveStoredProfile(newProfile);
    setProfile(newProfile);
  };

  const removeProfile = () => {
    clearStoredProfile();
    setProfile(null);
  };

  return {
    profile,
    saveProfile,
    removeProfile,
    isLoggedIn: Boolean(profile?.name),
  };
}

export function calculateAgeAndEra(dobString: string): { age: number; era: string; title: string } {
  if (!dobString) return { age: 0, era: "Unknown Era", title: "Childhood Chef" };

  const dob = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  const birthYear = dob.getFullYear();
  let era = "90s Adukkala Kid";
  let title = "Master Pretend Chef 🏆";

  if (birthYear < 1990) {
    era = "80s Classic Adukkala Veteran 🌴";
    title = "Grand Master of Leaf Curries 👑";
  } else if (birthYear >= 1990 && birthYear < 2000) {
    era = "90s Golden Nostalgia Kid 🍃";
    title = "Senior Chiratta Chef 🥥";
  } else if (birthYear >= 2000 && birthYear < 2010) {
    era = "2000s Courtyard Gamer 🌼";
    title = "Creative Pebble Cook 🪨";
  } else {
    era = "Modern Imagination Explorer 🌟";
    title = "Junior Pretend Chef 🥄";
  }

  return { age, era, title };
}
