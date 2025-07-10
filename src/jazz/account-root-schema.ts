import { co } from "jazz-tools";
import { Workspace } from "./workspace-schema";

export const AccountRoot = co.map({
  workspaces: co.list(Workspace),
});

export type AccountRoot = co.loaded<typeof AccountRoot>;
