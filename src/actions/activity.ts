"use server";

import prisma from "@/db/db";
import { getSessionUser } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const addLikes = async (blogId: string) => {
  const user = await getSessionUser();
  if (!user) throw new Error("User not found");

  const { id: userId } = user;

  // * Increment the totalLikes count by 1
  await prisma.activity.update({
    where: { blogPostId: blogId },
    data: {
      totalLikes: {
        increment: 1,
      },
    },
  });

  // * Create a new like record between the user and the blog post
  await prisma.like.create({
    data: {
      userId: userId!,
      blogPostId: blogId,
    },
  });

  revalidatePath("/");
};

export const removeLike = async (blogId: string) => {
  const user = await getSessionUser();
  if (!user) throw new Error("User not found");

  const { id: userId } = user;

  // * Decrement the totalLikes count by 1
  await prisma.activity.update({
    where: { blogPostId: blogId },
    data: {
      totalLikes: {
        decrement: 1,
      },
    },
  });

  // * Remove the like record between the user and the blog post
  await prisma.like.delete({
    where: {
      userId_blogPostId: {
        userId: userId!,
        blogPostId: blogId,
      },
    },
  });

  revalidatePath("/");
};

export const checkIfUserLiked = async (blogId: string) => {
  const user = await getSessionUser();
  if (!user) return;

  const { id: userId } = user;

  // * Check if the user has liked the blog post
  const like = await prisma.like.findUnique({
    where: {
      userId_blogPostId: {
        userId: userId!,
        blogPostId: blogId,
      },
    },
  });

  return like !== null;
};
