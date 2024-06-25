import { z } from "zod";

export const editProfileSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username should be more than 3 characters long" })
    .max(30, { message: "Username should be less than 30 characters long" })
    .optional(),

  bio: z
    .string()
    .max(200, { message: "Bio should be less than 200 characters long" })
    .optional(),

  youtubeLink: z.string().url().or(z.literal("")).optional(),
  instaLink: z.string().url().or(z.literal("")).optional(),
  fbLink: z.string().url().or(z.literal("")).optional(),
  githubLink: z.string().url().or(z.literal("")).optional(),
  personalLink: z.string().url().or(z.literal("")).optional(),
  twitterLink: z.string().url().or(z.literal("")).optional(),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
