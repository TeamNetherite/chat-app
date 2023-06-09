<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements"
  import { type BruhProps, bruh } from "."

  interface $$Props extends BruhProps, HTMLAttributes<HTMLLIElement> {}
</script>

<li {...$$restProps} class={bruh($$props, $$restProps)}>
  <slot />
</li>
