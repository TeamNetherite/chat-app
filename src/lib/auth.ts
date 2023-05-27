import { goto } from "$app/navigation";
import { NETHERITE_CHAT_SERVER_URL as SERVER_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";
import { writable } from "svelte/store";

export interface Tokens {
  access: string;
  refresh: string;
}

export async function login(
  props: { email: string; password: string },
): Promise<Tokens | null> {
  const response = await fetch(`${SERVER_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(props),
  });

  const tokens = await response.json().then((val) => val as (Tokens | null));

  localStorage.setItem("netheritechataccesstoken", tokens?.access ?? "");
  localStorage.setItem("netheritechatrefreshtoken", tokens?.refresh ?? "");

  if (tokens) {
    currentTokens.set(tokens);
  }

  return tokens;
}

export async function refresh(
  isRequest: boolean = false,
  fetch: typeof window.fetch = window.fetch,
  refreshToken: string | null = localStorage.getItem("netheritechatrefreshtoken")
): Promise<Tokens | null> {
  if (!refreshToken) {
    if (isRequest) throw redirect(302, "/auth/login");
    else {
      await goto("/auth/login");
      return null;
    }
  }

  const nextTokens = (await fetch(`${SERVER_URL}/auth/refresh`, {
    body: refreshToken,
    method: "POST",
  }).then((val) => val.json())) as Tokens; // invalidates refresh token, so we need to store the new one
  
  localStorage.setItem("netheritechataccesstoken", nextTokens?.access ?? "");
  localStorage.setItem("netheritechatrefreshtoken", nextTokens?.refresh ?? "");
  
  currentTokens.set(nextTokens);

  return nextTokens;
}

export const currentTokens = writable<Tokens>(undefined);
