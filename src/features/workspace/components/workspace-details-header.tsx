import { Button } from "@/components/ui/button";
import { WorkspaceAvatarImage } from "./workspace-avatar";
import { WorkspaceDeleteButton } from "./workspace-delete-button";
import * as Jazz from "@/jazz";
import { Loaded } from "jazz-tools";
import { Edit } from "lucide-react";

interface WorkspaceDetailsHeaderProps {
  workspace: Loaded<typeof Jazz.Workspace>;
  onEdit: () => void;
  onDelete: () => void;
}

export function WorkspaceDetailsHeader({
  workspace,
  onEdit,
  onDelete,
}: WorkspaceDetailsHeaderProps) {
  const locationText = workspace.location
    ? `${workspace.location.state} - ${workspace.location.country}`
    : null;

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <WorkspaceAvatarImage workspace={workspace} size="lg" />

      <div className="space-y-1 text-center">
        <h1 className="text-xl font-semibold">{workspace.name}</h1>
        {locationText && (
          <p className="text-muted-foreground text-sm">{locationText}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </Button>
        <WorkspaceDeleteButton
          workspaceName={workspace.name}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
