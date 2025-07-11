import { co } from "jazz-tools";
import { WorkspaceData } from "./data";
import { WorkspaceSchema } from "./schema";

export namespace WorkspaceMigration {
  export async function migrate(coValue: co.loaded<typeof WorkspaceSchema>) {
    const workspace = await coValue.ensureLoaded({
      resolve: {
        eventTemplates: {
          $each: true,
          $onError: null,
        },
      },
    });

    const skip = !!workspace.eventTemplates;
    if (skip) {
      return;
    }

    if (!workspace.eventTemplates) {
      workspace.eventTemplates = WorkspaceData.createNewEventTemplates(
        workspace._owner
      );
    }
  }
}
