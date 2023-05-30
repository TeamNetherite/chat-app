<script lang="ts">
  import moss from '../../../../../assets/moss.png'
  import Divider from '$lib/nui/Divider.svelte'
  import type { SelectionThing } from '$lib/graphql'
  import ShitDisplay from './ShitDisplay.svelte'

  export let selection: SelectionThing = { type: 'dm' }
</script>

<div class="scrollbar-rmrf flex flex-row flex-1 gap-1 h-full min-h-full max-h-screen">
  <ul class="server-list">
    <li style:background-image="url({moss})" style:background-size="cover" data-selected={selection.type === 'dm'}>
      <div class="plink" aria-selected={selection.type === 'dm'} />
      <button on:click={() => selection = { type: 'dm' }} />
    </li>
    <Divider class="bg-stone-700 mx-1" />
  </ul>

  <ShitDisplay sel={selection} />
</div>

<style lang="scss">
  .server-list {
    @apply flex flex-col mt-5 w-[5%];
    > li {
      > .plink:only-of-type {
        position: absolute;
        
        &:not([aria-selected="true"]) {
          display: none;
        }

        &[aria-selected="true"] {
          display: block;
          transition: left 0.3s ease-in-out;
          left: 10px;
        }
      }
      @apply w-12 h-12 flex flex-row justify-center items-center self-center content-center data-[selected]:rounded-[25%] hover:rounded-[25%];
      > button {
        @apply w-full h-full inline-flex bg-repeat-space;
      }
    }
  }
</style>
