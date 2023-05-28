import { HoudiniClient, subscription } from "$houdini";
import { refresh } from "$lib/auth";
import { error } from "@sveltejs/kit";
import { createClient } from "graphql-ws";

const SERVER_URL = "localhost:8188";

export default new HoudiniClient({
  url: `http://${SERVER_URL}/graphql`,
  fetchParams({ session }) {
    return {
      headers: {
        Authorization: `Bearer ${
          session?.accessToken ??
            localStorage.getItem("netheritechataccesstoken")
        }`,
      },
    };
  },
  throwOnError: {
    operations: ["all"],
    error: (errors, ctx) =>
      error(
        500,
        {
          message: `(${ctx.artifact.name}): ` +
            errors.map((err) => err.message).join(". ") + ".",
          graphql: "graphql",
        },
      ),
  },
  plugins: [
    subscription(() =>
      createClient({
        url: `ws://${SERVER_URL}/graphql-subscription`,
        connectionParams: async () => {
          let tokens = {
            access: null as string | null,
            refresh: null as string | null,
          };
          const tokensCurrent: Partial<typeof tokens> = {
            access: localStorage.getItem("netheritechataccesstoken") ?? null,
            refresh: localStorage.getItem("netheritechatrefreshtoken") ?? null,
          };

          tokens.access = tokensCurrent.access ?? null;
          tokens.refresh = tokensCurrent.refresh!;

          const isActive = {
            access: tokens.access
              ? (await (await fetch(
                `${SERVER_URL}/auth/isactive?token=${tokens.access}`,
                { method: "GET" },
              )).json()) as boolean
              : false,
            refresh: (await (await fetch(
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
          return {
            headers: {
              Authorization: `Bearer ${
                tokens.access
              }`,
            },
          };
        },
      })
    ),
  ],
});
