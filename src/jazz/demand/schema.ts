import { DemandControlTypeSchema } from "@/features/demand/demand-control-type";
import { co, z } from "jazz-tools";

export const DemandSchema = co.map({
  name: z.string(),
  controlType: DemandControlTypeSchema,
});
