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

export function CountingFromDayLabelText({
  countFrom,
}: {
  countFrom: CountingMethod;
}) {
  if (countFrom === CountingMethods.ZERO_FIRST) {
    return (
      <>
        Do dia zero:{" "}
        <span className="text-primary">
          (<span className="font-bold">D0</span>, D1, D2 ...)
        </span>
      </>
    );
  }
  if (countFrom === CountingMethods.ONE_FIRST) {
    return (
      <>
        Do dia um:{" "}
        <span className="text-primary">
          (<span className="font-bold">D1</span>, D2, D3 ...)
        </span>
      </>
    );
  }

  return null;
}
