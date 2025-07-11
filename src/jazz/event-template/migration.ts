import { co } from "jazz-tools";
import { EventTemplateSchema } from "./schema";

export namespace EventTemplateMigration {
  export async function migrate(
    _coValue: co.loaded<typeof EventTemplateSchema>
  ) {
    //TODO
  }
}
