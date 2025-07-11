import { Button } from "@/components/ui/button";
import { InputField } from "@/features/form/input-field";
import { ImageField } from "@/features/form/image-field";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "O nome precisa ter no mínimo 2 caracteres"),
  email: z.email("Email inválido"),
  image: z.any().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  defaultValues?: Partial<ProfileFormData>;
  onSubmit: (data: ProfileFormData) => void | Promise<void>;
  onCancel?: () => void;
}

const defaultValues: ProfileFormData = {
  name: "",
  email: "",
  image: undefined,
};

export function ProfileForm({
  defaultValues: _defaultValues,
  onSubmit,
  onCancel,
}: ProfileFormProps) {
  const form = useForm({
    defaultValues: {
      ...defaultValues,
      ..._defaultValues,
    },
    validators: {
      onChange: profileSchema,
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
          <InputField field={field} type="text" label="Nome" />
        )}
      />

      <form.Field
        name="email"
        children={field => (
          <InputField field={field} type="email" label="Email" />
        )}
      />

      <form.Field
        name="image"
        children={field => <ImageField field={field} label="Foto do Perfil" />}
      />

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={!form.state.isValid}>
          Salvar
        </Button>
      </div>
    </form>
  );
}
