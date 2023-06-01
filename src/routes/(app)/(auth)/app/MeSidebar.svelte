<script lang="ts">
  import Sidebar from '$lib/nui/sidebars/Sidebar.svelte'
  import SidebarGroup from '$lib/nui/sidebars/SidebarGroup.svelte'
  import SidebarItem from '$lib/nui/sidebars/SidebarItem.svelte'
  import SidebarWrapper from '$lib/nui/sidebars/SidebarWrapper.svelte'
  import MdiFriends from '~icons/mdi/human-greeting-variant'

  import { ConversationsStore } from '$houdini'
  import { unnull } from '$lib/typemagic'
  import Status from '$lib/Status.svelte'
  import MyselfView from './MyselfView.svelte'

  const conversations_ = new ConversationsStore()
</script>

<Sidebar asideClass='mt-5 mb-5 bg-light-secondary dark:bg-dark-secondary w-80'>
  <SidebarWrapper divClass='h-full flex flex-col dark:bg-dark-secondary bg-light-secondary p-2'>
    <!-- h -->
    <SidebarGroup>
      <SidebarItem label="Friends" href="/app/@me/friends">
        <MdiFriends slot="icon" />
      </SidebarItem>
    </SidebarGroup>
    <SidebarGroup>
      {#await conversations_.fetch() then _convos}
        {@const conversations = unnull(_convos.data).conversations}
        {#each conversations as convo (unnull(convo.recipient.asUser).id)}
          {@const recipient = unnull(convo.recipient.asUser)}

          <SidebarItem
            label={recipient.displayName}
            href="/app/@me/{recipient.id}"
          >
            <Status status={recipient.status} slot="icon" />
          </SidebarItem>
        {/each}
      {/await}
    </SidebarGroup>
    <MyselfView />
  </SidebarWrapper>
</Sidebar>
