import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  if (localStorage.getItem("netheritechataccesstoken")) {
    throw redirect(302, '/app/@me')
  }
}
