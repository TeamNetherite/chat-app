<script lang="ts">
  import {
    SendMessageStore,
    SendChannelMessageStore,
    type MessageInit,
  } from '$houdini'
  import type { ChannelMessageData, MessageData } from '$lib/graphql'
  import { cn, groupBy, SANITIZE } from '$lib/typemagic'
  import { createEventDispatcher } from 'svelte'
  import MdiSend from '~icons/mdi/send'
  import Message from './Message.svelte'
  import type { KeyboardEventHandler } from 'svelte/elements'

  export let messages: (MessageData | ChannelMessageData)[]
  export let recipient: MessageInit['recipient']
  export let cls = ''
  export let iClass = ''

  let sendForm: HTMLFormElement | undefined

  const keypress: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if ((e.key === 'Enter' || e.keyCode === 13) && !e.shiftKey) {
      e.preventDefault()
      sendForm?.dispatchEvent(new SubmitEvent('submit'))
    }
  }

  const scrollUp = createEventDispatcher()

  let recipientId = ''

  $: recipientId = recipient.type.toLowerCase() + ':' + recipient.id

  let messageContent = ''

  $: messageContent = messageContent.substring(0, 2000).trimStart()

  const sendMessage: SendMessageStore | SendChannelMessageStore =
    recipient.type === 'CHANNEL'
      ? new SendChannelMessageStore()
      : new SendMessageStore()

  let reference: string | undefined = undefined

  function send() {
    ;(async () => {
      if (messageContent.trim().length === 0) return
      const message = await sendMessage.mutate({
        init: {
          content: messageContent
            .trim()
            .split('')
            .filter(
              (char) =>
                !SANITIZE.includes(char) || !SANITIZE.includes(`\\${char}`)
            )
            .join(''),
          recipient: {
            ...recipient,
            id: recipientId,
          },
          reference,
        },
        recipientId,
      })

      if (bonk) {
        bonk.scrollTo({ top: bonk.scrollHeight, behavior: 'auto' })
      }

      console.log(message)
      //messages = [...messages, message.data!.sendMessage!]

      messageContent = ''
    })()
  }
  let messagesGrouped: [string, (MessageData | ChannelMessageData)[]][] = []

  $: messagesGrouped = Array.from(
    groupBy(
      messages.sort(
        (vA, vB) => Date.parse(vA.createdAt) - Date.parse(vB.createdAt)
      ),
      (m) => {
        const date = new Date(Date.parse(m.createdAt))
        return date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      }
    ).entries()
  )

  // scroll the fuck down
  function stfd(_: HTMLDivElement) {
    if (bonk === undefined || bonk.dataset.hasBonked === 'true')
      return { destroy() {} }
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

<div class={cn('flex flex-grow-0 flex-col pb-10', cls)} style="max-height: max(40rem, 90dvh)">
    <div
      class="scrollerContent"
      bind:this={bonk}
      on:scroll={(n) => {
        const node = n.currentTarget
        const scY = node.scrollTop
        if (prevScY < scY) {
          // down
        } else if (prevScY > scY) {
          // up
          scrollUp('scrollup', {
            position: scY,
          })
        }
        prevScY = node.scrollTop
      }}
    >
      <ol class="scrollerInner pb-10">
        {#if messages.length !== 0}
          <div use:stfd />
          {#each messagesGrouped as [day, messagess]}
            <div class="date-breaker flex" role="separator" aria-label={day}>
              <span class="date-breaker-inner p-2">{day}</span>
            </div>
            {#each messagess as message}
              <li
                class="message"
                id="chat-message-{recipient.id}-{message.id.replace(
                  /^message:/,
                  ''
                )}"
              >
                <Message
                  {message}
                  referenced={message.reference}
                  on:setreply={(e) => (reference = e.detail.message.id)}
                />
              </li>
            {/each}
          {/each}
        {:else}
          <div class="h-full justify-center">so um. no conversation :(</div>
        {/if}
      </ol>
    </div>

  <form
    on:submit|preventDefault={send}
    class={cn(
      'space-between relative z-[100] flex max-w-full flex-row justify-between rounded-md bg-background-secondary',
      iClass
    )}
    bind:this={sendForm}
  >
    <!-- svelte-ignore a11y-autofocus -->
    <textarea
      autofocus
      on:input={(e) => {
        e.currentTarget.style.height = 'auto'
        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px'
      }}
      on:keypress={keypress}
      bind:value={messageContent}
      class="block w-full resize-none overflow-hidden bg-transparent px-2 py-0.5 text-black outline-none focus:outline-none active:outline-none dark:text-white"
      aria-invalid={messageContent.length === 0}
    />
    <button class="mr-2">
      <MdiSend class="text-sky-600" />
    </button>
  </form>
</div>

<style lang="scss">
  .date-breaker {
    @apply mx-3 flex max-w-full justify-center border-t-accent text-sm font-semibold text-muted-foreground;
    height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex: 0 0 auto;
    pointer-events: none;
    box-sizing: border-box;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    border-width: thin;

    .date-breaker-inner {
      @apply bg-gray-800 p-2 px-5;
      border: none;
      display: inline-block;
      flex: 0 0 auto;
      line-height: 13px;
      margin-top: -1px;
      border-radius: 8px;
    }
  }

  .scrollerContent {
    position: relative;
    overflow-y: scroll;
    overflow-anchor: none;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 100%;
    height: inherit;
    scrollbar-width: auto;
    scrollbar-color: theme('colors.stone.900');
    &::-webkit-scrollbar {
      @apply h-4 w-4;
    }
    &::-webkit-scrollbar-thumb {
      @apply bg-secondary;
      background-clip: padding-box;
      border: 4px solid transparent;
      border-radius: 8px;
    }
    &::-webkit-scrollbar-track {
      @apply bg-background-secondary;
    }
  }
  .scrollerInner {
    min-height: 0;
    height: inherit;
  }
</style>
