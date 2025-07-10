import { SearchInput } from "@/components/ui/search-input";
import * as Jazz from "@/jazz";
import { Link } from "@tanstack/react-router";
import { useAccount } from "jazz-tools/react";
import { useState } from "react";
import { WorkspaceAvatar } from "./workspace-avatar";

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

      <div className="flex flex-col gap-2">
        {filteredWorkspaces.map(workspace => (
          <Link
            key={workspace.id}
            to="/w/$workspaceId"
            params={{ workspaceId: workspace.id }}
          >
            <div className="cursor-pointer rounded-lg p-3 transition-colors hover:bg-gray-50">
              <WorkspaceAvatar workspace={workspace} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
