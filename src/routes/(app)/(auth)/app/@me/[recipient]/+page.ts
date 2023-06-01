import { GetUserStore } from "$houdini";
import type { Convo } from "$lib/graphql";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
  let recipient: Convo['recipient']['asUser'] = (await new GetUserStore().fetch({ fetch, variables: { id: params.recipient } })).data?.byId.user ?? null

  return {
    recipientId: params.recipient,
    recipient: recipient!
  }
}
