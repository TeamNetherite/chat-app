/** @type {import('houdini').ConfigFile} */
const config = {
  watchSchema: {
    url: "http://localhost:8188/graphql",
  },
  plugins: {
    "houdini-svelte": {},
  },
  types: {
    Conversation: {
      keys: ['id']
    }
  }
};

export default config;
