import * as Jazz from "@/jazz";
import { cn } from "@/lib/utils";
import { DemandControlTypeLabel } from "../demand-control-type";
import { DemandMenu } from "./demand-menu";
import { DemandEditDialog } from "./demand-edit-dialog";
import { DemandDeleteDialog } from "./demand-delete-dialog";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import * as React from "react";

interface LinkWrapperProps {
  children: React.ReactNode;
  isEditing: boolean;
  to: string;
  params: {
    workspaceId: string;
    eventId: string;
    demandId: string;
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

interface DemandItemProps {
  demand: Jazz.DemandType;
  eventTemplate: Jazz.EventTemplateType;
  workspace: Jazz.WorkspaceType;
  canManage: boolean;
  isEditing: boolean;
}

export function DemandItem({
  demand,
  eventTemplate,
  workspace,
  canManage,
  isEditing,
}: DemandItemProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const controlTypeLabel = DemandControlTypeLabel[demand.controlType];

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: demand.id,
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

      {/* Demand info */}
      <div className="flex-1">
        <div className="font-medium">{demand.name}</div>
        <div className="text-muted-foreground text-sm">{controlTypeLabel}</div>
      </div>

      {/* More menu */}
      {canManage && isEditing && (
        <div className="flex-shrink-0">
          <DemandMenu
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
        to="/w/$workspaceId/events/e/$eventId/demands/d/$demandId"
        params={{
          workspaceId: workspace.id,
          eventId: eventTemplate.id,
          demandId: demand.id,
        }}
      >
        {itemContent}
      </LinkWrapper>

      {/* Edit Dialog */}
      <DemandEditDialog
        demand={demand}
        eventTemplate={eventTemplate}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      {/* Delete Dialog */}
      <DemandDeleteDialog
        demand={demand}
        eventTemplate={eventTemplate}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
