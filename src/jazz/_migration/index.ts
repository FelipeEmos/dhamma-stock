import { Loaded } from "jazz-tools";
import { AccountInternal } from "../account-internal-schema";
import { migrateRoot } from "./migrate-root";

export async function migration(account: Loaded<typeof AccountInternal>) {
  console.log("🚀🤔 Try account migration if necessary for:", account.id);

  try {
    console.log("👤 Profile migration skipped (handled by Clerk)");

    await migrateRoot(account);

    console.log("🎉 Account migration skipped or completed successfully");
  } catch (error) {
    console.error("❌ Account migration failed:", error);
    throw error;
  }
}
