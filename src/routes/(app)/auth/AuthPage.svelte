<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import Eye from '~icons/mdi/eye'
  import EyeOff from '~icons/mdi/eye-off'
  import { type z, camelToTitle } from '$lib/zod'

  type T = $$Generic<{}>
  type Sh = $$Generic<z.ZodRawShape>

  export let schema: z.ZodObject<Sh> & z.Schema<T>
  export let schemaRefine: z.Schema<T> = schema

  let keys = schema.keyof()

  export let data: Partial<T> = {}

  export let act: (data: z.infer<typeof schemaRefine>) => void
  export let title: string
  export let buttonName: string

  let showPwd: Partial<Record<string, boolean>> = Object.fromEntries(
    (keys.options as string[]).map((val) => [
      val,
      val.includes('password') || val.includes('Password') ? false : undefined,
    ])
  )

  let pass = false

  $: pass = schemaRefine.safeParse(data).success

  let err: Partial<Record<string, string | null>> = Object.fromEntries(
    (keys.options as string[]).map((val) => [val, null])
  )

  function chan(val: string, name: string, ty: z.Schema) {
    err[name] = undefined
    const parsed = ty.safeParse(val)
    parsed.success ? (data[name as keyof T] = parsed.data) : (err[name] = null)
  }
  let isErrored = false

  function doAct() {
    const parsed = schemaRefine.safeParse(data)
    if (parsed.success) act(schemaRefine.parse(data))
    else {
      isErrored = true
      parsed.error.issues
        .filter((issue) => issue.message !== 'Required')
        .forEach((issue) => (err[issue.path[0]! as string] = issue.message))
    }
  }
</script>

<div
  class="g-prose flex h-full w-full flex-auto flex-row items-center justify-center"
  id="login-root"
>
  <div class="flex h-max w-max flex-col" id="login-wrapper">
    <h1 class="text-center">NETHERITE.CHAT - {title}</h1>
    {#if isErrored}
      <h3
        in:fade={{ duration: 12000 }}
        out:fly={{ x: 100 }}
        class="text-center text-red-950"
      >
        One of the fields is either empty or invalid.
      </h3>
    {/if}
    <form
      on:submit|preventDefault={doAct}
      class="flex w-max flex-col justify-center gap-8 self-center p-8"
    >
      {#each Object.entries(schema.shape) as [name, ty] (name)}
        <label>
          <div class="flex flex-auto flex-col">
            {camelToTitle(name)}
            {#if ty.description}
              <div class="text-sm mb-1">{@html ty.description}</div>
            {/if}
          </div>
          <!-- @ts-ignore -->
          <div class="flex flex-auto flex-row gap-2">
            <input
              on:change={(real) => chan(real.currentTarget.value, name, ty)}
              type={showPwd[name] !== undefined && !showPwd[name]
                ? 'password'
                : 'text'}
              class:login-err={err[name] !== undefined}
            />
            {#if name.includes('password') || name.includes('Password')}
              <button
                on:click={() => (showPwd[name] = !showPwd[name])}
                class="h-min w-min justify-end"
              >
                {#if showPwd[name] === true}
                  <EyeOff class="block h-max w-max text-blue-celestial" />
                {:else}
                  <Eye class="block h-max w-max text-blue-celestial" />
                {/if}
              </button>
            {/if}
          </div>

          {#if err[name] && err[name] !== null}
            <br />
            <div>{err[name]}</div>
          {/if}
        </label>
      {/each}
      <button
        disabled={!pass}
        class="w-max cursor-pointer self-center rounded-md bg-blue-celestial p-2 px-8 text-black disabled:cursor-not-allowed disabled:bg-neutral-800 dark:text-white"
        >{buttonName}</button
      >
    </form>
  </div>
</div>

<style lang="scss">
  #login-root #login-wrapper {
    form {
      label {
        @apply mr-3 flex w-min flex-col items-start justify-between text-2xl;
        input {
          @apply flex rounded-sm p-2 px-3 text-black;
        }
      }
    }
  }

  .login-err {
    border: 3px solid theme('colors.red.bittersweet');
  }
</style>
