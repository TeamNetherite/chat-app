<script lang="ts">
  import { MeStore, SendMessageStore } from '$houdini'
  import Profile from '$lib/Profile.svelte'
  import yay from '$lib/yayql'
  import Circle2 from 'svelte-loading-spinners/Circle2.svelte'

  const me_ = yay(new MeStore()).then(me => me.me)
  const sendMessage = new SendMessageStore()

  let message = ''
  let recipient = ''
</script>

{#await me_}
  <Circle2 />
{:then me}
  <Profile profile={me} />
{/await}

<input bind:value={message} class="dark:text-black" />
<input bind:value={recipient} class="dark:text-black" />
<button on:click={() => {
  sendMessage.mutate({
    init: {
      recipient,
      content: message
    }
  })
}}>send message</button>
