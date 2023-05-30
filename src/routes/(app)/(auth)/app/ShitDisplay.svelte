<script lang="ts">
  import Chats from './Chats.svelte'
  import Friends from './Friends.svelte'
  import { type SelectionThing, Shit } from '$lib/graphql'
  export let sel: SelectionThing
</script>

{#if sel.type === 'shit'}
  {#if sel.shit === Shit.Friends}
    <Friends />
  {/if}
{:else}
  <Chats />
{/if}
