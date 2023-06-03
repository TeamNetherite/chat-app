<script lang="ts">
  import ChannelView from "../../ChannelView.svelte"
  import type { PageData } from "./$types"
  import { unnull } from '$lib/typemagic'

  export let data: PageData

  let GetChannels: (typeof data)['GetChannels']
  let channel: string

  $: GetChannels = data.GetChannels
  $: channel = data.channelId!
</script>

{#if $GetChannels.data?.byId.guild}
  <ChannelView channel={unnull($GetChannels.data.byId.guild.channels.find(val => val.identifier === channel))}></ChannelView>
{/if}
