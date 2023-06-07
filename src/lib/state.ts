import { createMediaStore } from "svelte-media-queries";
import type { Readable } from "svelte/store";
import { cast } from "./typemagic";
import { onDestroy } from "svelte";

export const query = {
  mobile: "(max-width: 480px)",
  tablet: "(min-width: 480px) and (max-width: 768px)",
  largeTablet: "(min-width: 768px) and (max-width: 1200px)",
  desktop: "(min-width: 1200px)",
  other: ["(min-width: 1200px)", "(max-height: 900px)"],
  themes: {
    dark: "(prefers-color-scheme: dark)",
    light: "(prefers-color-scheme: light)",
  },
  drawer: "(480px <= width <= 1200px) and (orientation: portrait)",
};

export type QueryMatch = {
  [key in keyof typeof query]: typeof query[key] extends string ? boolean
    : (typeof query[key] extends string[] ? boolean[]
      : (typeof query[key] extends {
        [kk in keyof typeof query[key]]: string;
      } ? {
          [k in keyof typeof query[key]]: boolean;
        }
        : never));
};

export function isDrawer(): Readable<boolean> & {
  autoDestroy: () => Readable<boolean>;
} {
  return {
    ...cast(createMediaStore(query.drawer)),
    autoDestroy(this: Readable<boolean> & { destroy: () => void }) {
      onDestroy(this.destroy);
      return this;
    },
  };
}
