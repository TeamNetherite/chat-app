<script>
  import { AddFriendStore, FriendsStore } from '$houdini'
  import StatusAvatar from '$lib/StatusAvatar.svelte'
  import {
    ListPlaceholder,
    List,
    Li,
    Tabs,
    TabItem,
    Input,
    ButtonGroup,
    GradientButton,
    Alert,
    Avatar,
  } from '$lib/nui'
  import { statusColor, unnull } from '$lib/typemagic'
  import MeLayout from '../MeLayout.svelte'
  import moss from '$lib/../../assets/moss.png'
  import Label from '$lib/nui/forms/Label.svelte'
  import MdiHash from '~icons/mdi/pound'

  const friends_ = new FriendsStore()

  const addFriend_ = new AddFriendStore()

  let friend = ''
</script>

<MeLayout>
  <div class="mt-5 w-full">
    <Tabs>
      <TabItem open title="Friends">
        {#await friends_.fetch()}
          <ListPlaceholder divClass="min-w-full" />
        {:then friends__}
          {@const friends = unnull(friends__.data).me.friends}
          <List id="friends-list" list="none" tag="ol">
            {#each friends as friend (friend.id)}
              <Li class="friend-li">
                <a
                  class="flex items-center space-x-4"
                  href="/app/@me/{friend.id}"
                >
                  <div class="flex-shrink-0">
                    <Avatar
                      src={moss}
                      dot={{
                        placement: 'bottom-right',
                        color: statusColor(friend.status),
                      }}
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p
                      class="text-md truncate font-medium text-gray-900 dark:text-white"
                    >
                      {friend.displayName}
                    </p>
                    <p
                      class="text-md truncate text-gray-500 dark:text-gray-400"
                    >
                      {friend.tag}
                    </p>
                  </div>
                </a>
              </Li>
            {/each}
          </List>
        {/await}
      </TabItem>
      <TabItem title="Add friend">
        <form
          class="flex flex-col gap-2"
          on:submit|preventDefault={() => addFriend_.mutate({ friend: friend })}
        >
          {#if $addFriend_.data}
            <Alert color="green"
              ><span class="font-medium"
                >Success! Added {friend} as a friend!</span
              ></Alert
            >
          {/if}
          <Label>
            <span>Friend tag</span>
            <Input placeholder="nothendev#c001" bind:value={friend}>
              <MdiHash slot="left" />
            </Input>
          </Label>
          <button>add</button>
        </form>
      </TabItem>
    </Tabs>
  </div>
</MeLayout>

<style lang="scss">
  #friends-list {
    .friend-li {
      &:not(:first-child):not(:last-child) {
        @apply py-3 sm:py-4;
      }

      &:first-child {
        @apply pb-3 sm:pb-4;
      }

      &:last-child {
        @apply pt-3 sm:pt-4;
      }
    }
  }
</style>
