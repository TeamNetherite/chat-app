<script lang="ts">
  import type { Conversations$result } from '$houdini'
  import Status from '$lib/Status.svelte'
  import Divider from '$lib/nui/Divider.svelte'
  import type { ArrayOf } from '$lib/typemagic'
  import Chat from './Chat.svelte'

  export let convos: NonNullable<
    ArrayOf<Conversations$result['conversations']>['recipient']['asUser']
  >[]
  export let currentConvo: ArrayOf<typeof convos> = convos[0] ?? null
</script>

<div class="scrollbar-rmrf flex flex-row flex-1 gap-1 h-full min-h-full max-h-screen">
  <ul class="server-list">
    <li>
      <button> W </button>
    </li>
    <Divider class="bg-stone-700 mx-1" />
  </ul>

  <div class="flex flex-col w-[20%]">
    <ul class="flex flex-col gap-0.5">
      {#each convos as convo (convo.id)}
        <li>
        <button
          class="flex flex-row bg-"
          on:click={() => (currentConvo = convo)}
        >
          <Status status={convo.status} class="self-center mr-1" />
          {convo.displayName}
        </button>
        </li>
      {/each}
    </ul>
  </div>

  {#if currentConvo !== null}
    <Chat {currentConvo} />
  {/if}
</div>

<style lang="scss">
  .server-list {
    @apply flex flex-col mt-2 w-[5%];
    > li {
      @apply w-full h-8 flex;
      > button {
        @apply w-full h-full self-center justify-center;
      }
    }
  }
</style>
