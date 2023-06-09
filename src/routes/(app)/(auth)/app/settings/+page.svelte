<script>
  import { Each } from "$lib/nui-next/container"

  import { tabs } from './things'
</script>
<div>
  <Each list={tabs} let:item let:index>
    <ol id='settings-group-{index}'>
      {#each Object.entries(item) as [href, [ic, name]] (href)}
        <li>
          <a href='/app/settings/{href}'>
            <svelte:component this={ic} />
            {name}
          </a>
        </li>
      {/each}
    </ol>
  </Each>
</div>
