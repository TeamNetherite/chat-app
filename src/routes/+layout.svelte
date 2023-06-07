<script lang="ts">
  import { onDestroy, onMount, setContext } from 'svelte'
  import '../App.scss'
  import { Theme } from '$houdini'
  import { theme as themeStore } from './(app)/(auth)/app/settings/(sections)/appearance/+page.svelte'

  onMount(() => {
    const theme = localStorage.getItem('netheritechatthemevariant')
    switch (theme) {
      case Theme.DARK:
        $themeStore = Theme.DARK
      case Theme.LIGHT:
        $themeStore = Theme.LIGHT
      default:
        $themeStore = Theme.DARK
        localStorage.setItem('netheritechatthemevariant', Theme.DARK)
    }
  })
</script>

<div class="full-viewport" class:dark={$themeStore === Theme.DARK}>
  <slot />
</div>
