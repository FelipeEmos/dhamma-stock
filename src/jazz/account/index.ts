import { co } from "jazz-tools";
import { AccountMigration } from "./migration";
import { AccountSchema } from "./schema";

export const Account = AccountSchema.withMigration(coValue => {
  AccountMigration.migrate(coValue);
});

export type AccountType = co.loaded<typeof AccountSchema>;
