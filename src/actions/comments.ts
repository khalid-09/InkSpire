"use server";

import prisma from "@/db/db";
import { getSessionUser } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const addComment = async (blogId: string, comment: string) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser)
    return { type: "error", message: "Login to Comment on a Post!" };

  await prisma.comments.create({
    data: {
      blogPostId: blogId,
      userId: sessionUser.id!,
      content: comment,
    },
  });

  revalidatePath("/blog/[slug]", "page");
  return { type: "success", message: "Comment Added!" };
};

export const deleteComment = async (formData: FormData) => {
  const commentId = formData.get("commentId");
  await prisma.comments.delete({
    where: {
      id: commentId as string,
    },
  });

  revalidatePath("/blog/[slug]", "page");
};
