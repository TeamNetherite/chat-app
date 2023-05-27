export type ArrayOf<T> = T extends (infer U)[] ? U : never;

export function uniqueBy<T, K>(array: T[], key: (value: T) => K) {
    return [
        ...new Map(
            array.map(x => [key(x), x])
        ).values()
    ]
}
