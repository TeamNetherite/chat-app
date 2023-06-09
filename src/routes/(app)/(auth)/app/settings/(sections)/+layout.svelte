<script lang="ts">
  import { page } from '$app/stores'
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from '$lib/nui'
  import { cast, type ArrayOf, cn, toTitleCase } from '$lib/typemagic'
  import MdiClose from '~icons/mdi/close'
  import MdiArrowLeft from '~icons/mdi/arrow-left'
  import { goto } from '$app/navigation'
  import { isDrawer } from '$lib/state'
  import { tabs } from '../things'

  const tabHrefs: (keyof ArrayOf<typeof tabs>)[] = cast(
    tabs.flatMap(Object.keys)
  )

  let active: keyof ArrayOf<typeof tabs> | null = null

  $: {
    const key = $page.url.pathname.split('/').at(-1)!
    active = key in tabHrefs ? cast(key) : null
  }

  function escape() {
    goto('/app/@me')
  }
  const drawer = isDrawer().autoDestroy()
</script>

<svelte:window
  on:keyup={(e) => (e.key === 'Escape' || e.keyCode === 27) && escape()}
/>

<div class="flex h-full flex-row gap-8">
  {#if !$drawer}
    <Sidebar asideClass="[min-width:16rem] w-max max-w-full ml-16 mt-8 h-full">
      <SidebarWrapper
        divClass="[min-width:16rem] w-max max-w-full flex flex-col h-full"
      >
        {#each tabs as tab}
          <SidebarGroup
            ulClass={cn('space-y-2', '/' in tab && 'mt-auto mb-16')}
          >
            {#each Object.entries(tab) as [href, data]}
              {@const [icon, label] = data}
              {@const onclick = data[2] ? data[2] : () => {}}
              <SidebarItem
                href={href === '/' ? href : `/app/settings/${href}`}
                {label}
                on:click={onclick}
                data-sveltekit-replacestate=""
                data-sveltekit-preload
              >
                <svelte:component this={icon} slot="icon" />
              </SidebarItem>
            {/each}
          </SidebarGroup>
        {/each}
      </SidebarWrapper>
    </Sidebar>
  {/if}

  <div class="flex h-full w-full flex-col">
    {#if $drawer}
      <section class="flex flex-row gap-2">
        <a href="/app/settings"><MdiArrowLeft /></a>
        {toTitleCase($page.url.pathname.split('/').at(-1) ?? '')}
      </section>
    {/if}
    <div class="my-8 h-full w-full">
      <slot />
    </div>
  </div>

  <button
    class="ml-auto mr-10 mt-8 flex flex-col items-center gap-2 self-start"
    on:click={() => escape()}
  >
    <MdiClose
      class="h-8 w-8 rounded-full bg-secondary p-2 outline outline-background-secondary"
    />
    ESC
  </button>
</div>
