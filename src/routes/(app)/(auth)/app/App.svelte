<script lang="ts">
  import type { Conversations$result } from '$houdini'
  import type { ArrayOf } from '$lib/typemagic'
  import Chat from './Chat.svelte'

  export let convos: NonNullable<
    ArrayOf<Conversations$result['conversations']>['recipient']['asUser']
  >[]
  export let currentConvo:
    ArrayOf<typeof convos> = convos[0] ?? null
</script>

<div class="grid" style="grid-template-columns: 1fr 1.5fr 9fr;">
  <div class="flex flex-col gap-1">
    <button class="w-min rounded-full bg-purple-950"> W </button>
  </div>

  <div class="flex flex-col">
    {#each convos as convo (convo.id)}
      <div class="flex flex-row">
        <button on:click={() => (currentConvo = convo)}
          >{convo.displayName}</button
        >
      </div>
    {/each}
  </div>

  {#if currentConvo !== null}
    <Chat {currentConvo} />
  {/if}
</div>
