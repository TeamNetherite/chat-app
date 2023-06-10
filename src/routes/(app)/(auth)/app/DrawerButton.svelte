<script lang="ts">
  import { isDrawer } from '$lib/state'
  import { getContext } from 'svelte'
  import MdiMenu from '~icons/mdi/menu'

  const drawer = isDrawer()
  const drawerOpen = getContext<() => void>('drawerReallyOpen')
</script>

{#if $drawer}
  <button on:click={drawerOpen}>
    <MdiMenu />
  </button>
{/if}
