export function cls(input: string | Array<string | boolean> | undefined): string {
  if (typeof input === "undefined") {
    return "";
  }

  if (typeof input === "string") {
    return input;
  } else {
    return input.filter((cond: string | boolean) => typeof cond === "string").join(" ");
  }
}
