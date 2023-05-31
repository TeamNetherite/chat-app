<script lang="ts">
  import Chat from "../Chat.svelte"
  import MeLayout from "./MeLayout.svelte"
</script>

<MeLayout let:currentConvo>
  <Chat recipient={currentConvo.recipient} />
</MeLayout>
