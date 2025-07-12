import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputField } from "@/features/form/input-field";
import {
  DemandControlTypeLabel,
  DemandControlTypes,
  DemandControlTypeSchema,
} from "@/features/demand/demand-control-type";
import * as Jazz from "@/jazz";
import { useForm } from "@tanstack/react-form";
import { z } from "jazz-tools";

const demandSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  controlType: DemandControlTypeSchema,
});

export type DemandFormData = z.infer<typeof demandSchema>;

interface DemandFormProps {
  eventTemplate: Jazz.EventTemplateType;
  defaultValues?: Partial<DemandFormData>;
  onSubmit: (data: DemandFormData) => void | Promise<void>;
  onCancel?: () => void;
  editingDemandId?: string;
}

const defaultValues: DemandFormData = {
  name: "",
  controlType: "daily",
};

export function DemandForm({
  eventTemplate,
  defaultValues: _defaultValues,
  onSubmit,
  onCancel,
  editingDemandId,
}: DemandFormProps) {
  const form = useForm({
    defaultValues: {
      ...defaultValues,
      ..._defaultValues,
    },
    validators: {
      onChange: demandSchema,
      onSubmitAsync: async ({ value }) => {
        // Check for duplicate names
        const existingDemand = eventTemplate.demands?.find(
          demand =>
            demand?.name === value.name && demand?.id !== editingDemandId
        );

        if (existingDemand) {
          return {
            fields: {
              name: "Já existe uma demanda com este nome",
            },
          };
        }
        return null;
      },
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
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

      <div className="space-y-3">
        <Label>Tipo de controle e compra</Label>
        <form.Field
          name="controlType"
          children={field => (
            <RadioGroup
              value={field.state.value}
              onValueChange={value =>
                field.setValue(DemandControlTypeSchema.parse(value))
              }
              defaultValue={DemandControlTypes.DAILY}
              className="gap-0"
            >
              <div className="flex items-center space-x-2 py-2">
                <RadioGroupItem
                  value={DemandControlTypes.DAILY}
                  id={DemandControlTypes.DAILY}
                />
                <Label htmlFor={DemandControlTypes.DAILY}>
                  {DemandControlTypeLabel[DemandControlTypes.DAILY]}
                </Label>
              </div>
              <div className="flex items-center space-x-2 py-2">
                <RadioGroupItem
                  value={DemandControlTypes.WHOLE_PERIOD}
                  id={DemandControlTypes.WHOLE_PERIOD}
                />
                <Label htmlFor={DemandControlTypes.WHOLE_PERIOD}>
                  {DemandControlTypeLabel[DemandControlTypes.WHOLE_PERIOD]}
                </Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>

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
