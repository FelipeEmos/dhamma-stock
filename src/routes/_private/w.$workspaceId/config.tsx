import { BackButtonLayout } from "@/components/layout/back-button-layout";
import { WorkspaceDetailsHeader } from "@/features/workspace/components/workspace-details-header";
import { WorkspaceEditDialog } from "@/features/workspace/components/workspace-edit-dialog";
import { WorkspaceFormData } from "@/features/workspace/forms/workspace-form";
import * as Jazz from "@/jazz";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAccount } from "jazz-tools/react";
import { useState } from "react";
import { useRouteWorkspace } from "./route";

export const Route = createFileRoute("/_private/w/$workspaceId/config")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const workspace = useRouteWorkspace();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { me } = useAccount(Jazz.Account, {
    resolve: {
      root: {
        workspaces: true,
      },
    },
  });

  // Check if current user can edit/delete this workspace
  const canManageWorkspace = workspace._owner.myRole() === "admin";

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = (data: WorkspaceFormData) => {
    // TODO: Check permissions - only admins can edit
    // TODO: Implement actual workspace update logic
    console.log("Updating workspace:", data);

    // Update workspace fields
    workspace.name = data.name;

    if (data.image) {
      workspace.image = data.image;
    }

    // Update location if provided
    if (data.country || data.state) {
      workspace.location = {
        country: data.country,
        state: data.state,
      };
    }
  };

  const handleDelete = async () => {
    if (!canManageWorkspace) {
      console.error("Sem permissão para deletar workspace");
      return;
    }

    if (!me?.root) {
      console.error("User root not found");
      return;
    }

    // FIXME: Workspace deletion not working
    // Remove workspace from user's list
    const workspaceIndex = me.root.workspaces.indexOf(workspace);
    if (workspaceIndex !== -1) {
      me.root.workspaces.splice(workspaceIndex, 1);
    }

    // TOIMPROVE: Implement proper workspace cleanup
    // Consider the following for a complete cleanup implementation:
    // 1. Should we delete the workspace Group entirely or just remove our reference?
    // 2. What happens to other members if this workspace has shared access?
    // 3. Should we implement a "soft delete" with restore capability?
    // 4. How to handle workspace-related data (members, settings, etc.)?
    // 5. Does Jazz have garbage collection for unreferenced Groups?
    // For now, we only remove from user's workspace list for prototype simplicity.

    console.log("Workspace deleted:", workspace.name);

    // Navigate back to home
    await navigate({ to: "/home-root" });
  };

  return (
    <BackButtonLayout
      to="/w/$workspaceId"
      params={params}
      title="Detalhes do Grupo"
    >
      <div className="w-full max-w-md space-y-6">
        {canManageWorkspace && (
          <WorkspaceDetailsHeader
            workspace={workspace}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {!canManageWorkspace && (
          <div className="flex flex-col items-center space-y-4 p-6">
            <h1 className="text-xl font-semibold">{workspace.name}</h1>
            <p className="text-muted-foreground text-sm">
              Apenas o proprietário pode editar este workspace
            </p>
          </div>
        )}

        {canManageWorkspace && (
          <WorkspaceEditDialog
            workspace={workspace}
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSubmit={handleEditSubmit}
          />
        )}

        <div className="border-t pt-6">
          <h2 className="mb-4 text-lg font-semibold">Membros</h2>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              Lista de membros será implementada aqui
            </p>
          </div>
        </div>
      </div>
    </BackButtonLayout>
  );
}
