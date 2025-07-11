import { Button } from "@/components/ui/button";
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
import { Plus } from "lucide-react";
import { useState } from "react";

interface CreateEventTemplateButtonProps {
  workspace: Jazz.WorkspaceType;
}

export function CreateEventTemplateButton({
  workspace,
}: CreateEventTemplateButtonProps) {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleCreateEventTemplate = (data: EventTemplateFormData) => {
    // Calculate next order value
    const nextOrder = workspace.eventTemplates.length;

    const newEventTemplate = Jazz.EventTemplate.create(
      {
        name: data.name,
        duration: data.duration,
        countFrom: data.countFrom,
        eventType: data.eventType,
        order: nextOrder,
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
        <Button className="w-full">
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
