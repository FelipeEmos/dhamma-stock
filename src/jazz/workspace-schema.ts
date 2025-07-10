import { z, co } from "jazz-tools";

export const Workspace = co.map({
  name: z.string(),
  image: z.optional(co.image()),
  location: z.optional(
    z.object({
      country: z.string(),
      state: z.string(),
    })
  ),
});

export type Workspace = co.loaded<typeof Workspace>;
