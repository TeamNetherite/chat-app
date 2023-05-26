<script lang="ts" context="module">
  import BadgeAdmin from '~icons/netherite-badges/admin'
  import BadgeModerator from '~icons/netherite-badges/moderator'

  export const badges: Record<keyof typeof Badge, typeof BadgeAdmin> = {
    ADMIN: BadgeAdmin,
    MODERATOR: BadgeModerator
  }
</script>
<script lang="ts">
  import type { Badge, UserProfile } from '$houdini' 

  export let profile: NonNullable<UserProfile["shape"]>
</script>

<div class="flex flex-col gap-1 dark:bg-zinc-900 bg-zinc-500 w-max rounded-md p-4 outline outline-gray-800 m-2">
  <div class="self-end flex flex-row">
    {#each profile.badges ?? [] as badge (badge)}
      <div class="flex">
        <svelte:component this={badges[badge]} />
      </div>
    {/each}
  </div>
  <h1 class="text-3xl">{profile.displayName}</h1>
  <h3 class="text-lg">{profile.tag}</h3>
</div>
