import type { AnyFieldApi } from "@tanstack/react-form";
import type { ZodIssue } from "zod";

export function FieldErrorInfos({ field }: { field: AnyFieldApi }) {
  if (
    field.form.state.submissionAttempts <= 0 ||
    !field.state.meta.isTouched ||
    !field.state.meta.errors.length
  ) {
    return null;
  }

  return (
    <>
      {(field.state.meta.errors as ZodIssue[]).map(e => (
        <p className="text-destructive text-sm" key={e.message}>
          {e.message}
        </p>
      ))}
    </>
  );
}
