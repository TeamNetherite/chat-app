<script>
  import { ApolloClient, InMemoryCache } from '@apollo/client/core'
  import { setClient } from 'svelte-apollo'
  import { NETHERITE_CHAT_SERVER_URL as SERVER_URL } from '$env/static/public'
  const client = new ApolloClient({
    uri: `${SERVER_URL}/graphql`,
    cache: new InMemoryCache({}),
    headers: {
      Authorization: `Bearer ${localStorage.getItem('netheritechataccesstoken')}`
    }
  })
  setClient(client)
</script>

<slot />
