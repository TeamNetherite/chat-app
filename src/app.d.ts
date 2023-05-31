/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />
/// <reference types="houdini-svelte" />

declare namespace App {
  interface Session {
    accessToken: string
  }
  // interface Locals {}
  // interface PageData {}
  interface Error {
    message: string
    graphql?: "graphql"
  }
  // interface Platform {}
}
