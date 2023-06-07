<script lang="ts">
  type Item = $$Generic<{}>

  export let list: Item[]
</script>

{#each list as item, index}
  <slot item={item} index={index} />
{/each}
