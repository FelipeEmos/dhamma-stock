import * as Jazz from "@/jazz";
import { DurationUnitLabel } from "@/lib/duration";
import { cn } from "@/lib/utils";
import { EventTypeColor, EventTypeLabel } from "../event-type";
import { EventTemplateMenu } from "./event-template-menu";
import { EventTemplateEditDialog } from "./event-template-edit-dialog";
import { EventTemplateDeleteDialog } from "./event-template-delete-dialog";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import * as React from "react";

interface LinkWrapperProps {
  children: React.ReactNode;
  isEditing: boolean;
  to: string;
  params: {
    workspaceId: string;
    eventId: string;
  };
}

function LinkWrapper({ children, isEditing, to, params }: LinkWrapperProps) {
  if (isEditing) {
    return <>{children}</>;
  }

  return (
    <Link to={to} params={params}>
      {children}
    </Link>
  );
}

interface EventTemplateItemProps {
  template: Jazz.EventTemplateType;
  workspace: Jazz.WorkspaceType;
  canManage: boolean;
  isEditing: boolean;
}

export function EventTemplateItem({
  template,
  workspace,
  canManage,
  isEditing,
}: EventTemplateItemProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const eventTypeColor = EventTypeColor[template.eventType];
  const eventTypeLabel = EventTypeLabel[template.eventType];
  const unitLabel = DurationUnitLabel[template.duration.unit];

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: template.id,
    disabled: !isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const itemContent = (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative flex items-center space-x-3 rounded-lg border p-3 pl-6",
        isDragging && "opacity-50"
      )}
    >
      {/* Drag handle */}
      {isEditing && (
        <div
          className="flex-shrink-0 cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
      )}

      {/* Event type indicator */}
      <div
        className={cn(
          "absolute top-0 left-0 h-full w-2 rounded-l-lg",
          eventTypeColor.fill
        )}
      ></div>

      {/* Event info */}
      <div className="flex-1">
        <div className="font-medium">{template.name}</div>
        <div className="text-muted-foreground text-sm">
          {template.duration.value} {unitLabel} • {eventTypeLabel}
        </div>
      </div>

      {/* More menu */}
      {canManage && isEditing && (
        <div className="flex-shrink-0">
          <EventTemplateMenu
            onEdit={() => setEditOpen(true)}
            onDelete={() => setDeleteOpen(true)}
          />
        </div>
      )}
    </div>
  );

  return (
    <>
      <LinkWrapper
        isEditing={isEditing}
        to="/w/$workspaceId/events/e/$eventId"
        params={{
          workspaceId: workspace.id,
          eventId: template.id,
        }}
      >
        {itemContent}
      </LinkWrapper>

      {/* Edit Dialog */}
      <EventTemplateEditDialog
        template={template}
        workspace={workspace}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      {/* Delete Dialog */}
      <EventTemplateDeleteDialog
        template={template}
        workspace={workspace}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
