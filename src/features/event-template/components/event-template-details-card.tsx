import * as Jazz from "@/jazz";
import { DurationUnitLabel } from "@/lib/duration";
import { cn } from "@/lib/utils";
import { EventTypeColor, EventTypeLabel } from "../event-type";
import { CountingFromDayLabelText } from "@/lib/counting";

interface EventTemplateDetailsCardProps {
  eventTemplate: Jazz.EventTemplateType;
}

export function EventTemplateDetailsCard({
  eventTemplate,
}: EventTemplateDetailsCardProps) {
  const eventTypeColor = EventTypeColor[eventTemplate.eventType];

  return (
    <div
      className={cn(
        "relative flex items-center space-x-3 rounded-lg border p-3 pl-6"
      )}
    >
      {/* Event type indicator */}
      <div
        className={cn(
          "absolute top-0 left-0 h-full w-2 rounded-l-lg",
          eventTypeColor.fill
        )}
      ></div>

      {/* Event info */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">{eventTemplate.name}</h2>
        <div className="mt-2 space-y-2">
          <p className="text-muted-foreground">
            <span className="font-medium">Duração:</span>{" "}
            {eventTemplate.duration.value}{" "}
            {DurationUnitLabel[eventTemplate.duration.unit]}
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">Tipo:</span>{" "}
            {EventTypeLabel[eventTemplate.eventType]}
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">Conta a partir:</span>
            <CountingFromDayLabelText countFrom={eventTemplate.countFrom} />
          </p>
        </div>
      </div>
    </div>
  );
}
