<script lang="ts">
  import { goto } from '$app/navigation'
  import moss from '../../../../../assets/moss.png'
  import Divider from '$lib/nui/Divider.svelte'
  import type { Page } from '@sveltejs/kit'
  import { page } from '$app/stores'
  import { Avatar, List, Listgroup, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from '$lib/nui'
  import { cast, type ArrayOf } from '$lib/typemagic'

  type Selection =
    | {
        type: 'dm'
        current: string | null
      }
    | {
        type: 'guild'
        guild: string
        channel: string | null
      }

  function getSelection(pageStore: Page): Selection {
    const url = pageStore.url

    if (!url.pathname.startsWith('/app/@me')) {
      const [guild, channel] = url.pathname.split('/')

      return {
        type: 'guild',
        guild,
        channel: channel ? channel : null,
      }
    }

    return {
      type: 'dm',
      current: url.pathname.startsWith('/app/@me')
        ? url.pathname.split('/').at(-1) ?? null
        : null,
    }
  }

  const selection: Selection = getSelection($page)

  type ServerIguess = {
    id: string,
    name: string,
  }

  let servers: ServerIguess[] = [
    {
      id: '12387mtieurtcmerth',
      name: 'why'
    }
  ]
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
