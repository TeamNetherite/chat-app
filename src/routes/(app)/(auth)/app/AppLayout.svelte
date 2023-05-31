<script lang="ts">
  import { goto } from '$app/navigation'
  import moss from '../../../../../assets/moss.png'
  import Divider from '$lib/nui/Divider.svelte'
  import type { Page } from '@sveltejs/kit'
  import { page } from '$app/stores'

  type Selection =
    | {
        type: 'dm'
        current: string | null
      }
    | {
        type: 'guild'
        guild: string
        channel: string | null
      }

  function getSelection(pageStore: Page): Selection {
    const url = pageStore.url

    if (!url.pathname.startsWith('/app/@me')) {
      const [guild, channel] = url.pathname.split('/')

      return {
        type: 'guild',
        guild,
        channel: channel ? channel : null,
      }
    }

    return {
      type: 'dm',
      current: url.pathname.startsWith('/app/@me')
        ? url.pathname.split('/').at(-1) ?? null
        : null,
    }
  }

  const selection: Selection = getSelection($page)
</script>

<div class="scrollbar-rmrf full-viewport flex flex-row gap-5 w-full">
  <ul class="server-list">
    <li
      style:background-image="url({moss})"
      style:background-size="cover"
      data-selected={selection.type === 'dm'}
    >
      <button
        on:click={() => goto('/app/@me')}
        disabled={selection.type === 'dm'}
      />
    </li>
    <Divider class="mx-1 bg-stone-700" />
  </ul>
  <slot name="channels">
    <div class="self-center">Uhm...</div></slot
  >
  <slot name="content">GG</slot>
</div>

<style lang="scss">
  ul > li {
    @apply h-8 w-full;
    &[data-selected='true']::before {
      content: '';
      display: block;
      position: absolute;
      background-color: white;

      animation: blob-active 1s ease-in;
    }

    &:hover::before {
      animation: blob-hover 1s ease-in;
    }
  }

  @keyframes blob-active {
    0% {
    }
  }

  @keyframes blob-hover {
    0% {
    }
  }
</style>
