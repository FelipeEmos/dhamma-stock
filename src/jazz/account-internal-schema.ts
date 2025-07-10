import { co } from "jazz-tools";
import { AccountRoot } from "./account-root-schema";
import { Profile } from "./profile-schema";

export const AccountInternal = co.account({
  profile: Profile,
  // Root is a pattern from jazz
  // everything there is "private" to the user by default
  root: AccountRoot,
});

export type AccountInternal = co.loaded<typeof AccountInternal>;
