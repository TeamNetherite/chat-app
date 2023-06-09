import { cva, type VariantProps } from "class-variance-authority";
import Each from "./Each.svelte";

import ABruh from './ABruh.svelte'
import DivBruh from './DivBruh.svelte'
import LiBruh from './LiBruh.svelte'
import ListBruh from './ListBruh.svelte'
import { cn } from "$lib/typemagic";

export { ABruh, DivBruh, LiBruh, ListBruh, Each };

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
      border: 'divide-border'
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
    divideDirection: "none",
    divideColor: "border",
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

export function bruh(props: BruhProps & { class?: string }, restProps: Partial<BruhProps> & { class?: string } | undefined = undefined): string {
  props = { ...props, ...restProps };
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
  const divideDirection = props.divide ?? (
    props["divide-x"] ? "x" : props["divide-y"] ? "y" : undefined
  )
  const divideColor = props["divide-color"] ?? (
    props["divide-accent"] ? "accent" : props["divide-secondary"] ? "secondary" : props["divide-bg-secondary"] ? "bgSecondary" : undefined
  )
  const alignItems = props["align-items"] ?? (
    props["items-center"] ? "center" : props["items-start"] ? "start" : props["items-end"] ? "end" : undefined
  )

  return cn(bruhVariants({
    display,
    direction,
    gap,
    divideDirection,
    divideColor,
    alignItems
  }), props['class'], restProps?.['class']);
}
