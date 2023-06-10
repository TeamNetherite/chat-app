<script>
  import { Each } from '$lib/nui-next/container'
  import { logout } from '$lib/auth'
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '$lib/nui-next/card'

  import MdiLogout from '~icons/mdi/logout'

  import { tabs } from './things'
  import { goto } from '$app/navigation'
  import { Spinner } from '$lib/nui'
  import { isDrawer } from '$lib/state'

  const drawer = isDrawer()
</script>

{#if $drawer}
  <Card class="border-none bg-inherit">
    <CardHeader class="flex flex-col">
      <CardTitle>Settings</CardTitle>
      <CardDescription
        >Here you can manage your settings, like dark or light theme, your email
        address and more!</CardDescription
      >
    </CardHeader>
    <CardContent>
      <div class="flex flex-col gap-8">
        <Each list={tabs} let:item>
          <ol>
            {#each Object.entries(item) as [href, [ic, name]] (href)}
              <li>
                <a href="/app/settings/{href}">
                  <svelte:component this={ic} />
                  {name}
                </a>
              </li>
            {/each}
          </ol>
        </Each>
        <ol>
          <li>
            <a href="/" on:click={logout}>
              <MdiLogout />
              Log out
            </a>
          </li>
        </ol>
      </div>
    </CardContent>
  </Card>
{:else}
  {#await goto('/app/settings/appearance')}
    <Spinner />
  {/await}
{/if}

<style lang="scss">
  :global(ol) {
    @apply flex flex-col gap-4;

    a {
      @apply flex flex-1 items-center gap-2;
      text-decoration: none;

      > :global(svg) {
        @apply h-auto w-auto border p-2;
      }
    }
  }
</style>
