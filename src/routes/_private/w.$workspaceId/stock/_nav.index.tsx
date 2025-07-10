import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/w/$workspaceId/stock/_nav/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>TODO Stock</div>;
}
