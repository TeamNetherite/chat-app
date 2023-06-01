<script lang="ts">
  import AppLayout from '../AppLayout.svelte'
  import MeSidebar from '../MeSidebar.svelte'
</script>

<AppLayout>
  <MeSidebar slot="channels" />
  <svelte:fragment slot="content">
    <slot />
  </svelte:fragment>
</AppLayout>
