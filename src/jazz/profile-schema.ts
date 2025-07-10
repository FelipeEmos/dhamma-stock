import { co, z } from "jazz-tools";

export const Profile = co.profile({
  email: z.optional(z.string()),
  image: z.optional(co.image()),
});

export type Profile = co.loaded<typeof Profile>;
