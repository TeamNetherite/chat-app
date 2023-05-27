<script lang="ts">
  import {
    GetDMStore,
    type Conversations$result,
    type GetDM$result,
    SendMessageStore,
  } from '$houdini'
  import MdiSend from '~icons/mdi/send'
  import Divider from '$lib/nui/Divider.svelte'
  import type { ArrayOf } from '$lib/typemagic'

  type Message = ArrayOf<
    GetDM$result['conversationDirect']['messages']['edges']
  >['node']['message']

  export let currentConvo: NonNullable<
    ArrayOf<Conversations$result['conversations']>['recipient']['asUser']
  >

  const getConvo = new GetDMStore()

  $: getConvo.fetch({ variables: { userId: currentConvo.id } })

  let messages: Array<Message> = []

  $: messages =
    $getConvo.data?.conversationDirect?.messages?.edges?.map(
      (edge) => edge.node.message
    ) ?? messages

  let messageContent = ''

  const sendMessage = new SendMessageStore()

  function send() {
    ;(async () => {
      await sendMessage.mutate({
        init: {
          content: messageContent,
          recipient: 'user:' + currentConvo.id,
        },
      })

      messageContent = ''

      await getConvo.loadNextPage()
    })()
  }
</script>

<div class="grid h-full" style="grid-template-rows: 1fr 9fr 2fr">
  <div class="w-full">{currentConvo.displayName}</div>
  <div class="flex w-full flex-col gap-0">
    {#each messages as message}
      <div class="message">
        <div class="text-md flex flex-row items-center gap-2">
          {message.author.displayName}
          <span class="text-sm"
            >{new Date(Date.parse(message.createdAt)).toLocaleString()}</span
          >

          <span>{message.id}</span>
        </div>
        <div>{message.content}</div>
      </div>
      <Divider />
    {/each}
  </div>
  <div
    class="space-between flex h-min w-full flex-row justify-end rounded-md outline outline-zinc-300"
  >
    <input
      bind:value={messageContent}
      class="w-full bg-transparent text-black dark:text-white"
    />
    <button on:click={send}>
      <MdiSend class="text-sky-600" />
    </button>
  </div>
</div>

<style lang="scss">
  .message {
    @apply flex flex-col bg-gray-600 hover:bg-gray-700;
  }
</style>
