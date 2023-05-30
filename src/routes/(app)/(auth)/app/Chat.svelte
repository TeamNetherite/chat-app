<script lang="ts">
  import {
    GetDMStore,
    type Conversations$result,
    type GetDM$result,
    SendMessageStore,
    SentMessagesStore,
  } from '$houdini'
  import MdiSend from '~icons/mdi/send'
  import { type ArrayOf, groupBy, uniqueBy } from '$lib/typemagic'
  import Status from '$lib/Status.svelte'

  type Message = ArrayOf<
    GetDM$result['conversationDirect']['messages']['edges']>['node']

  export let currentConvo: NonNullable<
    ArrayOf<Conversations$result['conversations']>['recipient']['asUser']
  >

  const getConvo = new GetDMStore()

  $: getConvo.fetch({ variables: { userId: currentConvo.id } }).then(console.log)

  let messages: Array<Message> = []

  $: messages =
    uniqueBy($getConvo.data?.conversationDirect?.messages?.edges?.map(
      (edge) => edge.node as Message
    ) ?? [], m => m.id) ?? messages

  let messageContent = ''

  const sendMessage = new SendMessageStore()

  function send() {
    ;(async () => {
      const message = await sendMessage.mutate({
        init: {
          content: messageContent,
          recipient: 'user:' + currentConvo.id,
        },
        userId: 'user:' + currentConvo.id,
      })

      if (bonk) {
        bonk.scrollTo({ top: bonk.scrollHeight, behavior: 'auto' })
      }

      console.log(message)
      //messages = [...messages, message.data!.sendMessage!]

      messageContent = ''
    })()
  }

  const sentMessages = new SentMessagesStore()

  $: sentMessages.listen()

  $: {
    if ($sentMessages.data) {
      if ($sentMessages.data.messages?.author.id === currentConvo.id) {
        messages = [...messages, $sentMessages.data.messages]
      }
    }
  }

  let messagesGrouped: [string, Message[]][] = []

  $: messagesGrouped = Array.from(
    groupBy(messages.sort((vA, vB) => Date.parse(vA.createdAt) - Date.parse(vB.createdAt)), (m) => {
      const date = new Date(Date.parse(m.createdAt))
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }).entries()
  )

  // scroll the fuck down
  function stfd(_: HTMLDivElement) {
    if (bonk === undefined || bonk.dataset.hasBonked === 'true') return { destroy() {} }
    bonk.scrollTop = bonk.scrollHeight
    bonk.dataset.hasBonked = 'true'

    return {
      destroy() {
        bonk?.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      },
    }
  }

  let bonk: HTMLDivElement | undefined = undefined
  let prevScY = 0
</script>

<div
  class="relative flex h-full max-h-screen min-h-0 w-full min-w-0 flex-col overflow-hidden"
>
  <div class="flex w-full flex-row font-medium">
    <Status status={currentConvo.status} class="mr-1 self-center" />
    {currentConvo.displayName}
  </div>
  <div class="scrollerContent" bind:this={bonk} on:scroll={(n) => {
    ;(async () => {
      const node = n.currentTarget
      const scY = node.scrollTop
      if (prevScY < scY) {
        // down
      } else if (prevScY > scY && $getConvo.pageInfo.hasPreviousPage) {
        // up
        await getConvo.loadPreviousPage()
      }
      prevScY = node.scrollTop
    })()
  }}>
    <ol class="scrollerInner">
      {#if messages.length !== 0}
        <div use:stfd />
        {#each messagesGrouped as [day, messagess]}
          <div class="date-breaker flex" role="separator" aria-label={day}>
            <span class="date-breaker-inner">{day}</span>
          </div>
          {#each messagess as message}
            <li
              class="message"
              id="chat-message-{currentConvo.id}-{message.id.replace(
                /^message:/,
                ''
              )}"
            >
              <div class="flex flex-row items-center gap-2 text-base">
                <span class="font-medium">{message.author.displayName}</span>
                <span class="text-sm text-base1984-muted"
                  >{new Date(Date.parse(message.createdAt)).toLocaleString(
                    undefined,
                    {
                      day: undefined,
                      month: undefined,
                      year: undefined,
                      timeStyle: 'short',
                    }
                  )}</span
                >
              </div>
              <div class="whitespace-break-spaces text-base text-neutral-300">
                {message.content}
              </div>
            </li>
          {/each}
        {/each}
        <div class="scrollerSpacer" />
      {:else}
        <div class="h-full justify-center">so um. no conversation :(</div>
      {/if}
    </ol>
  </div>

  <form
    on:submit|preventDefault={send}
    class="space-between z-[2] flex w-full flex-row justify-end rounded-md bg-gray-700 outline outline-zinc-300"
  >
    <!-- svelte-ignore a11y-autofocus -->
    <input
      autofocus
      bind:value={messageContent}
      class="w-full bg-transparent text-black dark:text-white"
    />
    <button>
      <MdiSend class="text-sky-600" />
    </button>
  </form>
</div>

<style lang="scss">
  .message {
    @apply flex flex-col pl-5 hover:bg-gray-900;
  }

  .date-breaker {
    @apply z-[1] flex max-w-full justify-center text-sm font-semibold text-base1984-muted;
    z-index: 1;
    height: 0;
    border-top: thin solid theme('colors.stone.700');
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    pointer-events: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: 1rem;
    margin-right: 0.875rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;

    .date-breaker-inner {
      @apply bg-gray-800;
      border: none;
      display: block;
      padding: 2px 4px;
      flex: 0 0 auto;
      line-height: 13px;
      margin-top: -1px;
      border-radius: 8px;
    }
  }

  .scrollerContent {
    overflow-y: scroll;
    overflow-anchor: none;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    min-height: 100%;
    height: 100%;
    scrollbar-width: auto;
    scrollbar-color: theme('colors.stone.900');

    &::-webkit-scrollbar {
      @apply h-4 w-4;
    }
    &::-webkit-scrollbar-thumb {
      @apply bg-stone-900;
      background-clip: padding-box;
      border: 4px solid transparent;
      border-radius: 8px;
    }
    &::-webkit-scrollbar-track {
      @apply bg-gray-800;
    }
  }

  .scrollerInner {
    @apply bg-gray-800;
    min-height: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .scrollerSpacer {
    height: 0;
    margin-top: 1rem;
  }
</style>
