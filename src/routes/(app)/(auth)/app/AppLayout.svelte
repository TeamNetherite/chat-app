<script lang="ts">
  import { GetGuildsStore } from '$houdini'
  import moss from '../../../../../assets/moss.png'
  import {
    Avatar,
    BottomNav,
    BottomNavItem,
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
  } from '$lib/nui'
  import { isDrawer } from '$lib/state'
  import { goto } from '$app/navigation'
  import MdiAccount from '~icons/mdi/account'

  type ServerIguess = {
    id: string
    name: string
  }

  let servers: ServerIguess[] = []

  const getServers_ = new GetGuildsStore()

  $: getServers_.fetch()
  $: servers = $getServers_.data?.guilds ?? servers

  const drawer = isDrawer().autoDestroy()

  let drawerOpen = false
</script>

<div class="scrollbar-rmrf flex h-full w-full flex-row gap-5">
  <div class="tf-drawer flex flex-row">
    <Sidebar asideClass="w-16 ml-2 mt-2">
      <SidebarWrapper divClass="w-16">
        <SidebarGroup>
          <SidebarItem href="/app/@me" class="flex flex-col items-center">
            <Avatar src={moss} slot="icon" />
          </SidebarItem>
        </SidebarGroup>
        <SidebarGroup>
          {#each servers as server (server.id)}
            <SidebarItem
              href="/app/{server.id}"
              class="flex flex-col items-center"
            >
              <Avatar id="server-{server.id}-icon" slot="icon" src={moss} />
            </SidebarItem>
          {/each}
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>
    <slot name="channels">
      <div class="self-center">Uhm...</div>
    </slot>
  </div>
  <slot name="content">GG</slot>
  {#if $drawer}
    <BottomNav position="absolute" navType="application" innerCustom="grid-cols-1">
      <BottomNavItem appBtnPosition='left' on:click={() => goto('/app/@me/settings')} btnName='Me'>
        <MdiAccount />
      </BottomNavItem>
    </BottomNav>
  {/if}
</div>
