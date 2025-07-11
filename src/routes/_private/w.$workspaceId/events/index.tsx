import { BackButtonLayout } from "@/components/layout/back-button-layout";
import { EventTemplateList } from "@/features/event-template/components/event-template-list";
import { createFileRoute } from "@tanstack/react-router";
import { useRouteWorkspace } from "../route";

export const Route = createFileRoute("/_private/w/$workspaceId/events/")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const workspace = useRouteWorkspace();

  return (
    <BackButtonLayout
      to="/w/$workspaceId/home"
      params={params}
      title="Cursos e Eventos"
      className="w-full max-w-md justify-start"
    >
      <EventTemplateList workspace={workspace} className="w-full" />
    </BackButtonLayout>
  );
}
