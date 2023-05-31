<script lang="ts">
  import AppLayout from '../AppLayout.svelte'
  import DMs from '../Chats.svelte'
</script>

<AppLayout>
  <DMs slot="channels" />
  <svelte:fragment slot="content">
    <slot />
  </svelte:fragment>
</AppLayout>
