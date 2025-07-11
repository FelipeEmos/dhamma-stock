import { Button } from "@/components/ui/button";
import { CreateEventTemplateButton } from "@/features/event-template/components/create-event-template-button";
import { EventTemplateItem } from "@/features/event-template/components/event-template-item";
import { getWorkspacePermissions } from "@/features/workspace/lib/permissions";
import * as Jazz from "@/jazz";
import * as React from "react";
import { cn } from "@/lib/utils";
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
import { CheckCircle, Edit } from "lucide-react";
import { useState } from "react";

interface EventTemplateListProps {
  workspace: Jazz.WorkspaceType;
  className?: string;
}

export function EventTemplateList({
  workspace,
  className,
}: EventTemplateListProps) {
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
      const oldIndex = workspace.eventTemplates.findIndex(
        template => template.id === active.id
      );
      const newIndex = workspace.eventTemplates.findIndex(
        template => template.id === over.id
      );

      // Use arrayMove to reorder the items
      const newOrder = arrayMove(workspace.eventTemplates, oldIndex, newIndex);

      // Clear the array and add items in new order
      workspace.eventTemplates.splice(0, workspace.eventTemplates.length);
      newOrder.forEach(template => workspace.eventTemplates.push(template));
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  React.useEffect(() => {
    if (isEditing && workspace.eventTemplates.length === 0) {
      setIsEditing(false);
    }
  }, [isEditing, workspace.eventTemplates]);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Create Button */}
      {canManage && (
        <CreateEventTemplateButton
          workspace={workspace}
          className="w-full"
          disabled={isEditing}
        />
      )}

      {/* Edit Mode Toggle */}
      {canManage && workspace.eventTemplates.length > 0 && (
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

      {/* Template List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={workspace.eventTemplates.map(template => template.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-4 pt-8">
            {workspace.eventTemplates.map(template => (
              <EventTemplateItem
                key={template.id}
                template={template}
                workspace={workspace}
                canManage={canManage}
                isEditing={isEditing}
              />
            ))}

            {workspace.eventTemplates.length === 0 && (
              <div className="text-muted-foreground py-8 text-center">
                Nenhum evento criado ainda
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
