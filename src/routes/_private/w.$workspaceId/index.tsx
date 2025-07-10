import { createFileRoute } from "@tanstack/react-router";
import { CurrentWorkspaceDropdown } from "@/features/workspace/components/current-workspace-dropdown";
import { useRouteWorkspace } from "./route";

export const Route = createFileRoute("/_private/w/$workspaceId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const workspace = useRouteWorkspace();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b p-4">
        <CurrentWorkspaceDropdown />
      </div>
      <div className="flex-1 p-6">
        <div>Workspace: {workspace.name}</div>
      </div>
    </div>
  );
}
