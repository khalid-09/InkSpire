import { z } from "zod";

export const blogFilterSchema = z.object({
  tag: z.string().optional(),
  title: z.string().optional(),
});

export type BlogFilterSchema = z.infer<typeof blogFilterSchema>;
