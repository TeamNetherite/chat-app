<script lang="ts">
  export let size = '20';
  export let color = 'currentColor';
  export let variation: 'solid' | 'outline' = 'outline';
  export let ariaLabel = 'chevron left';

  let viewBox: string;
  let svgpath: string;
  let svgoutline = `<path clip-rule="evenodd" fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" stroke="${color}"></path>`;
  let svgsolid = `<path clip-rule="evenodd" fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" fill="${color}"></path>`;
  $: switch (variation) {
    case 'outline':
      svgpath = svgoutline;
      viewBox = '0 0 20 20';
      break;
    case 'solid':
      svgpath = svgsolid;
      viewBox = '0 0 20 20';
      break;
    default:
      svgpath = svgoutline;
      viewBox = '0 0 20 20';
  }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  class={$$props.class}
  {...$$restProps}
  aria-label={ariaLabel}
  fill="none"
  {viewBox}
  stroke-width="2"
  on:click>
  {@html svgpath}
</svg>

<!--
  @component
  ## Props
  @prop size = '20';
  @prop color = 'currentColor';
  @prop variation: 'solid' | 'outline' = 'outline';
  @prop ariaLabel = 'chevron left';
  ## Event
  - on:click
-->
