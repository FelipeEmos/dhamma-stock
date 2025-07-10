import { AccountInternal } from "./account-internal-schema";
import { migration } from "./_migration";
import { co } from "jazz-tools";

export const Account = AccountInternal.withMigration(migration);

export type Account = co.loaded<typeof Account>;
