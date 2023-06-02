<script lang="ts">
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from "$lib/nui";

  import MdiAccountBox from '~icons/mdi/account-box'
  import MdiLogout from '~icons/mdi/logout'
</script>

<Sidebar class="my-5 ml-3 mr-2 h-full columns-1">
  <SidebarWrapper class="flex flex-col">
    <!-- Personal schenanigans -->
    <SidebarGroup>
      <SidebarItem label='Account'>
        <MdiAccountBox slot="icon" />
      </SidebarItem>
    </SidebarGroup>
    <div class="flex-grow h-auto" />
    <SidebarGroup class="mt-auto">
      <SidebarItem label='Logout'>
        <MdiLogout slot="icon" />
      </SidebarItem>
    </SidebarGroup>
  </SidebarWrapper>
</Sidebar>
