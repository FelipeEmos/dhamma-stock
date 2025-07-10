import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/w/$workspaceId/orders/_nav/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>TODO Orders</div>;
}
