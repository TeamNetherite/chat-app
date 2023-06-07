import { cva, type VariantProps } from "class-variance-authority";
import Each from "./Each.svelte";

export { Each };

export const bruhVariants = cva("", {
  variants: {
    display: {
      flex: "flex",
      block: "block",
      inline: "inline",
      inlineFlex: "inline-flex",
      inlineBlock: "inline-block",
    },
    direction: {
      column: "flex-col",
      row: "flex-row",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-8",
      xl: "gap-16",
      xxl: "gap-32",
    },
    divideDirection: {
      none: "divide-none",
      x: "divide-x",
      y: "divide-y",
    },
    divideColor: {
      none: "divide-none",
      accent: "divide-accent",
      secondary: "divide-secondary",
      bgSecondary: "divide-background-secondary",
    },
    alignItems: {
      center: "items-center",
      start: "items-start",
      end: "items-end",
    },
  },
  defaultVariants: {
    display: "flex",
    direction: "row",
    gap: "none",
    alignItems: "start",
  },
});

type Props = VariantProps<typeof bruhVariants>;

export interface BruhProps {
  display?: Props["display"];
  direction?: Props["direction"];
  gap?: Props["gap"];
  "divide-color"?: Props["divideColor"];
  divide?: Props["divideDirection"];
  "align-items"?: Props["alignItems"];

  // display
  flex?: true;
  block?: true;

  // flex direction
  column?: true;
  row?: true;

  // divide direction
  "divide-x"?: true;
  "divide-y"?: true;

  // divide color
  "divide-accent"?: true;
  "divide-bg-secondary"?: true;
  "divide-secondary"?: true;

  // gap (md, sm, lg, xl, xxl)
  "gap-sm"?: true;
  "gap-md"?: true;
  "gap-lg"?: true;
  "gap-xl"?: true;
  "gap-xxl"?: true;

  // align-items
  "items-center"?: true;
  "items-start"?: true;
  "items-end"?: true;
}

export function bruh(props: BruhProps): string {
  const display = props.display ?? (
    props.flex ? "flex" : props.block ? "block" : undefined
  );
  const direction = props.direction ?? (
    props.column ? "column" : props.row ? "row" : undefined
  );
  const gap = props.gap ?? (
    props["gap-sm"]
      ? "sm"
      : props["gap-md"]
      ? "md"
      : props["gap-lg"]
      ? "lg"
      : props["gap-xl"]
      ? "xl"
      : props["gap-xxl"]
      ? "xxl"
      : undefined
  );

  return bruhVariants({
    display,
    direction,
    gap
  });
}
