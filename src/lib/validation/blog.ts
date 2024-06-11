import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(5, { message: "Title should be atleast 5 characters long" }),
  image: z.string({ required_error: "Image is required" }),
  blocks: z.string({ required_error: "Content is required" }),
  tags: z.array(z.string()),
  description: z
    .string({ required_error: "Description is required" })
    .min(10, { message: "Description should be atleast 10 characters long" })
    .max(200, { message: "Description should be atmost 200 characters long" }),
});

export type BlogSchema = z.infer<typeof blogSchema>;
