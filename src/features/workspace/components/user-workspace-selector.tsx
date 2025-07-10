import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SearchInput } from "@/components/ui/search-input";
import * as Jazz from "@/jazz";
import { Link } from "@tanstack/react-router";
import { useAccount } from "jazz-tools/react";
import { useState } from "react";

export function UserWorkspaceSelector() {
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredWorkspaces = workspaces.filter(workspace =>
    workspace.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (workspaces.length === 0) {
    return (
      <div className="py-4 text-center">
        <p className="text-muted-foreground">
          Nenhum grupo encontrado. Crie seu primeiro grupo para começar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SearchInput
        placeholder="Buscar grupos..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-4">
        {filteredWorkspaces.map(workspace => (
          <Link
            key={workspace.id}
            to="/w/$workspaceId"
            params={{ workspaceId: workspace.id }}
          >
            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{workspace.name}</CardTitle>
                {workspace.description && (
                  <CardDescription className="text-sm">
                    {workspace.description}
                  </CardDescription>
                )}
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
