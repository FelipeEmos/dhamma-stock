import { co } from "jazz-tools";
import { CoValueGroup } from "../_helpers";
import { DemandSchema } from "../demand/schema";

export namespace EventTemplateData {
  export function createNewDemands(group: CoValueGroup) {
    return co.list(DemandSchema).create([], group);
  }
}
