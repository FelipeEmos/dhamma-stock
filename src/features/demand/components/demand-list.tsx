import * as Jazz from "@/jazz";
import { cn } from "@/lib/utils";
import { CreateDemandButton } from "./create-demand-button";
import { DemandItem } from "./demand-item";
import { getWorkspacePermissions } from "@/features/workspace/lib/permissions";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { CheckCircle, Edit } from "lucide-react";
import { useState } from "react";
import * as React from "react";

interface DemandListProps {
  eventTemplate: Jazz.EventTemplateType;
  workspace: Jazz.WorkspaceType;
  className?: string;
}

export function DemandList({
  eventTemplate,
  workspace,
  className,
}: DemandListProps) {
  const { canManage } = getWorkspacePermissions(workspace);
  const [isEditing, setIsEditing] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = eventTemplate.demands.findIndex(
        demand => demand?.id === active.id
      );
      const newIndex = eventTemplate.demands.findIndex(
        demand => demand?.id === over.id
      );

      // Use arrayMove to reorder the items
      const newOrder = arrayMove(eventTemplate.demands, oldIndex, newIndex);

      // Clear the array and add items in new order
      eventTemplate.demands.splice(0, eventTemplate.demands.length);
      newOrder.forEach(demand => eventTemplate.demands.push(demand));
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  React.useEffect(() => {
    if (isEditing && eventTemplate.demands.length === 0) {
      setIsEditing(false);
    }
  }, [isEditing, eventTemplate.demands]);
  if (!eventTemplate.demands) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="text-muted-foreground py-8 text-center">
          Carregando demandas...
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Create Button */}
      {canManage && (
        <CreateDemandButton
          eventTemplate={eventTemplate}
          className="w-full"
          disabled={isEditing}
        />
      )}

      {/* Edit Mode Toggle */}
      {canManage && eventTemplate.demands.length > 0 && (
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={toggleEditing}
          className="w-full gap-2"
        >
          {isEditing ? (
            <>
              <CheckCircle className="h-4 w-4" />
              Parar Edição
            </>
          ) : (
            <>
              <Edit className="h-4 w-4" />
              Editar
            </>
          )}
        </Button>
      )}

      {/* Demand List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={eventTemplate.demands.map(demand => demand?.id || "")}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-4 pt-8">
            {eventTemplate.demands.map(demand => {
              if (!demand) return null;

              return (
                <DemandItem
                  key={demand.id}
                  demand={demand}
                  eventTemplate={eventTemplate}
                  workspace={workspace}
                  canManage={canManage}
                  isEditing={isEditing}
                />
              );
            })}

            {eventTemplate.demands.length === 0 && (
              <div className="text-muted-foreground py-8 text-center">
                Nenhuma demanda criada ainda
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
