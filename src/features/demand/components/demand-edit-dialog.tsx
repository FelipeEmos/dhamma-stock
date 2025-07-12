import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DemandForm,
  DemandFormData,
} from "@/features/demand/forms/demand-form";
import * as Jazz from "@/jazz";

interface DemandEditDialogProps {
  demand: Jazz.DemandType;
  eventTemplate: Jazz.EventTemplateType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DemandEditDialog({
  demand,
  eventTemplate,
  open,
  onOpenChange,
}: DemandEditDialogProps) {
  const handleSubmit = async (data: DemandFormData) => {
    // Update the demand with new values
    demand.name = data.name;
    demand.controlType = data.controlType;

    // Close the modal after successful save
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Demanda</DialogTitle>
        </DialogHeader>
        <DemandForm
          eventTemplate={eventTemplate}
          defaultValues={{
            name: demand.name,
            controlType: demand.controlType,
          }}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          editingDemandId={demand.id}
        />
      </DialogContent>
    </Dialog>
  );
}
