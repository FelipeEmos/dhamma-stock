import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/w/$orgId/_nav/home")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello World Home</div>;
}
