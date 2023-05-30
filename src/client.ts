import { HoudiniClient, subscription } from "$houdini";
import { error } from "@sveltejs/kit";
import { createClient } from "graphql-ws";

const SERVER_URL = "192.168.31.55:8188";

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
        connectionParams() {
          return {
            accessToken: localStorage.getItem("netheritechataccesstoken"),
          };
        },
      })
    ),
  ],
});
