import { co } from "jazz-tools";
import { WorkspaceSchema } from "./schema";
import { WorkspaceMigration } from "./migration";

export const Workspace = WorkspaceSchema.withMigration(coValue => {
  WorkspaceMigration.migrate(coValue);
});

export type WorkspaceType = co.loaded<
  typeof WorkspaceSchema,
  {
    eventTemplates: { $each: true };
  }
>;

export type WorkspaceShallowType = co.loaded<typeof WorkspaceSchema>;
