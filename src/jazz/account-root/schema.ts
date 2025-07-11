import { co } from "jazz-tools";
import { WorkspaceSchema } from "../workspace/schema";

export const AccountRootSchema = co.map({
  workspaces: co.list(WorkspaceSchema),
});
