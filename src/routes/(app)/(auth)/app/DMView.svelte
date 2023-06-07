<script lang="ts">
  import { NETHERITE_CHAT_SERVER_URL as SERVER_URL } from '$env/static/public'
  import {
    GetDMStore,
    type Conversations$result,
    SentMessagesStore,
  } from '$houdini'
  import type { MessageData } from '$lib/graphql'
  import { type ArrayOf, uniqueBy, statusColor } from '$lib/typemagic'
  import Messages from './Messages.svelte'
  import { Avatar } from '$lib/nui'
  import moss from '$lib/../../assets/moss.png'

  export let recipient: NonNullable<ArrayOf<Conversations$result['conversations']>['recipient']['asUser']>

  const getConvo = new GetDMStore()

  $: getConvo.fetch({ variables: { userId: recipient.id } }).then(console.log)

  let messages: Array<MessageData> = []

  $: messages =
    uniqueBy($getConvo.data?.conversationDirect?.messages?.edges?.map(
      (edge) => edge.node as MessageData
    ) ?? [], m => m.id) ?? messages

  const sentMessages = new SentMessagesStore()

  $: sentMessages.listen()

  $: {
    if ($sentMessages.data) {
      if ($sentMessages.data.messages?.author.id === recipient.id) {
        messages = [...messages, $sentMessages.data.messages]
      }
    }
  }
</script>

<div
  class="flex h-full max-h-screen min-h-0 w-full min-w-0 flex-col overflow-hidden"
>
  <section class="relative flex-0 flex w-full flex-row font-medium gap-2 my-2 items-center z-[100] h-8">
    <Avatar src={moss} dot={{ placement: 'bottom-right', color: statusColor(recipient.status) }} size="sm" />
    {recipient.displayName}
  </section>

  <Messages
    {messages}
    recipient={{ type: 'USER', id: recipient.id }}
    on:scrollup={(_) =>
      $getConvo.pageInfo.hasPreviousPage ? getConvo.loadPreviousPage() : void 0
    }
  />
</div>
