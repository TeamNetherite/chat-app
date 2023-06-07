<script lang="ts" context="module">
  export const theme: Writable<ValueOf<typeof Themes>> = writable(Themes.DARK)
</script>

<script lang="ts">
  import { SetThemeStore, Theme as Themes, type ValueOf } from '$houdini'
  import { writable, type Writable } from 'svelte/store'
  import { onMount } from 'svelte'

  const setTheme_ = new SetThemeStore

  let dark = true

  onMount(() => dark = $theme === Themes.DARK)

  $: setTheme_.mutate({ theme: dark ? Themes.DARK : Themes.LIGHT })
  $: localStorage.setItem('netheritechatthemevariant', dark ? Themes.DARK : Themes.LIGHT)
  $: $theme = dark ? Themes.DARK : Themes.LIGHT
</script>

<div>
  <input id="toggle" type="checkbox" bind:checked={dark} />
</div>

<style lang="scss">
#toggle {
  --size: 2rem;
  
  appearance: none;
  outline: none;
  cursor: pointer;
  
  width: var(--size);
  height: var(--size);
  border-radius: 999px;
  
  transition: all 500ms;

  --ray-size: calc(var(--size) * -0.4);
    --offset-orthogonal: calc(var(--size) * 0.65);
    --offset-diagonal: calc(var(--size) * 0.45);

    transform: scale(0.75);
    color: hsl(40, 100%, 50%);
    box-shadow: 
      inset 0 0 0 var(--size),
      calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),
      var(--offset-orthogonal) 0 0 var(--ray-size),
      0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),
      0 var(--offset-orthogonal) 0 var(--ray-size),
      calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0 var(--ray-size),
      var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),
      calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size),
      var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size),
    ;
  
  &:checked {
    // dark
    color: hsl(240, 100%, 95%);
    box-shadow: inset calc(var(--size) * 0.33) calc(var(--size) * -0.25) 0;
  }
}
</style>
