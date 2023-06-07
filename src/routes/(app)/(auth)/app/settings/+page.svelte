<script>
  import { Container, Each } from "$lib/nui-next/container"

  import { tabs } from './things'
</script>
<Container flex column divide-y divide-secondary gap-md>
  <Each list={tabs} let:item let:index>
    <Container id='settings-group-{index}' flex column ol>
      {#each Object.entries(item) as [href, [ic, name]] (href)}
        <Container li flex gap-lg class='pt-4'>
          <Container flex a href='/app/settings/{href}'>
            <svelte:component this={ic} />
            {name}
          </Container>
        </Container>
      {/each}
    </Container>
  </Each>
</Container>
