type Mods = Record<string, boolean | string>;

export function classNames(
  cls: string,
  mods?: Mods,
  additional?: string[] | undefined[]
): string {
  if (additional && mods) {
    return [
      cls,
      ...additional.filter(Boolean),
      Object.entries(mods)
        .filter(([value]) => Boolean(value))
        .map(([className]) => className)
        .join(" "),
    ].join(" ");
  }
  if (additional && !mods) {
    return [cls, ...additional.filter(Boolean)].join(" ");
  }
  if (!additional && mods) {
    return [
      cls,
      Object.entries(mods)
        .filter(([value]) => Boolean(value))
        .map(([className]) => className),
    ].join(" ");
  }
  return [cls].join(" ");
}

classNames("remove-btn", { hovered: true, selectable: true, red: false }, [
  "pdg",
]);
