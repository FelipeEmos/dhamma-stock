import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEventTemplateValidation } from "@/features/event-template/hooks/use-event-template-validation";
import { InputField } from "@/features/form/input-field";
import * as Jazz from "@/jazz";
import { CountingMethods, CountingMethodSchema } from "@/lib/counting";
import {
  DurationUnitLabel,
  DurationUnits,
  DurationUnitSchema,
} from "@/lib/duration";
import { useForm } from "@tanstack/react-form";
import { z } from "jazz-tools";
import { EventTypeLabel, EventTypes, EventTypeSchema } from "../event-type";

const eventTemplateSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  duration: z.object({
    value: z.number(),
    unit: DurationUnitSchema,
  }),
  countFrom: CountingMethodSchema,
  eventType: EventTypeSchema,
});

export type EventTemplateFormData = z.infer<typeof eventTemplateSchema>;

interface EventTemplateFormProps {
  workspace: Jazz.WorkspaceType;
  defaultValues?: Partial<EventTemplateFormData>;
  onSubmit: (data: EventTemplateFormData) => void | Promise<void>;
  onCancel?: () => void;
  editingTemplateId?: string;
}

const defaultValues: EventTemplateFormData = {
  name: "",
  duration: {
    value: 10,
    unit: "days",
  },
  countFrom: "zero-first",
  eventType: "course",
};

export function EventTemplateForm({
  workspace,
  defaultValues: _defaultValues,
  onSubmit,
  onCancel,
  editingTemplateId,
}: EventTemplateFormProps) {
  const { validateName } = useEventTemplateValidation(workspace);

  const form = useForm({
    defaultValues: {
      ...defaultValues,
      ..._defaultValues,
    },
    validators: {
      onChange: eventTemplateSchema,
      onSubmitAsync: async ({ value }) => {
        if (!validateName(value.name, editingTemplateId)) {
          return {
            fields: {
              name: "Já existe um evento com este nome",
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

      <div className="space-y-2">
        <Label>Duração</Label>
        <div className="flex gap-2">
          <form.Field
            name="duration.value"
            children={field => (
              <InputField
                field={field}
                type="number"
                label=""
                className="flex-1"
              />
            )}
          />
          <form.Field
            name="duration.unit"
            children={field => (
              <Select
                value={field.state.value}
                onValueChange={value =>
                  field.setValue(DurationUnitSchema.parse(value))
                }
                defaultValue={DurationUnits.DAYS}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(DurationUnits).map(unit => (
                    <SelectItem key={unit} value={unit}>
                      {DurationUnitLabel[unit]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Contar a partir</Label>
        <form.Field
          name="countFrom"
          children={field => (
            <RadioGroup
              value={field.state.value}
              onValueChange={value =>
                field.setValue(CountingMethodSchema.parse(value))
              }
              defaultValue={CountingMethods.ZERO_FIRST}
              className="gap-0"
            >
              <div className="flex items-center space-x-2 py-2">
                <RadioGroupItem
                  value={CountingMethods.ZERO_FIRST}
                  id={CountingMethods.ZERO_FIRST}
                />
                <Label htmlFor={CountingMethods.ZERO_FIRST}>
                  Do dia zero:{" "}
                  <span className="text-primary">
                    (<span className="font-bold">D0</span>, D1, D2 ...)
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 py-2">
                <RadioGroupItem
                  value={CountingMethods.ONE_FIRST}
                  id={CountingMethods.ONE_FIRST}
                />
                <Label htmlFor={CountingMethods.ONE_FIRST}>
                  Do dia um:{" "}
                  <span className="text-primary">
                    (<span className="font-bold">D1</span>, D2, D3 ...)
                  </span>
                </Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>

      <div className="space-y-3">
        <Label>Tipo do Evento</Label>
        <form.Field
          name="eventType"
          children={field => (
            <RadioGroup
              value={field.state.value}
              onValueChange={value =>
                field.setValue(EventTypeSchema.parse(value))
              }
              defaultValue={EventTypes.COURSE}
              className="gap-0"
            >
              {Object.values(EventTypes).map(eventType => (
                <div
                  key={eventType}
                  className="flex w-full items-center space-x-2 py-2"
                >
                  <RadioGroupItem value={eventType} id={eventType} />
                  <Label className="w-full" htmlFor={eventType}>
                    {EventTypeLabel[eventType]}
                  </Label>
                </div>
              ))}
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
