import { co } from "jazz-tools";
import { ProfileSchema } from "./schema";

export const Profile = ProfileSchema;

export type ProfileType = co.loaded<typeof ProfileSchema>;
