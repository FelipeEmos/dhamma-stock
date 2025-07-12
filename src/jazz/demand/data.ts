import { CoValueGroup } from "../_helpers";
import { DemandSchema } from "./schema";

export namespace DemandData {
  export function createNew(
    name: string,
    controlType: "daily" | "whole-period",
    group: CoValueGroup
  ) {
    return DemandSchema.create(
      {
        name,
        controlType,
      },
      group
    );
  }
}
