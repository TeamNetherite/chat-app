<script lang="ts">
  import { page } from '$app/stores'
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from '$lib/nui'
  import { cast, type ArrayOf, cn } from '$lib/typemagic'
  import MdiAccountBox from '~icons/mdi/account-box'
  import MdiLogout from '~icons/mdi/logout'
  import MdiPalette from '~icons/mdi/palette'
  import MdiClose from '~icons/mdi/close'
  import { goto } from '$app/navigation'

  const tabs = [
    {
      account: [MdiAccountBox, 'Account'],
    } as const,
    {
      appearance: [MdiPalette, 'Appearance']
    } as const,
    {
      '/': [MdiLogout, 'Logout', () => {}],
    } as const,
  ]

  const tabHrefs: (keyof ArrayOf<typeof tabs>)[] = cast(
    tabs.flatMap(Object.keys)
  )

  let active: keyof ArrayOf<typeof tabs> | null = null

  $: {
    const key = $page.url.pathname.split('/').at(-1)!
    active = key in tabHrefs ? cast(key) : null
  }

  function escape() { goto('/app/@me') }
</script>

<svelte:window on:keyup={(e) => (e.key === 'Escape' || e.keyCode === 27) && escape()} />

<div class="flex flex-row gap-8 h-full">
  <Sidebar asideClass="[min-width:16rem] w-max max-w-full ml-16 mt-8 h-full">
    <SidebarWrapper divClass="[min-width:16rem] w-max max-w-full flex flex-col h-full">
      {#each tabs as tab}
        <SidebarGroup ulClass={cn('space-y-2', '/' in tab && 'mt-auto mb-16')}>
          {#each Object.entries(tab) as [href, data]}
            {@const [icon, label] = data}
            {@const onclick = data[2] ? data[2] : () => {}}
            <SidebarItem href={href === '/' ? href : `/app/settings/${href}`} {label} on:click={onclick} data-sveltekit-replacestate='' data-sveltekit-preload>
              <svelte:component this={icon} slot="icon" />
            </SidebarItem>
          {/each}
        </SidebarGroup>
      {/each}
    </SidebarWrapper>
  </Sidebar>
  
  <div class="w-full h-full my-8">
    <slot />
  </div>
  
  <button class="ml-auto self-start mr-10 mt-8 flex flex-col gap-2 items-center" on:click={() => escape()}>
    <MdiClose class='p-2 rounded-full outline outline-background-secondary w-8 h-8 bg-secondary' />
    ESC
  </button>
</div>
