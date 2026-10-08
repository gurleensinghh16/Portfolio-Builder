import type { CSSProperties } from "react";

export const delay = (s: number) =>
  ({ "--delay": `${s}s` }) as CSSProperties;