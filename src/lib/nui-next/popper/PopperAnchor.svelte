<script lang="ts">
  import { Popper as PopperPrimitive, type PopperAnchorProps } from 'radix-svelte/internal/components/Popper'
  import { getContext } from "svelte"
  import { __POPPER_CX, type PopperCx } from "./constants"

  type $$Props = PopperAnchorProps

  const cx: PopperCx = getContext(__POPPER_CX) as PopperCx
</script>

<PopperPrimitive.Anchor {...$$restProps} on:click={() => $cx = !$cx}>
  <slot />
</PopperPrimitive.Anchor>
