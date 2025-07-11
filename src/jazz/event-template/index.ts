import { co } from "jazz-tools";
import { EventTemplateSchema } from "./schema";
import { EventTemplateMigration } from "./migration";

export const EventTemplate = EventTemplateSchema.withMigration(coValue => {
  EventTemplateMigration.migrate(coValue);
});

export type EventTemplateType = co.loaded<typeof EventTemplateSchema>;
