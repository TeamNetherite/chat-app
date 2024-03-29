<script lang="ts">
  import Sidebar from '$lib/nui/sidebars/Sidebar.svelte'
  import SidebarGroup from '$lib/nui/sidebars/SidebarGroup.svelte'
  import SidebarItem from '$lib/nui/sidebars/SidebarItem.svelte'
  import SidebarWrapper from '$lib/nui/sidebars/SidebarWrapper.svelte'
  import MdiFriends from '~icons/mdi/human-greeting-variant'

  import { ConversationsStore, GetSmallDMStore } from '$houdini'
  import { statusColor, unnull } from '$lib/typemagic'
  import MyselfView from './MyselfView.svelte'
  import { Avatar } from '$lib/nui'
  import moss from '$lib/../../assets/moss.png'
  import yay from '$lib/yayql'
  import { getContext } from 'svelte'

  const conversations_ = yay(new ConversationsStore()).then(async (val) => {
    const cvs = val.conversations!
    const ms = Object.fromEntries(
      (
        await Promise.all(
          cvs
            .map((cv) => cv.recipient.asUser!.id)
            .map(async (uid) => ({
              cat: await yay(new GetSmallDMStore(), { userId: uid })
                .then(
                  (gdm) =>
                    gdm.conversationDirect.messages.edges[0]?.node?.createdAt
                )
                .then((cat) => (cat ? Date.parse(cat) : 0)),
              uid,
            }))
        )
      ).map(({ cat, uid }) => [uid, cat])
    )
    cvs.sort((a, b) => ms[b.recipient.asUser!.id] - ms[a.recipient.asUser!.id])
    return cvs
  })

  const drawerClose = getContext<() => void>('drawerClose')
</script>

<div class="flex flex-col gap-1.5">
  <Sidebar
    asideClass="mt-5 bg-background-secondary bg-background-secondary w-80 rounded-t-xl h-full rounded-b-md"
  >
    <SidebarWrapper
      divClass="h-full flex flex-col bg-background-secondary bg-background-secondary p-2 rounded-t-xl rounded-b-md"
    >
      <!-- h -->
      <SidebarGroup>
        <SidebarItem label="Friends" href="/app/@me/friends">
          <MdiFriends slot="icon" />
        </SidebarItem>
      </SidebarGroup>
      <SidebarGroup class="overflow-y-auto">
        {#await conversations_ then conversations}
          {#each conversations as convo (unnull(convo.recipient.asUser).id)}
            {@const recipient = unnull(convo.recipient.asUser)}

            <SidebarItem
              label={recipient.displayName}
              href="/app/@me/{recipient.id}"
              on:click={() => drawerClose()}
            >
              <Avatar
                dot={{
                  placement: 'bottom-right',
                  color: statusColor(recipient.status),
                }}
                src={moss}
                slot="icon"
              />
            </SidebarItem>
          {/each}
        {/await}
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
  <MyselfView />
</div>
