import { z, co } from "jazz-tools";

export const Workspace = co.map({
  name: z.string(),
  description: z.optional(z.string()),
  image: z.optional(co.image()),
});

export type Workspace = co.loaded<typeof Workspace>;
