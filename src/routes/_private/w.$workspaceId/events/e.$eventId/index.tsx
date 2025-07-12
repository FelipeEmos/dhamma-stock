import { BackButtonLayout } from "@/components/layout/back-button-layout";
import { createFileRoute } from "@tanstack/react-router";
import { useRouteEventTemplate } from "./route";
import { cn } from "@/lib/utils";
import { EventTypeColor } from "@/features/event-template/event-type";
import { EventTemplateDetailsCard } from "@/features/event-template/components/event-template-details-card";

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
      className="justify-start"
    >
      <div className="space-y-4">
        <EventTemplateDetailsCard eventTemplate={eventTemplate} />

        {/* Placeholder for event template details */}
        <div className="text-muted-foreground py-8 text-center">
          Detalhes do evento em desenvolvimento
        </div>
      </div>
    </BackButtonLayout>
  );
}
