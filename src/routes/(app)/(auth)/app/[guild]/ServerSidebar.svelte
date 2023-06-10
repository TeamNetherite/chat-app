<script lang="ts">
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from '$lib/nui'
  import { Button } from '$lib/nui-next/button'
  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from '$lib/nui-next/dialog'
  import { cn, unnull } from '$lib/typemagic'
  import MdiHash from '~icons/mdi/pound'
  import MdiHome from '~icons/mdi/home'
  import MdiPlus from '~icons/mdi/plus'
  import { page } from '$app/stores'
  import type { GetChannelsStore } from '$houdini'
  import MyselfView from '../MyselfView.svelte'
  import { getContext } from 'svelte'

  export let serverId: string

  export let GetChannels: GetChannelsStore

  const drawerClose = getContext<() => void>('drawerClose')
</script>

<div class="flex flex-col gap-1">
  <Sidebar
    asideClass="mt-5 mb-5 bg-background-secondary bg-background-secondary w-80 rounded-xl h-full"
  >
    <SidebarWrapper
      divClass="h-full flex flex-col bg-background-secondary bg-background-secondary p-2 rounded-xl gap-2"
    >
      <SidebarGroup>
        <SidebarItem
          label="Home"
          href="/app/{serverId}"
          active={$page.url.pathname === `/app/${serverId}`}
          class="rounded-xl"
          on:click={drawerClose}
        >
          <MdiHome slot="icon" />
        </SidebarItem>
      </SidebarGroup>
      <div class="flex w-full items-center">
        <div
          class="mx-2 my-2 h-0.5 w-full border-t-0 bg-background-secondary opacity-100 dark:bg-background-secondary dark:opacity-50"
        />
        <Dialog modal>
          <DialogTrigger>
            <Button variant="ghost" class="p-0">
              <MdiPlus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create channel</DialogTitle>
              <DialogDescription>
                Yeah, you create channels here.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <SidebarGroup class="flex flex-col gap-1">
        {#if $GetChannels.data}
          {@const channels = unnull($GetChannels.data.byId.guild).channels}
          {#each channels as channel, idx (channel.identifier)}
            <SidebarItem
              label={channel.name}
              href="/app/{serverId}/{channel.identifier}"
              active={$page.url.pathname ===
                `/app/${serverId}/${channel.identifier}`}
              aClass={cn(
                'flex items-center p-2 text-base font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
                idx + 1 === channels.length ? 'rounded-b-xl' : 'rounded-b-md',
                idx === 0 ? 'rounded-t-xl' : 'rounded-t-md'
              )}
              on:click={drawerClose}
            >
              <MdiHash slot="icon" />
            </SidebarItem>
          {/each}
        {/if}
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
  <MyselfView />
</div>
