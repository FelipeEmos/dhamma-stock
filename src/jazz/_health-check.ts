import { co } from "jazz-tools";
import { MigrationHealthCheckError } from "./_errors.ts";
import { AccountSchema } from "./account/schema";

export async function healthCheck(account: co.loaded<typeof AccountSchema>) {
  const { root } = await account.ensureLoaded({
    resolve: {
      root: {
        workspaces: {
          $onError: null,
          $each: {
            eventTemplates: {
              $each: true,
              $onError: null,
            },
          },
        },
      },
    },
  });

  if (!root) {
    throw new MigrationHealthCheckError("Failed to create or load root");
  }
  if (!root.workspaces) {
    throw new MigrationHealthCheckError("Failed to create or load workspaces");
  }
  if (!root.workspaces.some(w => !w.eventTemplates)) {
    throw new MigrationHealthCheckError(
      "Failed to create or load workspace eventTemplates"
    );
  }
}
