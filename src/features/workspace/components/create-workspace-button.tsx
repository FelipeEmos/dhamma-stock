import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  WorkspaceForm,
  WorkspaceFormData,
} from "@/features/workspace/forms/workspace-form";
import * as Jazz from "@/jazz";
import { WorkspaceData } from "@/jazz/workspace/data";
import { Group } from "jazz-tools";
import { useAccount } from "jazz-tools/react";
import { Plus } from "lucide-react";
import { useState } from "react";

export function CreateWorkspaceButton() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { me } = useAccount(Jazz.Account, {
    resolve: {
      root: {
        workspaces: true,
      },
    },
  });

  const handleCreateWorkspace = (data: WorkspaceFormData) => {
    if (!me?.root) {
      return;
    }

    const workspaceGroup = Group.create();

    const newWorkspace = Jazz.Workspace.create(
      {
        name: data.name,
        image: data.image,
        location:
          data.country || data.state
            ? {
                country: data.country,
                state: data.state,
              }
            : undefined,
        eventTemplates: WorkspaceData.createNewEventTemplates(workspaceGroup),
      },
      workspaceGroup
    );

    console.log("Created new workspace", newWorkspace);

    me.root.workspaces.push(newWorkspace);
    setCreateModalOpen(false);
  };

  return (
    <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Criar novo grupo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Novo Grupo</DialogTitle>
        </DialogHeader>
        <WorkspaceForm onSubmit={handleCreateWorkspace} />
      </DialogContent>
    </Dialog>
  );
}
