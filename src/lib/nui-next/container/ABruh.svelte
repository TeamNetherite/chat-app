<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { bruh, type BruhProps } from '.'

  export let href: string | undefined = undefined

  interface $$Props extends HTMLAttributes<HTMLAnchorElement>, BruhProps {
    href?: string
  }
</script>

<a {href} {...$$restProps} class={bruh($$props, $$restProps)}>
  <slot />
</a>
