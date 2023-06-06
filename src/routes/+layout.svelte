<script lang="ts">
  import { onMount } from 'svelte'
  import '../App.scss'
  import { Theme } from '$houdini'
  import { theme as themeStore } from './(app)/(auth)/app/settings/appearance/+page.svelte'

  onMount(() => {
    const theme = localStorage.getItem('netheritechatthemevariant')
    switch (theme) {
      case Theme.DARK:
        $themeStore = Theme.DARK
        document.documentElement.classList.add('dark')
      case Theme.LIGHT:
        $themeStore = Theme.LIGHT
        document.documentElement.classList.remove('dark')
      default:
        $themeStore = Theme.DARK
        localStorage.setItem('netheritechatthemevariant', Theme.DARK)
    }
  })

  $: $themeStore === Theme.DARK
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark')
</script>

<div class="full-viewport">
  <slot />
</div>
