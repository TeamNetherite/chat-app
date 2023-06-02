<script lang="ts">
  import type { Conversations$result } from "$houdini"
  import { MessageData } from "$lib/graphql"
  import type { ArrayOf } from "$lib/typemagic";


  export let channel: NonNullable<ArrayOf<Conversations$result['conversations']>['recipient']['asChannel']>
  
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
  class="relative flex h-full max-h-screen min-h-0 w-full min-w-0 flex-col overflow-hidden"
>
  <div class="flex w-full flex-row font-medium">
    {recipient.displayName}
  </div>

  <Messages
    {messages}
    recipient={{ type: 'USER', id: recipient.id }}
    on:scrollup={(_) =>
      $getConvo.pageInfo.hasPreviousPage ? getConvo.loadPreviousPage() : void 0}
  />
</div>
