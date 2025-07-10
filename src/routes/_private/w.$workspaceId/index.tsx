import { BackButtonLayout } from "@/components/layout/back-button-layout";
import { createFileRoute } from "@tanstack/react-router";
import { useRouteWorkspace } from "./route";

export const Route = createFileRoute("/_private/w/$workspaceId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const workspace = useRouteWorkspace();

  return (
    <BackButtonLayout to="/home-root">
      <div>Workspace: {workspace.name}</div>
    </BackButtonLayout>
  );
}
