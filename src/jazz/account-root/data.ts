import { co } from "jazz-tools";
import { CoValueGroup } from "../_helpers";
import { WorkspaceSchema } from "../workspace/schema";
import { AccountRootSchema } from "./schema";

export namespace AccountRootData {
  export function createNewWorkspaces(group: CoValueGroup) {
    return co.list(WorkspaceSchema).create([], group);
  }

  export function createNew(group: CoValueGroup) {
    return AccountRootSchema.create(
      {
        workspaces: createNewWorkspaces(group),
      },
      group
    );
  }
}
