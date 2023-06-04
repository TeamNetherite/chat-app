<script lang="ts">
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

  export let message: MessageData | ChannelMessageData

  const mid = message.id.replace(/^message:/, '')
  const me: UserData = $ME.data!.me

  let moar = false
</script>

<HoverCard openDelay={0} closeDelay={0}>
  <HoverCardTrigger>
    <div class="flex flex-col" id="message-data-{mid}">
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
      <div class="whitespace-break-spaces text-base text-neutral-300">
        {message.content}
      </div>
    </div>
  </HoverCardTrigger>
  <HoverCardContent side='top' align='end' avoidCollisions={false} class='border-none outline-none p-0 mr-2 w-max' sideOffset={-10}>
    <Toolbar color="none" embedded class="bg-gray-600 rounded-lg">
      <ToolbarButton>
        <MdiReply />
      </ToolbarButton>
      <ToolbarButton class="transition-colors duration-500 hover:text-red-400">
        <MdiDelete />
      </ToolbarButton>

      <Popper>
        <PopperAnchor>
      <ToolbarButton>
        <MdiMore />
      </ToolbarButton>
        </PopperAnchor>

      <PopperContent>
        <Sidebar>
          <SidebarWrapper divClass="bg-gray-600">
            <SidebarGroup>
              {#if message.author.id === me.id}
                <SidebarItem label="Delete message">
                  <MdiDelete slot="icon" />
                </SidebarItem>
              {/if}
              <SidebarItem label="Reply">
                <MdiReply slot="icon" />
              </SidebarItem>
            </SidebarGroup>
          </SidebarWrapper>
        </Sidebar>
      </PopperContent>
      </Popper>
    </Toolbar>
  </HoverCardContent>
</HoverCard>
