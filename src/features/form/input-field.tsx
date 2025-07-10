import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrorInfos } from "@/features/form/field-error-infos";
import type { AnyFieldApi } from "@tanstack/react-form";
import type { ComponentProps } from "react";

interface FieldInputProps extends ComponentProps<"input"> {
  field: AnyFieldApi;
  label?: string;
}

export function InputField({ field, label, ...props }: FieldInputProps) {
  return (
    <div className="grid gap-2">
      {label && (
        <div className="flex items-center">
          <Label htmlFor={field.name}>{label}</Label>
        </div>
      )}
      <Input
        id={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.value)}
        {...props}
      />
      <FieldErrorInfos field={field} />
    </div>
  );
}
