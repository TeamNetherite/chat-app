import { load_GetChannels } from "$houdini";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ params, fetch }) => {
  return {
    serverId: params.guild,
    channelId: params.channel,
    ...(await load_GetChannels({ fetch, variables: { guild: params.guild } })),
  };
};
