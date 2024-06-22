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

  youtubeLink: z.string().url({ message: "Please enter a url" }).optional(),
  instaLink: z.string().url({ message: "Please enter a url" }).optional(),
  fbLink: z.string().url({ message: "Please enter a url" }).optional(),
  githubLink: z.string().url({ message: "Please enter a url" }).optional(),
  personalLink: z.string().url({ message: "Please enter a url" }).optional(),
  twitterLink: z.string().url({ message: "Please enter a url" }).optional(),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
