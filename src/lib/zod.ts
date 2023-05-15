import z from "zod";
export * from "zod";

const notAllowedPasswords = [
  "12345abc",
  "12345678",
];

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8).max(64).refine(
  (pass) => !notAllowedPasswords.includes(pass),
  { message: "Insecure password", path: ["password"] },
);

export function camelToTitle(text: string): string {
  const result = text.replace(/([A-Z])/g, (val) => " " + val.toLowerCase());
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
}

export type MaybeWrappedObject<TShape extends z.ZodRawShape> =
  | z.ZodObject<TShape>
  | z.ZodEffects<z.ZodObject<TShape>>;

export function shape<TShape extends z.ZodRawShape, TSchema extends MaybeWrappedObject<TShape>>(
  o: TSchema,
): TShape {
  if (o instanceof z.ZodEffects) {
    return shape(o.innerType());
  } else {
    return o.shape;
  }
}

export const zz = {
  email() {
    return emailSchema;
  },
  password() {
    return passwordSchema;
  },
  shape,
};
