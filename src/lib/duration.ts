import { z } from "jazz-tools";

export const DurationUnits = {
  DAYS: "days",
  WEEKS: "weeks",
  MONTHS: "months",
} as const;

export const DurationUnitSchema = z.enum([
  DurationUnits.DAYS,
  DurationUnits.WEEKS,
  DurationUnits.MONTHS,
]);

export type DurationUnit = z.infer<typeof DurationUnitSchema>;

export const DurationUnitLabel = {
  [DurationUnits.DAYS]: "Dias",
  [DurationUnits.WEEKS]: "Semanas",
  [DurationUnits.MONTHS]: "Meses",
};
