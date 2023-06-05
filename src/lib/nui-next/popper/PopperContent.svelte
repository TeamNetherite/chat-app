<script lang="ts">
  import { Popper as PopperPrimitive, type PopperContentProps } from 'radix-svelte/internal/components/Popper'
  import { getContext } from "svelte"
  import { __POPPER_CX, type PopperCx } from "./constants"
  type $$Props = PopperContentProps

  const cx: PopperCx = getContext(__POPPER_CX) as PopperCx
</script>

{#if $cx}
  <PopperPrimitive.Content {...$$restProps}>
    <slot close={() => cx.set(false)} />
  </PopperPrimitive.Content>
{/if}
