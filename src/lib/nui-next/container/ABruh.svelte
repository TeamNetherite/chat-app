<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements"
  import type { BruhProps } from "."
  import { cn } from "$lib/typemagic"

  interface $$Props extends BruhProps, HTMLAttributes<HTMLAnchorElement> {}
</script>

<a class={cn(

)} {...$$restProps}></a>
