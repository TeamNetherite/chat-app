import { NETHERITE_CHAT_SERVER_URL as SERVER_URL } from "$env/static/public";
import { writable } from "svelte/store";
import { z } from "zod";

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

  return (await response.json()) as Tokens | null;
}

export const tokens = writable<Tokens>(undefined);


