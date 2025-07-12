import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouteWorkspace } from "@/routes/_private/w.$workspaceId/route";
import { Link } from "@tanstack/react-router";
import { WorkspaceAvatar } from "./workspace-avatar";

export function CurrentWorkspaceDetailsButton({
  className,
}: {
  className?: string;
}) {
  const workspace = useRouteWorkspace();

  return (
    <Button
      variant="ghost"
      className={cn("h-auto justify-start p-3", className)}
      asChild
    >
      <Link
        to="/w/$workspaceId/config"
        params={{ workspaceId: workspace.id }}
        className="flex items-center gap-3 px-8"
      >
        <WorkspaceAvatar workspace={workspace} showLocation={false} />
      </Link>
    </Button>
  );
}
