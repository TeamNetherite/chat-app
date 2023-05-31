<script lang="ts">
  import type { Conversations$result } from "$houdini"
  import type { ArrayOf } from "$lib/typemagic";

  export let channel: NonNullable<ArrayOf<Conversations$result['conversations']>['recipient']['asChannel']>
</script>
