<script lang="ts">
  import { MeStore } from '$houdini'
  import Profile from '$lib/Profile.svelte'
  import yay from '$lib/yayql'
  import Circle2 from 'svelte-loading-spinners/Circle2.svelte'

  const me_ = yay(new MeStore()).then(me => me.me)
</script>

{#await me_}
  <Circle2 />
{:then me}
  <Profile profile={me} />
{/await}
