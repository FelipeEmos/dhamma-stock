import { co, Group } from "jazz-tools";
import { AccountRootData } from "../account-root/data";
import { AccountSchema } from "./schema";

export namespace AccountMigration {
  export async function migrate(coValue: co.loaded<typeof AccountSchema>) {
    // First try to load with root resolution
    const account = await coValue.ensureLoaded({
      resolve: {
        root: {
          workspaces: {
            $each: true,
            $onError: null,
          },
        },
      },
    });

    // If root exists, skip migration
    if (account.root) {
      console.log("✅ [AccountMigration] Skipping - root already exists");
      return;
    }

    const userPrivateGroup = Group.create();
    account.root = AccountRootData.createNew(userPrivateGroup);
    console.log("🆕 [AccountMigration] Created new root with empty workspaces");
  }
}
