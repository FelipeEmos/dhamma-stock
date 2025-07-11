import * as Jazz from "@/jazz";

export function useEventTemplateValidation(workspace: Jazz.WorkspaceType) {
  const validateName = (name: string, excludeId?: string) => {
    return !workspace.eventTemplates.some(
      template => template.name === name && template.id !== excludeId
    );
  };

  return { validateName };
}
