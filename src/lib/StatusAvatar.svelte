<script lang="ts">
  import type { HTMLAttributes, HTMLImgAttributes } from "svelte/elements"
  import { Avatar } from "./nui"
  import Status from "./Status.svelte"
  import type { ValueOf, Status as Statuses } from "$houdini"

  export let avatar: NonNullable<HTMLImgAttributes['src']>
  export let status: ValueOf<typeof Statuses>
  export let divProps: HTMLAttributes<HTMLDivElement> = {}
  export let statusProps: HTMLAttributes<HTMLDivElement> = {}
</script>
<div {...divProps}>
  <Avatar src={avatar} {...$$restProps} />
  <Status {status} style="position: absolute; transform: translate(170%, -90%)" {...statusProps} />
</div>
