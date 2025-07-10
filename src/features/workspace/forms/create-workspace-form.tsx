import { InputField } from "@/features/form/input-field";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useAccount } from "jazz-tools/react";
import { Group } from "jazz-tools";
import * as Jazz from "@/jazz";

const createWorkspaceSchema = z.object({
  name: z.string().min(3, "O nome precisa ter no mínimo 3 caracteres"),
  description: z.string(),
});

interface CreateWorkspaceFormProps {
  onSuccess: () => void;
}

export function CreateWorkspaceForm({ onSuccess }: CreateWorkspaceFormProps) {
  const { me } = useAccount(Jazz.Account, {
    resolve: {
      root: {
        workspaces: true,
      },
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    validators: {
      onChange: createWorkspaceSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      if (!me?.root) return;

      const workspaceGroup = Group.create();

      const newWorkspace = Jazz.Workspace.create(
        {
          name: value.name,
          description: value.description || undefined,
        },
        workspaceGroup
      );

      console.log("Created new workspace", newWorkspace);

      me.root.workspaces?.push(newWorkspace);

      formApi.reset();
      onSuccess();
    },
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field
        name="name"
        children={field => (
          <InputField field={field} type="text" label="Nome do Workspace" />
        )}
      />

      <form.Field
        name="description"
        children={field => (
          <InputField field={field} type="text" label="Descrição (opcional)" />
        )}
      />

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={!form.state.isValid}>
          Criar Workspace
        </Button>
      </div>
    </form>
  );
}
