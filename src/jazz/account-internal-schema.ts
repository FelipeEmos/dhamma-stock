import { co, z } from "jazz-tools";
import { AccountRoot } from "./account-root-schema";

export const AccountInternal = co.account({
  profile: co.profile({
    email: z.optional(z.string()),
    image: z.optional(co.image()),
  }),
  // Root is a pattern from jazz
  // everything there is "private" to the user by default
  root: AccountRoot,
});
