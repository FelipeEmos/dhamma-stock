import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouteWorkspace } from "@/routes/_private/w.$workspaceId/route";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown, Users } from "lucide-react";
import { WorkspaceAvatar } from "./workspace-avatar";

export function CurrentWorkspaceDropdown() {
  const workspace = useRouteWorkspace();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto justify-start p-3">
          <div className="flex w-full items-center gap-3">
            <WorkspaceAvatar workspace={workspace} showLocation={false} />
            <ChevronDown className="ml-auto h-4 w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem asChild>
          <Link
            to="/w/$workspaceId/config"
            params={{ workspaceId: workspace.id }}
          >
            <Users className="mr-2 h-4 w-4" />
            Detalhes do Grupo
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/home-root">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Sair
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
