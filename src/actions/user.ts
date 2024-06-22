"use server";

import prisma from "@/db/db";
import { getUserById } from "@/lib/data/user";
import { getSessionUser } from "@/lib/utils";
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
