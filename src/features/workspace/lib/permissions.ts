import * as Jazz from "@/jazz";
import { Loaded } from "jazz-tools";

export function getWorkspacePermissions(
  workspace: Loaded<typeof Jazz.Workspace>
) {
  const canManage = workspace._owner.myRole() === "admin";

  return {
    canManage,
    canEdit: canManage,
    canDelete: canManage,
    // Future: more granular roles can be added here
  };
}

export function canManageWorkspace(
  workspace: Loaded<typeof Jazz.Workspace>
): boolean {
  return getWorkspacePermissions(workspace).canManage;
}

export function canEditWorkspace(
  workspace: Loaded<typeof Jazz.Workspace>
): boolean {
  return getWorkspacePermissions(workspace).canEdit;
}

export function canDeleteWorkspace(
  workspace: Loaded<typeof Jazz.Workspace>
): boolean {
  return getWorkspacePermissions(workspace).canDelete;
}
