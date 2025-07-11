import { co, Group } from "jazz-tools";
import { AccountRootData } from "../account-root/data";
import { AccountSchema } from "./schema";

export namespace AccountMigration {
  export async function migrate(coValue: co.loaded<typeof AccountSchema>) {
    const account = await coValue.ensureLoaded({ resolve: {} });

    const skip = !!account.root;
    if (skip) {
      return;
    }

    const userPrivateGroup = Group.create();
    if (!account.root) {
      account.root = AccountRootData.createNew(userPrivateGroup);
    }
  }
}
