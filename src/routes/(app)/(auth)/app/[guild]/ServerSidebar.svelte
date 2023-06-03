<script lang="ts">
  import { Divider, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from '$lib/nui'
  import { unnull } from '$lib/typemagic'
  import MdiHash from '~icons/mdi/pound'
  import MdiHome from '~icons/mdi/home'
  import { page } from '$app/stores'
  import type { GetChannelsStore } from '$houdini'

  export let serverId: string

  export let GetChannels: GetChannelsStore
</script>

<Sidebar
  asideClass="mt-5 mb-5 bg-light-secondary dark:bg-dark-secondary w-80 rounded-xl"
>
  <SidebarWrapper
    divClass="h-full flex flex-col dark:bg-dark-secondary bg-light-secondary p-2 rounded-xl gap-2"
  >
    <SidebarGroup>
      <SidebarItem label='Home' href='/app/{serverId}' active={$page.url.pathname === `/app/${serverId}`}>
        <MdiHome slot="icon" />
      </SidebarItem>
    </SidebarGroup>
    <Divider class='bg-dark-secondary dark:bg-light-secondary' />
    <SidebarGroup class='flex flex-col gap-1'>
      {#if $GetChannels.data}
        {@const channels = unnull($GetChannels.data.byId.guild).channels}
        {#each channels as channel (channel.identifier)}
          <SidebarItem
            label={channel.name}
            href="/app/{serverId}/{channel.identifier}"
            active={$page.url.pathname === `/app/${serverId}/${channel.identifier}`}
          >
            <MdiHash slot="icon" />
          </SidebarItem>
        {/each}
      {/if}
    </SidebarGroup>
  </SidebarWrapper>
</Sidebar>
