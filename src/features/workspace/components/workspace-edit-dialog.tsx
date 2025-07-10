import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  WorkspaceForm,
  WorkspaceFormData,
} from "@/features/workspace/forms/workspace-form";
import * as Jazz from "@/jazz";
import { Loaded } from "jazz-tools";

interface WorkspaceEditDialogProps {
  workspace: Loaded<typeof Jazz.Workspace>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: WorkspaceFormData) => void | Promise<void>;
}

export function WorkspaceEditDialog({
  workspace,
  open,
  onOpenChange,
  onSubmit,
}: WorkspaceEditDialogProps) {
  const handleSubmit = async (data: WorkspaceFormData) => {
    await onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Workspace</DialogTitle>
        </DialogHeader>
        <WorkspaceForm
          defaultValues={{
            name: workspace.name,
            image: workspace.image,
            country: workspace.location?.country || "",
            state: workspace.location?.state || "",
          }}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
