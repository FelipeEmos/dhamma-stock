import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as Jazz from "@/jazz";
import { useAccount } from "jazz-tools/react";
import { Loaded } from "jazz-tools";

export function UserWorkspaceSelector() {
  const { me } = useAccount(Jazz.Account, {
    resolve: {
      root: {
        workspaces: {
          $each: { $onError: null },
        },
      },
    },
  });
  const workspaces = me?.root?.workspaces?.filter(w => !!w) ?? [];

  const handleWorkspaceClick = (workspace: Loaded<typeof Jazz.Workspace>) => {
    console.log(`Workspace clicked: ${workspace.name}`);
  };

  if (workspaces.length === 0) {
    return (
      <div className="py-4 text-center">
        <p className="text-muted-foreground">
          Nenhum workspace encontrado. Crie seu primeiro workspace para começar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {workspaces.map(workspace => (
        <Card
          key={workspace.id}
          className="cursor-pointer transition-shadow hover:shadow-md"
          onClick={() => handleWorkspaceClick(workspace)}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{workspace.name}</CardTitle>
            {workspace.description && (
              <CardDescription className="text-sm">
                {workspace.description}
              </CardDescription>
            )}
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
