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
  import { afterNavigate, goto } from '$app/navigation'
  import MdiAccount from '~icons/mdi/account'
  import { setContext } from 'svelte'
  import MdiChat from '~icons/mdi/chat'
  import { slide } from 'svelte/transition'
  import { page } from '$app/stores'
  import { writable } from 'svelte/store'

  type ServerIguess = {
    id: string
    name: string
  }

  let servers: ServerIguess[] = []

  const getServers_ = new GetGuildsStore()

  $: getServers_.fetch()
  $: servers = $getServers_.data?.guilds ?? servers

  const drawer = isDrawer()

  export let _drawerOpen = false

  const drawerOpen = writable(_drawerOpen)

  setContext('drawerOpen', () => ($drawerOpen = !$drawerOpen))
  setContext('drawerReallyOpen', () => ($drawerOpen = true))
  setContext('drawerClose', () => ($drawerOpen = false))
</script>

<div
  class="scrollbar-rmrf flex h-full w-full gap-5"
  class:drawer={$drawer}
  id="app-root"
>
  {#if $$slots.channels}
    <div class="yayyyyyayyayay flex flex-row" data-open={$drawerOpen.toString()}>
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
  {/if}

  {#key $page.url.pathname}
    <slot name="content">GG</slot>
  {/key}

  {#if $drawer && $drawerOpen}
    <div transition:slide={{ axis: 'y', duration: 1000 }}>
      <BottomNav
        id="bottom-nav"
        outerDiv="z-[100]"
        innerDiv="grid-cols-2"
        position="absolute"
      >
        <BottomNavItem
          btnName="Chats"
          active={$page.url.pathname.match(/^\/app\/(@me|[\d]+)/)}
        >
          <MdiChat />
        </BottomNavItem>
        <BottomNavItem on:click={() => goto('/app/settings')} btnName="Me">
          <MdiAccount />
        </BottomNavItem>
      </BottomNav>
    </div>
  {/if}

  <style lang="scss">
    #app-root.drawer > main {
      position: relative;
      transition: left 0.5s;
    }
    #app-root.drawer > .yayyyyyayyayay {
      position: absolute;
      // a drawer
      transition: left 0.5s;
      // haha rust slice go brrrrr
      &[data-open='true'] {
        left: 0;

        & + main {
          left: 50%;
        }
      }
      &[data-open='false'] {
        left: -100%;
      }
    }
  </style>
</div>
