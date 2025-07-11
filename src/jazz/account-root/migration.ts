import { co, Group } from "jazz-tools";
import { AccountRootSchema } from "./schema";
import { AccountRootData } from "./data";

export namespace AccountRootMigration {
  export async function migrate(coValue: co.loaded<typeof AccountRootSchema>) {
    const root = await coValue.ensureLoaded({
      resolve: {
        workspaces: {
          $each: true,
          $onError: null,
        },
      },
    });
    const skip = !!root.workspaces;
    if (skip) {
      return;
    }

    const userPrivateGroup = Group.create();
    if (!root.workspaces) {
      root.workspaces = AccountRootData.createNewWorkspaces(userPrivateGroup);
    }
  }
}
