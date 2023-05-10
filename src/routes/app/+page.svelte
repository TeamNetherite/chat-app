<script>
  import { ApolloClient, InMemoryCache } from '@apollo/client/core'
  import { setClient } from 'svelte-apollo'
  const client = new ApolloClient({
    uri: 'localhost:8188/graphql',
    cache: new InMemoryCache({}),
  })
  setClient(client)
</script>

