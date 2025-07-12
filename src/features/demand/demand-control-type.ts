import { z } from "jazz-tools";

export const DemandControlTypes = {
  DAILY: "daily",
  WHOLE_PERIOD: "whole-period",
} as const;

export const DemandControlTypeSchema = z.enum([
  DemandControlTypes.DAILY,
  DemandControlTypes.WHOLE_PERIOD,
]);

export type DemandControlType = z.infer<typeof DemandControlTypeSchema>;

export const DemandControlTypeLabel = {
  [DemandControlTypes.DAILY]: "Diária",
  [DemandControlTypes.WHOLE_PERIOD]: "Período Todo",
};
