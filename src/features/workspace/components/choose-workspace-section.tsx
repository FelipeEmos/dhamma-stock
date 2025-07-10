import { CreateWorkspaceButton } from "./create-workspace-button";
import { UserWorkspaceSelector } from "./user-workspace-selector";

export function ChooseWorkspaceSection() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Grupos</h2>
        <p className="text-muted-foreground">
          Seus grupos, selecione para entrar
        </p>
      </div>
      <div className="space-y-8">
        <UserWorkspaceSelector />
        <CreateWorkspaceButton />
      </div>
    </div>
  );
}
