<script lang="ts">
  import Status from '$lib/Status.svelte'
  import Chat from './Chat.svelte'
  import type { Convo } from '$lib/graphql'
  import { cast } from '$lib/typemagic'
  import { ConversationsStore } from '$houdini'
  import { onMount } from 'svelte'

  const getConversations = new ConversationsStore()
  let conversations: (Convo & {
    recipient: { asUser: NonNullable<Convo['recipient']['asUser']> }
  })[] = []
  $: conversations = cast($getConversations.data?.conversations ?? conversations)
  export let currentConvo: Convo | null = null
  onMount(() => { getConversations.fetch().then(convos => currentConvo = convos.data?.conversations?.at(0) ?? null) })
</script>

<div class="flex flex-row w-full h-full max-h-screen min-h-0">
  <div class="flex w-[20%] flex-col">
    <ul class="flex flex-col gap-0.5">
      {#each conversations as convo (convo.recipient.asUser.id)}
        <li>
          <button
            class="bg- flex flex-row"
            on:click={() => (currentConvo = convo)}
          >
            <Status
              status={convo.recipient.asUser.status}
              class="mr-1 self-center"
            />
            {convo.recipient.asUser.displayName}
          </button>
        </li>
      {/each}
    </ul>
  </div>

  {#if currentConvo !== null}
    <Chat currentConvo={cast(currentConvo.recipient.asUser)} />
  {/if}
</div>
