/**
 * Returns the initials from a user's name or, if not available, the first letter.
 *
 * @param user - An object containing at least a 'name' property.
 * @returns The initials as an uppercase string.
 */
export function getInitialsName(name: string | undefined): string {
  if (!name) return "";
  return name
    .split(" ")
    .slice(0, 2)
    .map((name: string) => name[0])
    .join("")
    .toUpperCase();
}
