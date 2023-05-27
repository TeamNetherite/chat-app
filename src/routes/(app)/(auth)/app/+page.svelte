<script lang="ts">
  import { ConversationsStore } from '$houdini'
  import yay from '$lib/yayql'
  import App from './App.svelte'

  const conversations = yay(new ConversationsStore()).then((convos) =>
    convos.conversations.map((convo) => convo.recipient.asUser!)
  )
</script>

{#await conversations then convos}
  <App {convos} />
{/await}
