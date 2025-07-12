import { BackButtonLayout } from "@/components/layout/back-button-layout";
import { createFileRoute } from "@tanstack/react-router";
import { useRouteDemand } from "./route";
import { DemandControlTypeLabel } from "@/features/demand/demand-control-type";

export const Route = createFileRoute(
  "/_private/w/$workspaceId/events/e/$eventId/demands/d/$demandId/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const demand = useRouteDemand();
  const params = Route.useParams();

  return (
    <BackButtonLayout
      to="/w/$workspaceId/events/e/$eventId"
      title={demand.name}
      params={params}
      className="justify-start"
    >
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{demand.name}</h2>
          <div className="mt-2 space-y-2">
            <p className="text-muted-foreground">
              <span className="font-medium">Tipo de controle:</span>{" "}
              {DemandControlTypeLabel[demand.controlType]}
            </p>
          </div>
        </div>

        {/* Placeholder for demand details */}
        <div className="text-muted-foreground py-8 text-center">
          Detalhes da demanda em desenvolvimento
        </div>
      </div>
    </BackButtonLayout>
  );
}
