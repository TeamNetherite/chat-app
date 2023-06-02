<script lang="ts">
  '@hmr:keep-all'

  import { z, zz } from '$lib/zod'
  import chevronRight from '@iconify/icons-mdi/chevron-right'
  import chevronLeft from '@iconify/icons-mdi/chevron-left'
  import AuthPage from '../AuthPage.svelte'
  import Icon from '@iconify/svelte'
  import { NETHERITE_CHAT_SERVER_URL as SERVER_URL } from '$env/static/public'

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
          'The password that you want to log in with. Be sure to remember it because recovering your account without a password is <strong>tedious</strong>!'
        ),
      confirmPassword: zz
        .password()
        .describe('Type the password again so you are sure you remember it.'),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
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

  function actB(data: z.infer<typeof schemaDetails>) {
    if (!auth) return
    console.log('register', data)

    fetch(`${SERVER_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        email: auth.email,
        password: auth.password,
        tag: data.tag,
        display_name: data.displayName,
      })
    })
  }

  let au = true
</script>

<svelte:head>
  <title>netherite.chat - Register</title>
</svelte:head>

{#if au}
  <AuthPage
    schema={schemaAuth}
    buttonName="Register"
    title="Register"
    act={actA}
    let:doAct
  >
    <button
      class="mt-3 w-min justify-center self-end rounded-3xl border border-zinc-600 bg-green-800"
      on:click={() => doAct()}
    >
      <Icon icon={chevronRight} class="h-10 w-10" />
    </button>
  </AuthPage>
{:else}
  <AuthPage
    act={actB}
    schema={schemaDetails}
    buttonName="Register"
    title="Register"
    let:doAct
  >
    <div class="flex flex-row justify-between">
      <button
        on:click={() => (au = true)}
        class="mt-3 w-min rounded-3xl border border-zinc-600 bg-gray-800"
      >
        <Icon icon={chevronLeft} class="h-10 w-10" />
      </button>
      <button
        class="mt-3 w-min rounded-3xl border border-zinc-600 bg-gray-800"
        on:click={() => doAct()}
      >
        <Icon icon={chevronRight} class="h-10 w-10" />
      </button>
    </div>
  </AuthPage>
{/if}
