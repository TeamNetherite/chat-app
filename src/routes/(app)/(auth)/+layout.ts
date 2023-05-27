import { isTauri } from "$lib/tauri";
import type { LayoutLoad } from "./$types";
import { NETHERITE_CHAT_SERVER_URL as SERVER_URL } from "$env/static/public";
import { currentTokens as tokenStore, refresh } from "$lib/auth";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ fetch }) => {
  let tokens = {
    access: null as string | null,
    refresh: null as string | null,
  };
  const tokensCurrent: Partial<typeof tokens> = {
    access: localStorage.getItem("netheritechataccesstoken") ?? null,
    refresh: localStorage.getItem("netheritechatrefreshtoken") ?? null,
  };
  const hasTokens = tokensCurrent &&
    tokensCurrent.refresh;

  if (hasTokens) {
    tokens.access = tokensCurrent.access ?? null;
    tokens.refresh = tokensCurrent.refresh!;

    const isActive = {
      access: tokens.access
        ? (await (await fetch(
          `${SERVER_URL}/auth/isactive?token=${tokens.access}`,
          { method: "GET" },
        )).json()) as boolean
        : false,
      refresh:
        (await (await fetch(
          `${SERVER_URL}/auth/isactive?token=${tokens.refresh}`,
          { method: "GET" },
        )).json()) as boolean,
    };

    if (!isActive.access) {
      const nextTokens = await refresh(
        true,
        fetch,
        isActive.refresh ? tokens.refresh : null,
      );

      tokens = nextTokens!;
    }

    tokenStore.set({
      access: tokens.access!,
      refresh: tokens.refresh!,
    });

    return {
      access: tokens.access!,
      refresh: tokens.refresh!,
    };
  } else {
    throw redirect(302, "/auth/login");
  }
}) satisfies LayoutLoad;
