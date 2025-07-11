import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  EventTemplateForm,
  EventTemplateFormData,
} from "@/features/event-template/forms/event-template-form";
import * as Jazz from "@/jazz";

interface EventTemplateEditDialogProps {
  template: Jazz.EventTemplateType;
  workspace: Jazz.WorkspaceType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventTemplateEditDialog({
  template,
  workspace,
  open,
  onOpenChange,
}: EventTemplateEditDialogProps) {
  const handleSubmit = async (data: EventTemplateFormData) => {
    // Update the template with new values
    template.name = data.name;
    template.duration = data.duration;
    template.countFrom = data.countFrom;
    template.eventType = data.eventType;

    // Close the modal after successful save
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Evento</DialogTitle>
        </DialogHeader>
        <EventTemplateForm
          workspace={workspace}
          defaultValues={{
            name: template.name,
            duration: template.duration,
            countFrom: template.countFrom,
            eventType: template.eventType,
          }}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          editingTemplateId={template.id}
        />
      </DialogContent>
    </Dialog>
  );
}
