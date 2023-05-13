import { isTauri } from "$lib/tauri";
import { z } from "zod";
import type { PageLoad } from "./$types";
import { NETHERITE_CHAT_SERVER_URL as SERVER_URL } from "$env/static/public";
import { type Tokens, tokens as tokenStore } from "$lib/auth";
import { redirect } from "@sveltejs/kit";

function getCookies(): Record<string, string> {
  let cookies: [string, string][] = document.cookie.split("; ").map((val) => {
    let [a, b] = val.split("=", 2);
    return [a, b];
  });

  return Object.fromEntries(cookies);
}

function setCookies(newCookies: Record<string, string>) {
  document.cookie = Object.entries(newCookies).map(([key, val]) =>
    `${key}=${val}`
  ).join("; ");
}

const COOKIE_SCHEMA = z.object({
  NetheriteChatAccessToken: z.string(),
  NetheriteChatRefreshToken: z.string(),
}).partial();

export const load = (async ({ url, fetch }) => {
  let tokens = {
    access: null as string | null,
    refresh: null as string | null,
  };
  if (isTauri) {
  } else {
    const cookies = getCookies();
    const tokensCurrent = COOKIE_SCHEMA.parse(cookies);

    tokens.access = tokensCurrent.NetheriteChatAccessToken ?? null;
    tokens.refresh = tokensCurrent.NetheriteChatRefreshToken ?? null;

    const hasTokens = !!tokensCurrent.NetheriteChatRefreshToken;
    if (hasTokens) {
      if (!tokens.access) {
        const nextTokens = (await fetch(`${SERVER_URL}/auth/refresh`, {
          body: JSON.stringify(tokensCurrent.NetheriteChatRefreshToken!),
        }).then((val) => val.json())) as Tokens; // invalidates refresh tokens, so we need to store the new one
        tokens.access = nextTokens.access;
        tokens.refresh = nextTokens.refresh;
      }
      tokenStore.set({
        access: tokens.access!,
        refresh: tokens.refresh!,
      });
      throw redirect(301, url.searchParams.get("redir") ?? "/app");
    } else {
      throw redirect(302, "/auth/login");
    }
  }
}) satisfies PageLoad;
