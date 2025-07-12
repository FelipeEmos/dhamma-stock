import { InvalidResourceLayout } from "@/components/layout/invalid-resource-layout";
import { LoadingScreen } from "@/components/layout/loading-screen";
import * as Jazz from "@/jazz";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { useRouteEventTemplate } from "../../route";

export const Route = createFileRoute(
  "/_private/w/$workspaceId/events/e/$eventId/demands/d/$demandId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const maybeValid = useSafeRouteDemand();
  const { workspaceId, eventId } = Route.useParams();

  if (maybeValid === undefined) {
    return <LoadingScreen />;
  }
  if (maybeValid === null) {
    return (
      <InvalidResourceLayout
        to="/w/$workspaceId/events/e/$eventId"
        params={{ workspaceId, eventId }}
      />
    );
  }

  return <Outlet />;
}

function useSafeRouteDemand() {
  const { demandId } = Route.useParams();
  const eventTemplate = useRouteEventTemplate();

  if (!eventTemplate.demands) {
    return undefined;
  }

  const demand = eventTemplate.demands.find(d => d?.id === demandId);
  return demand || null;
}

export function useRouteDemand(): Jazz.DemandType {
  const demand = useSafeRouteDemand();
  if (!demand) {
    throw new Error("This hook must be used only if the demand is guaranteed");
  }
  return demand;
}
