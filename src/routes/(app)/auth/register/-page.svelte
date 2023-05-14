<script lang="ts">
  import { fade } from 'svelte/transition'
  import { emailSchema, passwordSchema } from '$lib/auth'
  import { z } from 'zod'

  const fields = z.object({
    email: emailSchema,
    password: passwordSchema
  })

  let email = ''
  let password = ''

  let isErrored = false

  let able = false,
    emailGoog = false,
    passwordGoog = false

  $: emailGoog = emailSchema.safeParse(email).success
  $: passwordGoog = passwordSchema.safeParse(password).success

  $: able = emailGoog && passwordGoog

  function login() {
    if (able) {
      window.location.href = '/app/redirect'
    } else {
      isErrored = true
    }
  }
</script>

<div
  class="g-prose flex h-full w-full flex-auto flex-row items-center justify-center"
  id="login-root"
>
  <div class="flex w-max flex-col justify-end self-center" id="login-wrapper">
    <h1 class="text-center">NETHERITE.CHAT - Register</h1>
    {#if isErrored}
      <h3
        transition:fade={{ duration: 12000 }}
        class="text-center text-red-950"
      >
        the specified email or password is empty.
      </h3>
    {/if}
    <form
      on:submit|preventDefault={login}
      class="flex w-max flex-col justify-center gap-8 self-center p-8"
    >
      <label id="email" class:login-err={!emailGoog}>
        Email
        <input bind:value={email} />
      </label>
      <label id="password" class:login-err={!passwordGoog}>
        Password
        <input bind:value={password} />
      </label>
      <button
        disabled={!able}
        class="w-max cursor-pointer self-center rounded-md bg-blue-celestial p-2 px-8 text-black disabled:cursor-not-allowed disabled:bg-neutral-800 dark:text-white"
        >Register</button
      >
    </form>
    <div
      class="flex flex-auto flex-row items-center justify-center"
      id="login"
    >
      <span class="text-sans pr-3">Already have an account?</span>
      <a
        href="/auth/login"
        class="w-max self-center rounded-md p-2 px-8 text-black no-underline dark:text-white"
      >
        Login
      </a>
    </div>
  </div>
</div>

<style lang="scss">
  #login-root #login-wrapper {
    form {
      label {
        @apply mr-3 flex flex-col items-start justify-between pb-2 text-2xl;
        input {
          @apply flex rounded-sm p-2 px-3 text-black;
        }
      }
    }

    #login {
      transition: all 0.5s ease-out;
      opacity: 0.5;
      color: theme("colors.gray.400");
      &:hover {
        opacity: 1;
        color: theme('colors.white');
      }
      &:hover > a {
        background-color: theme('colors.blue.celestial');
      }
      & > a {
        background-color: theme('colors.blue.700');
        text-decoration: none;
      }
    }
  }

  .login-err {
    border-bottom: 2px solid theme('colors.red.bittersweet');
  }
</style>
