<script lang="ts" context="module">
  export const purifyOptions: DOMPurify.Config = {
    FORBID_TAGS: ['a', 'iframe', 'link'],
    USE_PROFILES: { html: true },
    FORBID_ATTR: ['style', 'href'],
    SAFE_FOR_TEMPLATES: true
  }
</script>
<script lang="ts">
  import { marked } from 'marked'
  import DOMPurify from 'dompurify'
  import {
    Toolbar,
    ToolbarButton,
    Sidebar,
    SidebarGroup,
    SidebarWrapper,
    SidebarItem,
  } from '$lib/nui'
  import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
  } from '$lib/nui-next/hover-card'
  import { Popper, PopperAnchor, PopperContent } from '$lib/nui-next/popper'
  import {
    type MessageData,
    type UserData,
    ME,
    type ChannelMessageData,
  } from '$lib/graphql'
  import MdiMore from '~icons/mdi/dots-horizontal'
  import MdiDelete from '~icons/mdi/delete'
  import MdiReply from '~icons/mdi/reply'
  import { slide } from 'svelte/transition'
  import { quartInOut } from 'svelte/easing'
  import { createEventDispatcher } from 'svelte'
  import Circle2 from 'svelte-loading-spinners/Circle2.svelte'
  import { DeleteMessageStore } from '$houdini'

  export let message: MessageData | ChannelMessageData
  export let referenced: Omit<MessageData, 'recipient'> | undefined = undefined
  export let DeleteMessage = new DeleteMessageStore

  const mid = message.id.replace(/^message:/, '')
  const me: UserData = $ME.data!.me

  let hc: {
    dataset: {
      state: "open" | "closed"
    }
  } | undefined

  const ev = createEventDispatcher<{
    setreply: { message: typeof message }
  }>()

  function reply() {
    ev('setreply', { message })
  }
  async function del() {
    await DeleteMessage.mutate({
      mid: message.id
    })
    hc?.dataset?.state && (hc.dataset.state = 'closed')
  }
</script>

<HoverCard openDelay={0} closeDelay={0}>
  <HoverCardTrigger>
    <div class="flex flex-col" id="message-data-{mid}">
      {#if referenced}
        <a href="#message-data-{referenced.id}" class="flex flex-row">
          <div class="h-2 w-4 rounded-sm border-2 border-seasalt" />
        </a>
      {/if}
      <div class="flex flex-row items-center gap-2 text-base">
        <span class="font-medium">{message.author.displayName}</span>
        <span class="text-sm text-base1984-muted">
          {new Date(Date.parse(message.createdAt)).toLocaleString(undefined, {
            day: undefined,
            month: undefined,
            year: undefined,
            timeStyle: 'short',
          })}
        </span>
      </div>
      <div class="text-base text-neutral-300">
        {#await marked(message.content, { mangle: false, headerIds: false, headerPrefix: undefined, async: true })}
          <Circle2 />
        {:then md}
          {@const sanity = DOMPurify.sanitize(md, purifyOptions)}
          {@html sanity}
        {/await}
      </div>
    </div>
  </HoverCardTrigger>
  <HoverCardContent
    bind:this={hc}
    side="top"
    align="end"
    avoidCollisions={false}
    class="mr-2 w-max border-none p-0 outline-none"
    sideOffset={-10}
  >
    <Toolbar color="none" embedded class="rounded-lg bg-gray-600">
      <ToolbarButton on:click={reply}>
        <MdiReply />
      </ToolbarButton>
      {#if message.author.id === me.id}
        <ToolbarButton
          class="transition-colors duration-500 hover:text-red-400"
          on:click={del}
        >
          <MdiDelete />
        </ToolbarButton>
      {/if}

      <Popper>
        <PopperAnchor>
          <ToolbarButton>
            <MdiMore />
          </ToolbarButton>
        </PopperAnchor>

        <PopperContent side="left">
          <!-- i swear transitions -->
          <div transition:slide={{ axis: 'y', easing: quartInOut }}>
            <Sidebar>
              <SidebarWrapper divClass="bg-gray-600 p-2">
                <SidebarGroup>
                  <SidebarItem label="Reply" on:click={reply}>
                    <MdiReply slot="icon" />
                  </SidebarItem>
                  {#if message.author.id === me.id}
                    <SidebarItem label="Delete message" on:click={del}>
                      <MdiDelete slot="icon" />
                    </SidebarItem>
                  {/if}
                </SidebarGroup>
              </SidebarWrapper>
            </Sidebar>
          </div>
        </PopperContent>
      </Popper>
    </Toolbar>
  </HoverCardContent>
</HoverCard>
