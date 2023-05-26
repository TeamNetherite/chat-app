import { HoudiniClient } from "$houdini";
import { error } from '@sveltejs/kit'

export default new HoudiniClient({
  url: `http://localhost:8188/graphql`,
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
        { message: `(${ctx.artifact.name}): ` +
          errors.map((err) => err.message).join(". ") + ".", graphql: "graphql" }
      ),
  },
});
