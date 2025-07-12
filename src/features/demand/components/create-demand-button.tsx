import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DemandForm,
  DemandFormData,
} from "@/features/demand/forms/demand-form";
import * as Jazz from "@/jazz";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import * as React from "react";

interface CreateDemandButtonProps extends ButtonProps {
  eventTemplate: Jazz.EventTemplateType;
  className?: string;
}

export function CreateDemandButton({
  eventTemplate,
  className,
  ...buttonProps
}: CreateDemandButtonProps) {
  const [createModalOpen, setCreateModalOpen] = React.useState(false);

  const handleCreateDemand = (data: DemandFormData) => {
    const newDemand = Jazz.DemandData.createNew(
      data.name,
      data.controlType,
      eventTemplate._owner
    );

    console.log("Created new demand", newDemand);

    eventTemplate.demands.push(newDemand);
    setCreateModalOpen(false);
  };

  return (
    <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
      <DialogTrigger asChild>
        <Button className={cn("w-full", className)} {...buttonProps}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Demanda
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Demanda</DialogTitle>
        </DialogHeader>
        <DemandForm
          eventTemplate={eventTemplate}
          onSubmit={handleCreateDemand}
          onCancel={() => setCreateModalOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
