<script lang="ts">
  import { MeStore, SetStatusStore, Status as statuses } from '$houdini'
  import StatusAvatar from '$lib/StatusAvatar.svelte'
  import {
    SidebarButton,
    SidebarGroup,
    SidebarWrapper,
    Popover,
    Button,
    Sidebar,
    ChevronRight, ChevronDown
  } from '$lib/nui'
  import { unnull, screamingSnakeToTitle } from '$lib/typemagic'
  import moss from '$lib/../../assets/moss.png'
  import { slide } from 'svelte/transition'
  import Profile from '$lib/Profile.svelte'
  import Status from '$lib/Status.svelte'
  const me_ = new MeStore()
  const setStatus = new SetStatusStore()
  let statusOpen = false
</script>

<SidebarGroup class="mt-auto">
  {#await me_.fetch() then me__}
    {@const me = unnull(me__.data).me}
    <SidebarButton class="w-full" id="myself-view">
      <svelte:fragment slot="icon">
        <StatusAvatar
          divProps={{ id: 'myself-avatar' }}
          class="h-8 w-8"
          statusProps={{
            style: 'transform: translate(50%, -90%); position: absolute;',
          }}
          status={me.status}
          avatar={moss}
        />
      </svelte:fragment>
      <div class="min-w-0 flex-1" slot="subtext">
        <p class="text-md truncate font-medium text-gray-900 dark:text-white">
          {me.displayName}
        </p>
        <p class="text-md truncate text-gray-500 dark:text-gray-400">
          {me.tag}
        </p>
      </div>
    </SidebarButton>
    <Popover
      triggeredBy="#myself-view"
      trigger="click"
      placement="top"
      arrow={false}
      transition={slide}
      offset={10}
      class="w-60 justify-center flex flex-row dark:bg-zinc-900 bg-zinc-400"
    >
      <Profile profile={me} divClass="w-full min-w-full">
        <svelte:fragment slot="additional">
          <Button id="why">Your status <svelte:component this={statusOpen ? ChevronRight : ChevronDown} /></Button>
          <Popover
            bind:open={statusOpen}
            triggeredBy="#why"
            trigger="click"
            arrow={false}
            placement="right"
            offset={60}
            class="translate-x-10 bg-normal"
            transition={slide}
            params={{axis: 'x'}}
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
                    <SidebarButton on:click={() => setStatus.mutate({ status })} label={humanName}>
                      <Status slot="icon" {status} />
                    </SidebarButton>
                  {/each}
                </SidebarGroup>
              </SidebarWrapper>
            </Sidebar>
          </Popover>
        </svelte:fragment>
      </Profile>
    </Popover>
  {/await}
</SidebarGroup>
