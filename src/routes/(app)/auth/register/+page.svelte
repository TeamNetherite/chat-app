<script lang="ts">
  import { z, zz } from '$lib/zod'
  import AuthPage from '../AuthPage.svelte'

  const schemaInitial = z.object({
    email: zz
      .email()
      .describe(
        'The email address you want your account to have. You can change your email later.'
      ),
    password: zz
      .password()
      .describe(
        'The password that you want to log in with. Be sure to remember it because recovering your account not knowing a password is <strong>tedious</strong>!'
      ),
    confirmPassword: zz
      .password()
      .describe('Type the password again so you are sure you remember it.'),
  })

  const schemaRefineInitial = schemaInitial.refine(
    ({ password, confirmPassword }) => password !== confirmPassword,
    {
      message: "Passwords don't match.",
      path: ['confirmPassword'],
    }
  )

  const schemaDetails = z.object({
    displayName: z
      .string()
      .describe(
        'The display name that you want your profile to have. You can always change it later.'
      ),
    tag: z
      .string()
      .describe(
        'The tag that you want your profile to have. You can always change the tag later.'
      ),
  })

  function actA(data: z.infer<typeof schemaRefineInitial>) {
    console.log(data)
  }

  let au = true
</script>

{#if au}
  <AuthPage
    schema={schemaInitial}
    schemaRefine={schemaRefineInitial}
    buttonName="Register"
    title="Register"
    act={actA}
  />
{:else}
  <AuthPage
    act={actB}
    schema={schemaDetails}
    buttonName="Register"
    title="Register"
  />
{/if}
