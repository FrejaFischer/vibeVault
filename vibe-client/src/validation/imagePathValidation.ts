export function isSafeImageFilename(filename: string): boolean {
  // Allow only filenames with a safe extension
  const validExtensions = [".png", ".jpg", ".jpeg", ".webp"];
  const isValidExt = validExtensions.some((ext) => filename.toLowerCase().endsWith(ext));

  const isCleanName = /^[a-zA-Z0-9_\-.]+$/.test(filename); // Only allow letters, numbers, -, _ and . in filename

  return isValidExt && isCleanName;
}
