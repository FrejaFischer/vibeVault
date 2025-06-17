export function getRandomFallbackImage(): string {
  const fallbacks = ["fallback1.png", "fallback2.png"];
  const randomIndex = Math.floor(Math.random() * fallbacks.length);
  return fallbacks[randomIndex];
}
