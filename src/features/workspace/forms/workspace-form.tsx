import { Button } from "@/components/ui/button";
import { InputField } from "@/features/form/input-field";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const workspaceSchema = z.object({
  name: z.string().min(3, "O nome precisa ter no mínimo 3 caracteres"),
  description: z.string().min(1, "A descrição é obrigatória"),
});

export type WorkspaceFormData = z.infer<typeof workspaceSchema>;

interface WorkspaceFormProps {
  defaultValues?: Partial<WorkspaceFormData>;
  onSubmit: (data: WorkspaceFormData) => void | Promise<void>;
}

const defaultValues: WorkspaceFormData = {
  name: "",
  description: "",
};

export function WorkspaceForm({
  defaultValues: _defaultValues,
  onSubmit,
}: WorkspaceFormProps) {
  const form = useForm({
    defaultValues: {
      ...defaultValues,
      ..._defaultValues,
    },
    validators: {
      onChange: workspaceSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      await onSubmit(value);
      formApi.reset();
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
          <InputField field={field} type="text" label="Descrição" />
        )}
      />

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={!form.state.isValid}>
          Salvar
        </Button>
      </div>
    </form>
  );
}
