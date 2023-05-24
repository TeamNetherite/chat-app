import { isTauri } from "$lib/tauri";
import type { LayoutLoad } from "./$types";
import { NETHERITE_CHAT_SERVER_URL as SERVER_URL } from "$env/static/public";
import { currentTokens as tokenStore, type Tokens } from "$lib/auth";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ fetch }) => {
  let tokens = {
    access: null as string | null,
    refresh: null as string | null,
  };
  if (isTauri) {
    console.log("tauri");
  } else {
    const tokensCurrent: Partial<typeof tokens> = {
      access: localStorage.getItem("netheritechataccesstoken") ?? null,
      refresh: localStorage.getItem("netheritechatrefreshtoken") ?? null,
    };
    const hasTokens = tokensCurrent &&
      tokensCurrent.refresh;

    if (hasTokens) {
      tokens.access = tokensCurrent.access ?? null;
      tokens.refresh = tokensCurrent.refresh!;

      if (!tokens.access) {
        const nextTokens = (await fetch(`${SERVER_URL}/auth/refresh`, {
          body: JSON.stringify(tokensCurrent.refresh!),
        }).then((val) => val.json())) as Tokens; // invalidates refresh tokens, so we need to store the new one
        tokens.access = nextTokens.access;
        tokens.refresh = nextTokens.refresh;
      }

      tokenStore.set({
        access: tokens.access!,
        refresh: tokens.refresh!,
      });

      return {
        access: tokens.access!,
        refresh: tokens.refresh!,
      }
    } else {
      throw redirect(302, "/auth/login");
    }
  }
}) satisfies LayoutLoad;
