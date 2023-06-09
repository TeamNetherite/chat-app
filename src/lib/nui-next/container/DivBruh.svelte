<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements"
  import { type BruhProps, bruh } from "."

  interface $$Props extends BruhProps, HTMLAttributes<HTMLDivElement> {}
</script>

<div {...$$restProps} class={bruh($$props, $$restProps)}>
  <slot />
</div>
