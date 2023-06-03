import { MeStore, type Conversations$result, type GetDM$result, type Me$result, type GetChannelConvo$result } from "$houdini";
import type { ArrayOf } from "./typemagic";

export type Convo = NonNullable<
  ArrayOf<Conversations$result["conversations"]>
>;

export enum Shit {
  Friends,
}
export type SelectionThing =
  | {
    type: "shit";
    shit: Shit;
  }
  | {
    type: "dm";
  };

export type MessageData = ArrayOf<
  GetDM$result["conversationDirect"]["messages"]["edges"]
>["node"];

export type ChannelMessageData = ArrayOf<NonNullable<GetChannelConvo$result['byId']['channel']>['talk']['messages']['edges']>['node']

export type UserData = Omit<Me$result["me"], "friends">;

export const ME = new MeStore
