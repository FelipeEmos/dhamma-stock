import { NavLink } from "@/features/navigation/components/nav-link";
import { CurrentWorkspaceDropdown } from "@/features/workspace/components/current-workspace-dropdown";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/w/$workspaceId/_nav/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();

  return (
    <div className="flex min-h-svh flex-col">
      <div className="border-b p-4">
        <CurrentWorkspaceDropdown />
      </div>
      <div className="flex-1 p-6">
        <NavLink to="/w/$workspaceId/events" params={params}>
          Cursos e Eventos
        </NavLink>
      </div>
    </div>
  );
}
