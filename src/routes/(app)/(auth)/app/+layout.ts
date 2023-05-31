import { ME } from "$lib/graphql";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ fetch }) => {
  ME.fetch({ fetch })
}
