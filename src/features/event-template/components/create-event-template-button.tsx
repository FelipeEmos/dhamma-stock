import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  EventTemplateForm,
  EventTemplateFormData,
} from "@/features/event-template/forms/event-template-form";
import * as Jazz from "@/jazz";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import * as React from "react";

interface CreateEventTemplateButtonProps extends ButtonProps {
  workspace: Jazz.WorkspaceType;
  className?: string;
}

export function CreateEventTemplateButton({
  workspace,
  className,
  ...buttonProps
}: CreateEventTemplateButtonProps) {
  const [createModalOpen, setCreateModalOpen] = React.useState(false);

  const handleCreateEventTemplate = (data: EventTemplateFormData) => {
    const newEventTemplate = Jazz.EventTemplate.create(
      {
        name: data.name,
        duration: data.duration,
        countFrom: data.countFrom,
        eventType: data.eventType,
        demands: Jazz.EventTemplateData.createNewDemands(workspace._owner),
      },
      workspace._owner
    );

    console.log("Created new event template", newEventTemplate);

    workspace.eventTemplates.push(newEventTemplate);
    setCreateModalOpen(false);
  };

  return (
    <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
      <DialogTrigger asChild>
        <Button className={cn("w-full", className)} {...buttonProps}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Novo Evento</DialogTitle>
        </DialogHeader>
        <EventTemplateForm
          workspace={workspace}
          onSubmit={handleCreateEventTemplate}
          onCancel={() => setCreateModalOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
