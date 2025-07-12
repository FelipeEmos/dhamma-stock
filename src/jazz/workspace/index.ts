import { co } from "jazz-tools";
import { WorkspaceSchema } from "./schema";
import { WorkspaceMigration } from "./migration";
import { useCoState } from "jazz-tools/react";

export * from "./data";

export const Workspace = WorkspaceSchema.withMigration(coValue => {
  WorkspaceMigration.migrate(coValue);
});

export type WorkspaceShallowType = co.loaded<typeof WorkspaceSchema>;
export type WorkspaceType = co.loaded<
  typeof WorkspaceSchema,
  {
    eventTemplates: {
      $each: {
        demands: {
          $each: true;
        };
      };
    };
  }
>;

export function useWorkspace(id: string) {
  return useCoState(Workspace, id, {
    resolve: {
      eventTemplates: {
        $each: {
          demands: {
            $each: true,
          },
        },
      },
    },
  });
}
