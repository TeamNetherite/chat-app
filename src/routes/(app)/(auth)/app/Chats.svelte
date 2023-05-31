<script lang="ts">
  import Status from '$lib/Status.svelte'
  import type { Convo } from '$lib/graphql'
  import { cast } from '$lib/typemagic'
  import { ConversationsStore } from '$houdini'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'

  const getConversations = new ConversationsStore()
  let conversations: (Convo & {
    recipient: { asUser: NonNullable<Convo['recipient']['asUser']> }
  })[] = []
  $: conversations = cast($getConversations.data?.conversations ?? conversations)
  export let currentConvo: Convo | null = null
  onMount(() => { getConversations.fetch().then(convos => currentConvo = convos.data?.conversations?.at(0) ?? null) })

  $: goto(`/app/@me${currentConvo ? `/${currentConvo.recipient.asUser!.id}` : ''}`)
</script>

<div class="flex flex-row w-full h-full max-h-screen min-h-0 gap-5">
  <div class="flex w-[20%] flex-col mt-4">
    <ul class="flex flex-col gap-1.5">
      {#each conversations as convo (convo.recipient.asUser.id)}
        <li class="h-12 border border-3 border-gray-800 p-2 flex flex-col justify-center">
          <button
            class="flex flex-row justify-between items-center"
            on:click={() => (currentConvo = convo)}
          >
            <div class="flex flex-row text-lg">
              <Status
                status={convo.recipient.asUser.status}
                class="mr-1 self-center"
              />
              {convo.recipient.asUser.displayName}
            </div>
            <span class="text-xs">{convo.recipient.asUser.tag}</span>
          </button>
        </li>
      {/each}
    </ul>
  </div>
</div>
