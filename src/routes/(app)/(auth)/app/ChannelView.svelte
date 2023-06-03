<script lang="ts">
  import { GetChannelConvoStore, type Conversations$result, SentMessagesStore } from "$houdini"
  import type { ChannelMessageData } from "$lib/graphql"
  import { type ArrayOf, uniqueBy } from "$lib/typemagic";
  import Messages from "./Messages.svelte";

  export let channel: NonNullable<ArrayOf<Conversations$result['conversations']>['recipient']['asChannel']>
  const getConvo = new GetChannelConvoStore

  $: getConvo.fetch({ variables: { channel: channel.identifier } })
  
  let messages: Array<ChannelMessageData> = []


  function lar<T>(a: T): typeof a {
    console.log(a)
    return a
  }

  $: messages =
    uniqueBy($getConvo.data?.byId?.channel?.talk?.messages?.edges?.map(
      (edge) => edge.node as ChannelMessageData
    ) ?? lar(messages), m => m.id)

  const sentMessages = new SentMessagesStore()

  $: sentMessages.listen()

  $: {
    if ($sentMessages.data) {
      if ($sentMessages.data.messages?.recipient.asChannel?.identifier === channel.identifier) {
        messages = [...messages, $sentMessages.data.messages]
      }
    }
  }
</script>

<div
  class="relative flex h-full max-h-screen min-h-0 w-full min-w-0 flex-col overflow-hidden"
>
  <div class="flex w-full flex-row font-medium">
    {channel.name}
  </div>

  <Messages
    {messages}
    recipient={{ type: 'CHANNEL', id: channel.identifier }}
    on:scrollup={(_) =>
      $getConvo.pageInfo.hasPreviousPage ? getConvo.loadPreviousPage() : void 0}
  />
</div>
