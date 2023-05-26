<script lang="ts">
  import { refresh } from '$lib/auth'
  import Circle2 from 'svelte-loading-spinners/Circle2.svelte'
</script>

{#await refresh()}
<Circle2 />
{/await}
