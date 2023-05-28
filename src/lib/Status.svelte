<script lang="ts">
  import type { Status, ValueOf } from "$houdini"

  export let status: ValueOf<typeof Status>

  const cls = $$props.class ? ` ${$$props.class}` : ''
  const props = {
    ...$$props,
    class: `w-3 h-3 rounded-[50%] inline-block status-${status.toLowerCase()}${cls}`
  }
</script>

<span {...props} />
