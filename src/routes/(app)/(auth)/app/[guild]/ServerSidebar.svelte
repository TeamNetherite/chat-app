<script lang="ts">
  import { GetChannelsStore } from '$houdini'

  export let serverId: string

  const getChannels_ = new GetChannelsStore()
  $: getChannels_.fetch({ variables: { guild: serverId } })

  
</script>
