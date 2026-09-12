// Eagerly glob all images in src/assets/dishes
const dishImages = import.meta.glob<{ default: string }>("/src/assets/dishes/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
});

/**
 * Returns the corresponding image URL for a given recipe slug if present in src/assets/dishes/.
 * Returns null if no specific image is provided for this recipe.
 */
export function getRecipeImage(slug: string): string | null {
  for (const path in dishImages) {
    const filename = path.split("/").pop()?.split(".")[0];
    if (filename === slug) {
      return dishImages[path].default;
    }
  }
  return null;
}
