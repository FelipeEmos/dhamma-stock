import * as Jazz from "@/jazz";
import { DurationUnitLabel } from "@/lib/duration";
import { cn } from "@/lib/utils";
import { EventTypeColor, EventTypeLabel } from "../event-type";

interface EventTemplateItemProps {
  template: Jazz.EventTemplateType;
  canManage: boolean;
}

export function EventTemplateItem({
  template,
  canManage,
}: EventTemplateItemProps) {
  const eventTypeColor = EventTypeColor[template.eventType];
  const eventTypeLabel = EventTypeLabel[template.eventType];
  const unitLabel = DurationUnitLabel[template.duration.unit];

  return (
    <div className="flex items-center space-x-3 rounded-lg border p-3">
      {/* Drag handle (will be implemented later) */}
      <div className="flex-shrink-0">
        <div className="h-2 w-2 space-y-1">
          <div className="h-0.5 w-full rounded bg-gray-400"></div>
          <div className="h-0.5 w-full rounded bg-gray-400"></div>
          <div className="h-0.5 w-full rounded bg-gray-400"></div>
        </div>
      </div>

      {/* Event type indicator */}
      <div
        className={cn(
          "h-3 w-3 rounded-full",
          eventTypeColor.fill,
          eventTypeColor.border
        )}
      ></div>

      {/* Event info */}
      <div className="flex-1">
        <div className="font-medium">{template.name}</div>
        <div className="text-muted-foreground text-sm">
          {template.duration.value} {unitLabel} • {eventTypeLabel}
        </div>
      </div>

      {/* More menu (will be implemented later) */}
      {canManage && (
        <div className="flex-shrink-0">
          <div className="flex h-4 w-1 flex-col justify-center space-y-0.5">
            <div className="h-1 w-1 rounded-full bg-gray-400"></div>
            <div className="h-1 w-1 rounded-full bg-gray-400"></div>
            <div className="h-1 w-1 rounded-full bg-gray-400"></div>
          </div>
        </div>
      )}
    </div>
  );
}
