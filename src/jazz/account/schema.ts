import { co } from "jazz-tools";
import { AccountRootSchema } from "../account-root/schema";
import { ProfileSchema } from "../profile/schema";

export const AccountSchema = co.account({
  profile: ProfileSchema,
  // Root is a pattern from jazz
  // everything there is "private" to the user by default
  root: AccountRootSchema,
});
