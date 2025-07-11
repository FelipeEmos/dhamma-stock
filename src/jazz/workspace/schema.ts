import { co, z } from "jazz-tools";
import { EventTemplateSchema } from "../event-template/schema";

export const WorkspaceSchema = co.map({
  name: z.string(),
  image: z.optional(co.image()),
  location: z.optional(
    z.object({
      country: z.string(),
      state: z.string(),
    })
  ),
  eventTemplates: co.list(EventTemplateSchema),
});
