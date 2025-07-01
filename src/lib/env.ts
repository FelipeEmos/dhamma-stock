import { z } from "zod";

const envSchema = z.object({
  VITE_JAZZ_API_KEY: z.string(),
  VITE_CLERK_PUBLISHABLE_KEY: z.string(),
});

const parse = envSchema.safeParse(import.meta.env);
if (!parse.success) {
  console.error("Invalid environment variables:", parse.error);
  throw new Error("Invalid environment variables");
}
export const env = parse.data;
