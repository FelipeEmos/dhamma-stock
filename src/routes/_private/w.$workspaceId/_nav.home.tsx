import { Button } from "@/components/ui/button";
import { NavLink } from "@/features/navigation/components/nav-link";
import { CurrentWorkspaceDetailsButton } from "@/features/workspace/components/current-workspace-details-button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_private/w/$workspaceId/_nav/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();

  return (
    <div className="flex min-h-svh flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <CurrentWorkspaceDetailsButton />
        <Button asChild>
          <Link to="/home-root">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Sair
          </Link>
        </Button>
      </div>
      <div className="flex-1 p-6">
        <NavLink to="/w/$workspaceId/events" params={params}>
          Cursos e Eventos
        </NavLink>
      </div>
    </div>
  );
}
