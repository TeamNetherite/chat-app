import { NETHERITE_CHAT_SERVER_URL as SERVER_URL } from "$env/static/public";
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

  const tokens = (await response.json()) as Tokens | null;

  if (tokens)
    currentTokens.set(tokens)

  return tokens
}

export const currentTokens = writable<Tokens>(undefined);
