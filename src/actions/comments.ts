"use server";

import prisma from "@/db/db";
import { getSessionUser } from "@/lib/utils";
import { CommentSchema, commentSchema } from "@/lib/validation/blog";
import { revalidatePath } from "next/cache";

export const addComment = async (blogId: string, data: CommentSchema) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser)
    return { type: "error", message: "Login to Comment on a Post!" };

  const validatedComment = commentSchema.safeParse(data);

  if (!validatedComment.success) {
    return { type: "error", message: "Invalid Comment!" };
  }

  const { comment } = validatedComment.data;

  await prisma.comments.create({
    data: {
      blogPostId: blogId,
      userId: sessionUser.id!,
      content: comment,
      parentId: null,
    },
  }); // Add a parent comment

  await prisma.activity.update({
    where: {
      blogPostId: blogId,
    },
    data: {
      totalComments: {
        increment: 1,
      },
    },
  }); // Increment the totalComments count

  revalidatePath("/blog/[slug]", "page");

  return { type: "success", message: "Comment Added!" };
};

const deleteCommentsRecursive = async (id: string) => {
  const childComments = await prisma.comments.findMany({
    where: {
      parentId: id,
    },
  }); // Find all child comments

  for (const childComment of childComments) {
    await deleteCommentsRecursive(childComment.id);
  } // Recursively delete all child comments

  await prisma.comments.delete({
    where: {
      id: id,
    },
  });
}; // Delete the comment itself

export const deleteComment = async (formData: FormData) => {
  const commentId = formData.get("commentId") as string;

  const comment = await prisma.comments.findUnique({
    where: { id: commentId },
  });

  if (comment?.parentId === null) {
    await prisma.activity.update({
      where: {
        blogPostId: comment.blogPostId,
      },
      data: {
        totalComments: {
          decrement: 1,
        },
      },
    });
  } // If it's a parent comment, decrement the totalComments count

  await deleteCommentsRecursive(commentId);

  revalidatePath("/blog/[slug]", "page");
};

export const addReply = async (
  blogPostId: string,
  commentId: string,
  data: CommentSchema,
) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser)
    return { type: "error", message: "Login to Comment on a Post!" };

  const validatedComment = commentSchema.safeParse(data);

  if (!validatedComment.success) {
    return { type: "error", message: "Invalid Comment!" };
  }

  const { comment } = validatedComment.data;

  await prisma.comments.create({
    data: {
      content: comment,
      userId: sessionUser.id!,
      blogPostId,
      parentId: commentId,
    },
  }); // Add a reply for a parent comment

  revalidatePath("/blog/[slug]", "page");

  return { type: "success", message: "Reply Added!" };
};
