import type { Conversations$result } from "$houdini"
import type { ArrayOf } from "./typemagic"

  export type Convo = NonNullable<
    ArrayOf<Conversations$result['conversations']>>

  export enum Shit {
    Friends
  }
  export type SelectionThing = 
    | {
      type: 'shit',
      shit: Shit
    }
    | {
      type: 'dm'
    }
