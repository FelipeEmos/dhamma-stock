import { CreateEventTemplateButton } from "@/features/event-template/components/create-event-template-button";
import { EventTemplateItem } from "@/features/event-template/components/event-template-item";
import { getWorkspacePermissions } from "@/features/workspace/lib/permissions";
import * as Jazz from "@/jazz";

interface EventTemplateListProps {
  workspace: Jazz.WorkspaceType;
}

export function EventTemplateList({ workspace }: EventTemplateListProps) {
  const { canManage } = getWorkspacePermissions(workspace);

  // Sort templates by order
  const sortedTemplates = workspace.eventTemplates
    .slice()
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {sortedTemplates.map(template => (
          <EventTemplateItem
            key={template.id}
            template={template}
            canManage={canManage}
          />
        ))}

        {sortedTemplates.length === 0 && (
          <div className="text-muted-foreground py-8 text-center">
            Nenhum evento criado ainda
          </div>
        )}
      </div>

      {canManage && <CreateEventTemplateButton workspace={workspace} />}
    </div>
  );
}
