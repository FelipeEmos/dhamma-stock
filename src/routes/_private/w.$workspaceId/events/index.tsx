import { BackButtonLayout } from "@/components/layout/back-button-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/w/$workspaceId/events/")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();

  return (
    <BackButtonLayout
      to="/w/$workspaceId/home"
      params={params}
      title="Cursos e Eventos"
    >
      Hello Events
    </BackButtonLayout>
  );
}
