<script lang="ts">
  let email: string;
  let password: string;

  function login() {}
</script>
<div class="g-prose full-viewport" id="login-root">
  <h1>NETHERITE.CHAT - Login</h1>
  <form on:submit|preventDefault={login}>
    <label>
      Email
      <input bind:value={email} />
    </label>
    <label>
      Password
      <input bind:value={password} />
    </label>
  </form>
</div>
<style lang="scss">
#login-root {
  form {
    @apply flex flex-col gap-8;
    width: max-content;
    label {
      @apply flex justify-between mr-3 items-center font-mono;
      input {
        @apply rounded-sm p-2 px-3 flex ml-7;
      }
    }
  }
}
</style>
