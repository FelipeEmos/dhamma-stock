import { co } from "jazz-tools";
import { DemandSchema } from "./schema";

export const Demand = DemandSchema;

export type DemandType = co.loaded<typeof DemandSchema>;

export { DemandData } from "./data";
