<script lang="ts">
  import type { Conversations$result } from "$houdini"
  import type { ArrayOf } from "$lib/typemagic";
  import ChannelView from "./ChannelView.svelte"
  import DmView from "./DMView.svelte"

  export let recipient: ArrayOf<Conversations$result['conversations']>['recipient']
</script>

{#if recipient.kind === 'USER' && recipient.asUser}
  <DmView recipient={recipient.asUser} />
{:else if recipient.kind === 'CHANNEL' && recipient.asChannel}
  <ChannelView channel={recipient.asChannel} />
{/if}
