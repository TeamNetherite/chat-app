<script lang="ts">
  import classNames from 'classnames';
  export let divClass: string = 'my-1 h-px bg-gray-100 dark:bg-gray-600';
</script>

<div {...$$restProps} class={classNames(divClass, $$props.class)} />

<!--
  @component
  ## Features
  [Go to Dropdown](https://flowbite-svelte.com/docs/components/dropdown)
  ## Props
  @prop  divClass: string = 'my-1 h-px bg-gray-100 dark:bg-gray-600';
-->
