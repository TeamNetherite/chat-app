<script lang="ts">
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from '$lib/nui'
  import { Button } from '$lib/nui-next/button'
  import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '$lib/nui-next/dialog'
  import { cn, unnull } from '$lib/typemagic'
  import MdiHash from '~icons/mdi/pound'
  import MdiHome from '~icons/mdi/home'
  import MdiPlus from '~icons/mdi/plus'
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
      <SidebarItem
        label="Home"
        href="/app/{serverId}"
        active={$page.url.pathname === `/app/${serverId}`}
        class="rounded-xl"
      >
        <MdiHome slot="icon" />
      </SidebarItem>
    </SidebarGroup>
    <div class="flex w-full items-center">
      <div
        class="mx-2 my-2 h-0.5 w-full border-t-0 bg-dark-secondary opacity-100 dark:bg-light-secondary dark:opacity-50"
      />
      <Dialog modal>
        <DialogTrigger>
          <Button variant='ghost'>
            <MdiPlus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create channel
            </DialogTitle>
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
              (idx === channels.length - 1 && 'rounded-b-xl') || 'rounded-t-md',
              (idx === 0 && 'rounded-t-xl') || 'rounded-t-md'
            )}
          >
            <MdiHash slot="icon" />
          </SidebarItem>
        {/each}
      {/if}
    </SidebarGroup>
  </SidebarWrapper>
</Sidebar>
