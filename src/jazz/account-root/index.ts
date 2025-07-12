import { co } from "jazz-tools";
import { AccountRootMigration } from "./migration";
import { AccountRootSchema } from "./schema";

export * from "./data";

export const AccountRoot = AccountRootSchema.withMigration(coValue => {
  AccountRootMigration.migrate(coValue);
});

export type AccountRootType = co.loaded<typeof AccountRootSchema>;
