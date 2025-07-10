import { InvalidResourceLayout } from "@/components/layout/invalid-resource-layout";
import { LoadingScreen } from "@/components/layout/loading-screen";
import * as Jazz from "@/jazz";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useCoState } from "jazz-tools/react";

export const Route = createFileRoute("/_private/w/$workspaceId")({
  component: RouteComponent,
});

function RouteComponent() {
  const maybeValid = useSafeRouteWorkspace();

  if (maybeValid === undefined) {
    return <LoadingScreen />;
  }
  if (maybeValid === null) {
    return <InvalidResourceLayout to="/home-root" />;
  }
  return <Outlet />;
}

function useSafeRouteWorkspace() {
  const { workspaceId } = Route.useParams();
  return useCoState(Jazz.Workspace, workspaceId);
}

export function useRouteWorkspace() {
  const workspace = useSafeRouteWorkspace();
  if (!workspace) {
    throw new Error(
      "This hook must be used only if the workspace is guaranteed"
    );
  }
  return workspace;
}
