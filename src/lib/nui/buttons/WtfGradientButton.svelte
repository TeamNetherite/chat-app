<script lang="ts">
  const colors = {
    green: {
      gradient: ['green-400', 'green-500', 'green-600'],
      border: 'green-300',
    },
  }

  function themify(color: string): string {
    return `theme(colors.${color.replace('-', '.')})`
  }

  export let color: keyof typeof colors = 'green'
</script>

<button
  on:click
  class="wut px-5 py-2.5 text-sm [--border-color:{themify(colors[color].border)}]"
>
  <slot />
</button>

<style lang="scss">
  .wut {
    position: relative;
    border: var(--border-color) 0.5vmin;

    &::before {
      content: '';

      height: 100%;
      width: 100%;

      position: absolute;
      left: 0px;
      top: 0px;

      background: linear-gradient(
        130deg,
        transparent 0% 33%,
        var(--gradient-1) 66%,
        var(--gradient-2) 83.5%,
        var(--gradient-3) 100%
      );
      background-position: 0% 0%;
      background-size: 300% 300%;
    }

    &:hover::before {
      background-position: 100% 100%;
      transition: background-position 0.35s ease;
    }
  }
</style>
