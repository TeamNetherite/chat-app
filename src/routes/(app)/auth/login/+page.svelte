<script lang="ts">
  import Circle2 from 'svelte-loading-spinners/Circle2.svelte'
  import { login, type Tokens } from '$lib/auth'
  import { z, zz } from '$lib/zod'
  import AuthPage from '../AuthPage.svelte'
  import { goto } from '$app/navigation'

  const schema = z.object({ email: zz.email(), password: zz.password() })

  let promise: Promise<Tokens | null> | undefined

  function act(data: z.infer<typeof schema>) {
    promise = login(data).then(async (tokens) => { await goto('/app'); return tokens; })
  }
</script>

{#if promise === undefined}
  <AuthPage {schema} title="Login" buttonName="Log in" {act} />
{:else}
  {#await promise}
    <Circle2 />
  {/await}
{/if}
