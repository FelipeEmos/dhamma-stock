import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrorInfos } from "@/features/form/field-error-infos";
import type { AnyFieldApi } from "@tanstack/react-form";
import * as React from "react";

interface FieldInputProps extends React.ComponentProps<"input"> {
  field: AnyFieldApi;
  label?: string;
}

export function InputField({ field, label, type, ...props }: FieldInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      field.handleChange(e.target.valueAsNumber);
    } else {
      field.handleChange(e.target.value);
    }
  };

  return (
    <div className="grid gap-2">
      {label && (
        <div className="flex items-center">
          <Label htmlFor={field.name}>{label}</Label>
        </div>
      )}
      <Input
        id={field.name}
        type={type}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={handleChange}
        {...props}
      />
      <FieldErrorInfos field={field} />
    </div>
  );
}
