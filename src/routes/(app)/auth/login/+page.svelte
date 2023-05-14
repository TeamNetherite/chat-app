<script lang="ts">
  import { z, zz } from '$lib/zod'
  import AuthPage from '../AuthPage.svelte'

  const schema = z.object({ email: zz.email(), password: zz.password() })

  function act(data: z.infer<typeof schema>) {}
</script>

<AuthPage {schema} title="Login" buttonName="Log in" {act} />
