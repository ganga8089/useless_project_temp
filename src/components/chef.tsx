import chefSitting from "@/assets/chef-sitting.png";
import chefWave from "@/assets/chef-wave.png";
import { cn } from "@/lib/utils";

type Pose = "sitting" | "wave";

export function BabyChef({
  pose = "sitting",
  className,
  float = true,
  priority = false,
}: {
  pose?: Pose;
  className?: string;
  float?: boolean;
  priority?: boolean;
}) {
  return (
    <img
      src={pose === "wave" ? chefWave : chefSitting}
      alt="Baby Chef mascot with a chef hat and wooden spoon"
      width={1024}
      height={1024}
      loading={priority ? "eager" : "lazy"}
      className={cn(
        "select-none drop-shadow-[0_18px_18px_oklch(0.42_0.08_55_/_0.28)]",
        float && "animate-chef-float",
        className,
      )}
    />
  );
}

export function SpeechBubble({
  children,
  className,
  tail = "left",
}: {
  children: React.ReactNode;
  className?: string;
  tail?: "left" | "right" | "bottom";
}) {
  return (
    <div
      className={cn(
        "animate-bubble-in relative max-w-xs rounded-3xl border-2 border-wood-light bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-[0_10px_24px_-12px_oklch(0.42_0.08_55_/_0.4)]",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute h-4 w-4 rotate-45 border-wood-light bg-card",
          tail === "left" && "-left-2 top-6 border-b-2 border-l-2",
          tail === "right" && "-right-2 top-6 border-r-2 border-t-2",
          tail === "bottom" && "-bottom-2 left-8 border-b-2 border-r-2",
        )}
      />
    </div>
  );
}

export function Leaf({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("animate-leaf-sway inline-block", className)}>
      🍃
    </span>
  );
}

export function Flower({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("animate-leaf-sway inline-block", className)}>
      🌼
    </span>
  );
}
