export function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}
