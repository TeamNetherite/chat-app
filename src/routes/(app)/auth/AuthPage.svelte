<script lang="ts">
  import { fly } from 'svelte/transition'
  import Eye from '~icons/mdi/eye'
  import EyeOff from '~icons/mdi/eye-off'
  import {
    type z,
    type MaybeWrappedObject,
    camelToTitle,
    shape as shapeOf,
  } from '$lib/zod'

  type T = $$Generic<{}>
  type TShape = $$Generic<z.ZodRawShape>

  export let schema: MaybeWrappedObject<TShape>

  let shape = shapeOf(schema)

  let keys = Object.keys(shape)

  export let data: Partial<T> = {}

  export let act: (data: z.infer<typeof schema> & any) => void
  export let title: string
  export let buttonName: string = 'Submit'

  let showPwd: Partial<Record<string, boolean>> = Object.fromEntries(
    keys.map((val) => [
      val,
      val.includes('password') || val.includes('Password') ? false : undefined,
    ])
  )

  let pass = false

  $: pass = schema.safeParse(data).success

  let err: Partial<Record<string, string | null>> = Object.fromEntries(
    keys.map((val) => [val, null])
  )

  function chan(val: string, name: string, ty: z.Schema) {
    err[name] = undefined
    const parsed = ty.safeParse(val)
    if (parsed.success) {
      data[name as keyof T] = parsed.data
      data = data
    } else err[name] = null
  }
  let isErrored = false

  const doAct = () => {
    isErrored = false
    const parsed = schema.safeParse(data)
    if (parsed.success) act(schema.parse(data! as T))
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
        in:fly={{ x: 100, duration: 2000 }}
        out:fly={{ x: 100 }}
        class="text-center text-red-950"
      >
        One of the fields is either empty or invalid.
      </h3>
    {/if}
    <div class="flex w-max flex-col justify-center gap-8 self-center p-8">
      {#each Object.entries(shape) as [name, ty] (name)}
        <label class="mr-3 flex w-min flex-col items-start justify-between text-2xl">
          <div class="flex flex-auto flex-col">
            {camelToTitle(name)}
            {#if ty.description}
              <div class="mb-1 text-sm">{@html ty.description}</div>
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
              class="text-black flex rounded-sm p-2 px-3"
              aria-invalid={err[name] !== undefined}
            />
            {#if name.includes('password') || name.includes('Password')}
              <button
                on:click={() => (showPwd[name] = !showPwd[name])}
                class="eye"
              >
                {#if showPwd[name] === true}
                  <EyeOff />
                {:else}
                  <Eye />
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
      <slot {doAct}>
        <button
          class="w-max cursor-pointer self-center rounded-md bg-green-800 p-2 px-8 text-black dark:text-white"
          on:click={doAct}
        >
          {buttonName}
        </button>
      </slot>
    </div>
  </div>
</div>

<style>
  .login-err {
    border: 3px solid theme('colors.red.bittersweet');
  }

  .eye {
    width: 64px;
    height: 64px;
    position: relative;
    right: 15%;
    color: theme('colors.indigo.500');
  }
</style>
