import { AuthRedirectEffects } from "@/features/navigation/use-auth-redirects";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/w/$orgId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orgId } = Route.useParams();
  AuthRedirectEffects.useRedirectOutOfWorkspace({ orgId });

  return <Outlet />;
}
