<script lang="ts">
  import { slide } from "svelte/transition"
  import AppLayout from "../AppLayout.svelte"
  import type { LayoutData } from "./$types"
  import ServerSidebar from "./ServerSidebar.svelte"

  export let data: LayoutData
</script>
<AppLayout>
  <ServerSidebar serverId={data.serverId} slot="channels" GetChannels={data.GetChannels} />
  <div transition:slide={{ axis: 'y' }} class="h-full w-full" slot="content">
    <slot />
  </div>
</AppLayout>
