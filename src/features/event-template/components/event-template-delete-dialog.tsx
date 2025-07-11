import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as Jazz from "@/jazz";

interface EventTemplateDeleteDialogProps {
  template: Jazz.EventTemplateType;
  workspace: Jazz.WorkspaceType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventTemplateDeleteDialog({
  template,
  workspace,
  open,
  onOpenChange,
}: EventTemplateDeleteDialogProps) {
  const handleDelete = () => {
    // Find and remove the template from the workspace
    const index = workspace.eventTemplates.findIndex(t => t.id === template.id);
    if (index !== -1) {
      workspace.eventTemplates.splice(index, 1);
    }

    // Close the modal after deletion
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Deletar Evento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Tem certeza que deseja deletar o evento &quot;{template.name}&quot;?
          </p>
          <p className="text-muted-foreground text-sm">
            Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Deletar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
