import type { GraphQLObject, GraphQLVariables, QueryStore } from "$houdini";

export default async function yay<
  TStore extends QueryStore<T, TInput>,
  T extends GraphQLObject = NonNullable<
    Awaited<ReturnType<TStore["fetch"]>>["data"]
  >,
  TInput extends GraphQLVariables = GraphQLVariables,
>(
  store: TStore,
  variables: TInput | undefined = undefined,
): Promise<T> {
  const result = await store.fetch({ variables });
  return result.data!;
}
