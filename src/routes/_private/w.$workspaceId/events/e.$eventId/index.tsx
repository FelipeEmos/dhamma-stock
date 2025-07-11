import { BackButtonLayout } from "@/components/layout/back-button-layout";
import { createFileRoute } from "@tanstack/react-router";
import { useRouteEventTemplate } from "./route";
import { cn } from "@/lib/utils";
import { EventTypeColor } from "@/features/event-template/event-type";

export const Route = createFileRoute(
  "/_private/w/$workspaceId/events/e/$eventId/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const eventTemplate = useRouteEventTemplate();
  const params = Route.useParams();

  return (
    <BackButtonLayout
      to="/w/$workspaceId/events"
      title={eventTemplate.name}
      params={params}
      headerFooter={
        <div
          className={cn(
            "h-3 w-full border-b-2",
            EventTypeColor[eventTemplate.eventType].fill,
            EventTypeColor[eventTemplate.eventType].border
          )}
        />
      }
    >
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{eventTemplate.name}</h2>
          <div className="mt-2 space-y-2">
            <p className="text-muted-foreground">
              <span className="font-medium">Duração:</span>{" "}
              {eventTemplate.duration.value} {eventTemplate.duration.unit}
            </p>
            <p className="text-muted-foreground">
              <span className="font-medium">Tipo:</span>{" "}
              {eventTemplate.eventType}
            </p>
            <p className="text-muted-foreground">
              <span className="font-medium">Contagem:</span>{" "}
              {eventTemplate.countFrom}
            </p>
          </div>
        </div>

        {/* Placeholder for event template details */}
        <div className="text-muted-foreground py-8 text-center">
          Detalhes do evento em desenvolvimento
        </div>
      </div>
    </BackButtonLayout>
  );
}
