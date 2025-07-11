import { EventTypeSchema } from "@/features/event-template/event-type";
import { CountingMethodSchema } from "@/lib/counting";
import { DurationUnitSchema } from "@/lib/duration";
import { z, co } from "jazz-tools";

export const EventTemplateSchema = co.map({
  name: z.string(),
  duration: z.object({
    value: z.number(),
    unit: DurationUnitSchema,
  }),
  countFrom: CountingMethodSchema,
  eventType: EventTypeSchema,
});
