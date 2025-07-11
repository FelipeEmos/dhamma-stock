import { z } from "jazz-tools";

export const CountingMethods = {
  ZERO_FIRST: "zero-first",
  ONE_FIRST: "one-first",
} as const;

export const CountingMethodSchema = z.enum([
  CountingMethods.ZERO_FIRST,
  CountingMethods.ONE_FIRST,
]);

export type CountingMethod = z.infer<typeof CountingMethodSchema>;
