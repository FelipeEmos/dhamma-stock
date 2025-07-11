import { co, z } from "jazz-tools";

export const ProfileSchema = co.profile({
  email: z.optional(z.string()),
  image: z.optional(co.image()),
});

export type ProfileType = co.loaded<typeof ProfileSchema>;
