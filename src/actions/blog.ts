"use server";

import prisma from "@/db/db";
import { getSessionUser, toSlug } from "@/lib/utils";
import { BlogSchema, blogSchema } from "@/lib/validation/blog";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const saveDraft = async (
  title: string,
  blocks: string,
  image: string,
) => {
  const user = await getSessionUser();

  if (!user)
    return {
      message: "User not found, Login or SignUp to continue!",
      reason: "User not found",
      type: "error",
    };

  const slug = `${toSlug(title)}-${nanoid(10)}`;
  await prisma.blogPosts.create({
    data: {
      title,
      content: blocks,
      bannerImage: image,
      authorId: user.id,
      slug,
      draft: true,
    },
  });
  redirect("/");
};

export const createBlog = async (blog: BlogSchema) => {
  const user = await getSessionUser();

  if (!user)
    return {
      message: "User not found, Login or SignUp to continue!",
      reason: "User not found",
      type: "error",
    };

  const validatedFields = blogSchema.safeParse(blog);

  if (!validatedFields.success)
    return {
      message: "Something went wrong, Try again later!",
      reason: validatedFields.error.message,
      type: "error",
    };

  const { tags, title, blocks, description, image } = validatedFields.data;

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  const { id: authorId } = user;

  const createdBlog = await prisma.blogPosts.create({
    data: {
      title,
      description,
      tags,
      bannerImage: image,
      content: blocks,
      authorId,
      slug,
      draft: false,
    },
  });

  await prisma.user.update({
    where: {
      id: authorId,
    },
    data: {
      totalPosts: {
        increment: 1,
      },
    },
  });

  const { id: blogPostId } = createdBlog;

  await prisma.activity.create({
    data: {
      blogPostId,
    },
  });

  // await prisma.comments.create({
  //   data: {
  //     blogId,
  //     blogAuthorId: authorId!,
  //   },
  // });

  revalidatePath("/");
  redirect("/");
};

export const deleteBlog = async (
  id: string,
  activityId: string,
  authorId: string,
) => {
  await prisma.blogPosts.delete({
    where: {
      id,
    },
  });

  await prisma.user.update({
    where: {
      id: authorId,
    },
    data: {
      totalPosts: {
        decrement: 1,
      },
    },
  });

  await prisma.activity.delete({
    where: {
      id: activityId,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/blogs");
};

export const editBlog = async (slug: string, blog: BlogSchema) => {
  const user = await getSessionUser();

  if (!user)
    return {
      message: "User not found, Login or SignUp to continue!",
      reason: "User not found",
      type: "error",
    };

  const validatedFields = blogSchema.safeParse(blog);

  if (!validatedFields.success)
    return {
      message: "Something went wrong, Try again later!",
      reason: validatedFields.error.message,
      type: "error",
    };

  const { tags, title, blocks, description, image } = validatedFields.data;

  await prisma.blogPosts.update({
    where: {
      slug,
    },
    data: {
      title,
      description,
      content: blocks,
      bannerImage: image,
      tags,
    },
  });

  revalidatePath("/");
  redirect("/");
};
