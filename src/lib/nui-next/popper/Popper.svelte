<script lang="ts">
  import { Popper as PopperPrimitive } from 'radix-svelte/internal/components';
  import { setContext } from 'svelte'
  import { __POPPER_CX } from './constants'
  import { writable } from 'svelte/store'

  let open = writable(false)

  setContext(__POPPER_CX, open)
</script>

<PopperPrimitive.Root>
  <slot />
</PopperPrimitive.Root>
