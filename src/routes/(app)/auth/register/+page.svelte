<script lang="ts">
  import { z, zz } from '$lib/zod'
  import ChevronRight from '~icons/mdi/chevron-right'
  import ChevronLeft from '~icons/mdi/chevron-left'
  import AuthPage from '../AuthPage.svelte'

  const schemaAuth = z
    .object({
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
    .refine(({ password, confirmPassword }) => password !== confirmPassword, {
      message: "Passwords don't match.",
      path: ['confirmPassword'],
    })

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

  let auth: z.infer<typeof schemaAuth> | undefined

  function actA(data: z.infer<typeof schemaAuth>) {
    auth = data
    console.log('auth', data)
    au = false
  }

  function actB(data: z.infer<typeof schemaDetails>) {}

  let au = true
</script>

{#if au}
  <AuthPage
    schema={schemaAuth}
    buttonName="Register"
    title="Register"
    act={actA}
  >
    <button
      let:doAct
      class="mt-3 w-min justify-center self-end rounded-3xl border border-zinc-600 bg-green-800"
      on:click={() => doAct()}
    >
      <ChevronRight class="w-10 h-10" />
    </button>
  </AuthPage>
{:else}
  <AuthPage
    act={actB}
    schema={schemaDetails}
    buttonName="Register"
    title="Register"
  >
    <div
      let:doAct
      class="flex flex-auto flex-row"
    >
      <button
        on:click={() => (au = true)}
        class="mt-3 w-min justify-end rounded-3xl border border-zinc-600 bg-gray-800"
      >
        <ChevronLeft class="w-10 h-10" />
      </button>
      <button
        class="mt-3 w-min justify-end rounded-3xl border border-zinc-600 bg-gray-800"
        on:click={() => doAct()}
      >
        <ChevronRight class="w-10 h-10" />
      </button>
    </div></AuthPage
  >
{/if}
