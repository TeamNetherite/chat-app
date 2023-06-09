<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements"
  import { type BruhProps, bruh } from "."

  export let ol = false
  export let ul = true

  interface $$Props extends BruhProps, HTMLAttributes<HTMLUListElement> {
    ol?: true
    ul?: true
  }
</script>

<svelte:element this={ol ? 'ol' : (ul ? 'ul' : 'ul')} class={bruh($$props, $$restProps)} {...$$restProps}>
  <slot />
</svelte:element>
