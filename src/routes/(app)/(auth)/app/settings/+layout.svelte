<script lang='ts'>
  import type { LayoutData } from './$types'
  import AppLayout from "../AppLayout.svelte"

  export let data: LayoutData
</script>

<AppLayout drawerOpen={data.drawerOpen}>
  <slot slot='content' />
</AppLayout>
