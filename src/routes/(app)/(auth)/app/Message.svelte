<script lang="ts">
  import { Popover, Toolbar, ToolbarButton, Sidebar, SidebarGroup, SidebarWrapper, SidebarItem } from '$lib/nui'
  import { type MessageData, type UserData, ME } from '$lib/graphql'
  import MdiMore from '~icons/mdi/dots-horizontal'
  import MdiDelete from '~icons/mdi/delete'
  import MdiReply from '~icons/mdi/reply'

  export let message: MessageData

  const mid = message.id.replace(/^message:/, "")
  const me: UserData = $ME.data!.me
</script>

<div>
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
  <Popover triggeredBy='#message-data-{mid}' placement='top-end' offset={-10} arrow={false} class="bg-gray-600" defaultClass="bg-gray-600">
    <Toolbar color='none' embedded class='bg-gray-600'>
      <ToolbarButton>
        <MdiReply />
      </ToolbarButton>
      <ToolbarButton class='hover:text-red-400 transition-colors duration-500'>
        <MdiDelete />
      </ToolbarButton>
      <ToolbarButton id='{mid}-moar'>
        <MdiMore />
      </ToolbarButton>
      
      <Popover triggeredBy='#{mid}-moar' placement='left' arrow={false} trigger='click' class="bg-gray-600" defaultClass="bg-gray-600">
        <Sidebar>
          <SidebarWrapper divClass="bg-gray-600">
            <SidebarGroup>
              {#if message.author.id === me.id}
                <SidebarItem label="Delete message">
                  <MdiDelete slot='icon' />
                </SidebarItem>
              {/if}
              <SidebarItem label='Reply'>
                <MdiReply slot='icon' />
              </SidebarItem>
            </SidebarGroup>
          </SidebarWrapper>
        </Sidebar>
      </Popover>
    </Toolbar>
  </Popover>
</div>
