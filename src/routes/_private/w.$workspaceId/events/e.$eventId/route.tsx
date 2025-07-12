import { InvalidResourceLayout } from "@/components/layout/invalid-resource-layout";
import { LoadingScreen } from "@/components/layout/loading-screen";
import * as Jazz from "@/jazz";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_private/w/$workspaceId/events/e/$eventId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const maybeValid = useSafeRouteEventTemplate();
  const { workspaceId } = Route.useParams();

  if (maybeValid === undefined) {
    return <LoadingScreen />;
  }
  if (maybeValid === null) {
    return (
      <InvalidResourceLayout
        to="/w/$workspaceId/events"
        params={{ workspaceId }}
      />
    );
  }

  return <Outlet />;
}

function useSafeRouteEventTemplate() {
  const { eventId } = Route.useParams();
  return Jazz.useEventTemplate(eventId);
}

export function useRouteEventTemplate(): Jazz.EventTemplateType {
  const eventTemplate = useSafeRouteEventTemplate();
  if (!eventTemplate) {
    throw new Error(
      "This hook must be used only if the event template is guaranteed"
    );
  }
  return eventTemplate;
}
