import { co } from "jazz-tools";
import { EventTemplateMigration } from "./migration";
import { EventTemplateSchema } from "./schema";
import { useCoState } from "jazz-tools/react";

export * from "./data";

export const EventTemplate = EventTemplateSchema.withMigration(coValue => {
  EventTemplateMigration.migrate(coValue);
});

export type EventTemplateType = co.loaded<
  typeof EventTemplateSchema,
  {
    demands: {
      $each: true;
    };
  }
>;
export type EventTemplateShallowType = co.loaded<typeof EventTemplateSchema>;

export function useEventTemplate(id: string) {
  return useCoState(EventTemplate, id, {
    resolve: {
      demands: {
        $each: true,
      },
    },
  });
}
