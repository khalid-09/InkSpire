import { z } from "zod";

export const blogFilterSchema = z.object({
  tag: z.string().optional(),
  query: z.string().optional(),
});

export type BlogFilterSchema = z.infer<typeof blogFilterSchema>;
