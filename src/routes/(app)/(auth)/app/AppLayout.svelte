<script lang="ts">
  import { GetGuildsStore } from '$houdini'
  import moss from '../../../../../assets/moss.png'
  import { Avatar, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from '$lib/nui'

  type ServerIguess = {
    id: string,
    name: string,
  }

  let servers: ServerIguess[] = []

  const getServers_ = new GetGuildsStore

  $: getServers_.fetch()
  $: servers = $getServers_.data?.guilds ?? servers
</script>

<div class="scrollbar-rmrf full-viewport flex flex-row gap-5 w-full">
  <Sidebar asideClass='w-16 ml-2 mt-2'>
    <SidebarWrapper divClass='w-16'>
      <SidebarGroup>
        <SidebarItem href='/app/@me' class="flex flex-col items-center">
          <Avatar src={moss} slot="icon" />
        </SidebarItem>
      </SidebarGroup>
      <SidebarGroup>
        {#each servers as server (server.id)}
          <SidebarItem href='/app/{server.id}' class="flex flex-col items-center">
            <Avatar id="server-{server.id}-icon" slot="icon" src={moss} />
          </SidebarItem>
        {/each}
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
  <slot name="channels">
    <div class="self-center">Uhm...</div></slot
  >
  <slot name="content">GG</slot>
</div>
