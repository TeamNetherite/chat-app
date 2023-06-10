<script lang="ts">
  import { GetChannelConvoStore, type Conversations$result, SentMessagesStore } from "$houdini"
  import type { ChannelMessageData } from "$lib/graphql"
  import { isDrawer } from "$lib/state"
  import { type ArrayOf, uniqueBy } from "$lib/typemagic";
  import DrawerButton from "./DrawerButton.svelte"
  import Messages from "./Messages.svelte";
  import MdiHash from '~icons/mdi/pound'

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

  const drawer = isDrawer().autoDestroy()
</script>

<main
  class="flex h-full max-h-screen min-h-0 w-full min-w-0 flex-col gap-2"
>
  <section class="flex w-full flex-row font-medium gap-2 flex-0 items-center bg-background-secondary px-2 py-1 rounded-t-lg rounded-b-sm mt-5">
    <DrawerButton />
    <div class="bg-zinc-700 p-1 rounded-full">
      <MdiHash class="text-zinc-50" /> 
    </div>
    {channel.name}
  </section>

  <Messages
    {messages}
    recipient={{ type: 'CHANNEL', id: channel.identifier }}
    on:scrollup={(_) =>
      $getConvo.pageInfo.hasPreviousPage ? getConvo.loadPreviousPage() : void 0}
    cls='rounded-t-sm rounded-b-sm gap-1.5'
    iClass='rounded-t-sm rounded-b-lg'
  />
</main>
