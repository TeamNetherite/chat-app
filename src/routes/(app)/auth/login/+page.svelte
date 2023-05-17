<script lang="ts">
  import Spinner from '$lib/Spinner.svelte'
import { login, type Tokens } from '$lib/auth'
  import { z, zz } from '$lib/zod'
  import AuthPage from '../AuthPage.svelte'

  const schema = z.object({ email: zz.email(), password: zz.password() })

  let promise: Promise<Tokens | null> | undefined

  function act(data: z.infer<typeof schema>) {
    promise = login(data)
  }
</script>

{#if promise === undefined}
  <Spinner />
  <AuthPage {schema} title="Login" buttonName="Log in" {act} />
{:else}
  {#await promise}
    <Spinner />
  {:then tokens}
    {tokens}
  {/await}
{/if}
