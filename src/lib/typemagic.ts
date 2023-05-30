export type ArrayOf<T> = T extends (infer U)[] ? U : never;

export function uniqueBy<T, K>(array: T[], key: (value: T) => K) {
    return [
        ...new Map(
            array.map(x => [key(x), x])
        ).values()
    ]
}
/**
 * @description
 * Takes an Array<V>, and a grouping function,
 * and returns a Map of the array grouped by the grouping function.
 *
 * @param list An array of type V.
 * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
 *                  K is generally intended to be a property key of V.
 *
 * @returns Map of the array grouped by the grouping function.
 */
export function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> {
   const map = new Map<K, Array<V>>();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}


export function unnull<T>(val: T | null | undefined): T {
  return val!;
}

export function cast<T>(val: unknown): T {
  return val as T;
}
