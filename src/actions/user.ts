"use server";

import prisma from "@/db/db";
import { getUserById } from "@/lib/data/user";
import { getSessionUser } from "@/lib/utils";
import {
  EditProfileSchema,
  editProfileSchema,
} from "@/lib/validation/edit-profile";
import { revalidatePath } from "next/cache";

export const updateImage = async (image: string) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return { message: "You are not logged in", type: "error" };

  const user = await getUserById(sessionUser.id!);

  if (!user) return { message: "User not found", type: "error" };

  await prisma.user.update({
    where: { id: sessionUser.id! },
    data: {
      image,
    },
  });

  revalidatePath("/");
  revalidatePath("/settings/edit-profile");

  return { message: "Image updated successfully", type: "success" };
};

export const editProfile = async (data: EditProfileSchema) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return { message: "You are not logged in", type: "error" };

  const validatedData = editProfileSchema.safeParse(data);

  if (!validatedData.success)
    return { message: "Not valid fields", type: "error" };

  const {
    username,
    bio,
    youtubeLink,
    fbLink,
    githubLink,
    personalLink,
    twitterLink,
    instaLink,
  } = validatedData.data;

  const user = await getUserById(sessionUser.id!);

  if (!user) return { message: "User not found", type: "error" };

  const userWithUsernameExists = await prisma.user.findFirst({
    where: { username },
    select: { id: true },
  });

  if (userWithUsernameExists && userWithUsernameExists.id !== sessionUser.id)
    return { message: "Username is taken...enter another", type: "error" };

  const updatedUser = await prisma.user.update({
    where: { id: sessionUser.id! },
    data: {
      username,
      bio,
      socialLinks: {
        updateMany: {
          where: { userSocialLinkId: sessionUser.id },
          data: {
            youtube: youtubeLink,
            facebook: fbLink,
            github: githubLink,
            website: personalLink,
            twitter: twitterLink,
            instagram: instaLink,
          },
        },
      },
    },
    include: { socialLinks: true },
  });

  revalidatePath("/");
  revalidatePath("/settings/edit-profile");

  return {
    message: "Profile updated successfully",
    type: "success",
    updatedUser: updatedUser,
  };
};
