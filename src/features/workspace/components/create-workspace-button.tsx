import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateWorkspaceForm } from "@/features/workspace/forms/create-workspace-form";
import { Plus } from "lucide-react";
import { useState } from "react";

export function CreateWorkspaceButton() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleCreateSuccess = () => {
    setCreateModalOpen(false);
  };

  return (
    <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Criar novo workspace
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Novo Workspace</DialogTitle>
        </DialogHeader>
        <CreateWorkspaceForm onSuccess={handleCreateSuccess} />
      </DialogContent>
    </Dialog>
  );
}
