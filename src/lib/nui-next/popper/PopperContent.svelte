<script lang="ts">
  import { Popper as PopperPrimitive, type PopperContentProps } from 'radix-svelte/internal/components/Popper'
  import { getContext } from "svelte"
  import { __POPPER_CX, type PopperCx } from "./constants"

  interface $$Props extends PopperContentProps {

  }

  const cx: PopperCx = getContext(__POPPER_CX)
</script>

{#if $cx}
  <PopperPrimitive.Content {...$$props}></PopperPrimitive.Content>
{/if}
