import { co } from "jazz-tools";
import { CoValueGroup } from "../_helpers";
import { EventTemplateSchema } from "../event-template/schema";

export namespace WorkspaceData {
  export function createNewEventTemplates(group: CoValueGroup) {
    return co.list(EventTemplateSchema).create([], group);
  }
}
