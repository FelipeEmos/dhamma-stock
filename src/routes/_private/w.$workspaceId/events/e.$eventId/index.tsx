import { BackButtonLayout } from "@/components/layout/back-button-layout";
import { createFileRoute } from "@tanstack/react-router";
import { useRouteEventTemplate } from "./route";
import { useRouteWorkspace } from "../../route";

import { EventTemplateDetailsCard } from "@/features/event-template/components/event-template-details-card";
import { DemandList } from "@/features/demand/components/demand-list";

export const Route = createFileRoute(
  "/_private/w/$workspaceId/events/e/$eventId/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const eventTemplate = useRouteEventTemplate();
  const workspace = useRouteWorkspace();
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

        {/* Seção de Demandas */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Demandas</h3>
          <DemandList eventTemplate={eventTemplate} workspace={workspace} />
        </div>
      </div>
    </BackButtonLayout>
  );
}
