<script lang="ts">
  import { MeStore, SetStatusStore, Status as statuses } from '$houdini'
  import {
    SidebarButton,
    SidebarGroup,
    SidebarWrapper,
    Popover,
    Button,
    Sidebar,
    ChevronRight,
    ChevronDown,
    ButtonGroup,
    Avatar,
  } from '$lib/nui'
  import { unnull, screamingSnakeToTitle, statusColor } from '$lib/typemagic'
  import moss from '$lib/../../assets/moss.png'
  import { slide } from 'svelte/transition'
  import Profile from '$lib/Profile.svelte'
  import Status from '$lib/Status.svelte'

  import MdiSettings from '~icons/mdi/settings'
  import { Skeleton } from '$lib/nui-next/skeleton'
  import { Popper, PopperAnchor, PopperContent } from '$lib/nui-next/popper'
  import { isDrawer } from '$lib/state'

  const me_ = new MeStore()
  const setStatus = new SetStatusStore()
  let statusOpen = false

  const drawer = isDrawer().autoDestroy()
</script>

{#if !$drawer}
<div
  class="mb-5 rounded-b-lg rounded-t-md bg-background-secondary p-3"
>
  {#await me_.fetch()}
    <div class="flex items-center space-x-4">
      <Skeleton class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]" />
        <Skeleton class="h-4 w-[250px]" />
      </div>
    </div>
  {:then me__}
    {@const me = unnull(me__.data).me}
    <Popper>
      <PopperAnchor>
        <div
          class="flex w-full items-center gap-4 self-center rounded-b-lg rounded-t-sm"
          id="myself-view"
        >
          <Avatar
            src={moss}
            dot={{ placement: 'bottom-right', color: statusColor(me.status) }}
          />
          <div class="flex flex-auto flex-row">
            <div class="min-w-0 flex-1">
              <p
                class="text-md truncate font-medium text-gray-900 dark:text-white"
              >
                {me.displayName}
              </p>
              <p class="text-md truncate text-gray-500 dark:text-gray-400">
                {me.tag}
              </p>
            </div>

            <ButtonGroup>
              <Button
                pill
                href="/app/settings"
                size="sm"
                color="none"
                on:click={e => e.stopPropagation()}
                class="transition-colors duration-100 ease-in hover:bg-sky-600 hover:duration-300"
              >
                <MdiSettings />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </PopperAnchor>
      <PopperContent
        class="flex w-60 flex-row justify-center bg-zinc-400 dark:bg-zinc-900"
      >
        <Profile profile={me} divClass="w-full min-w-full flex-col flex">
          <div class="flex flex-col self-start" slot="additional">
            <Button
              id="why"
              class="flex flex-row items-center gap-2 self-start"
            >
              Your status
              <svelte:component
                this={statusOpen ? ChevronRight : ChevronDown}
              />
            </Button>
            <Popover
              bind:open={statusOpen}
              triggeredBy="#why"
              trigger="click"
              arrow={false}
              placement="right"
              offset={60}
              class="bg-normal translate-x-10"
              transition={slide}
              params={{ axis: 'x' }}
            >
              <Sidebar class="bg-normal">
                <SidebarWrapper class="bg-normal">
                  <SidebarGroup>
                    {#each [statuses.ONLINE, statuses.IDLE, statuses.DO_NOT_DISTURB, statuses.OFFLINE] as status}
                      {@const humanName = screamingSnakeToTitle(status)
                        .split(' ')
                        .map((val, idx) =>
                          idx === 0
                            ? `${val[0]}${val.slice(1).toLowerCase()}`
                            : val.toLowerCase()
                        )
                        .join(' ')}
                      <SidebarButton
                        on:click={() => setStatus.mutate({ status })}
                        label={humanName}
                      >
                        <Status slot="icon" {status} />
                      </SidebarButton>
                    {/each}
                  </SidebarGroup>
                </SidebarWrapper>
              </Sidebar>
            </Popover>
          </div>
        </Profile>
      </PopperContent>
    </Popper>
  {/await}
</div>
{/if}
