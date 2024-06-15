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
  const slug = `${toSlug(title)}-${nanoid(10)}`;
  await prisma.blogPosts.create({
    data: {
      title,
      content: blocks,
      bannerImage: image,
      authorId: user?.id,
      slug,
      draft: true,
    },
  });
  redirect("/");
};

export const createBlog = async (blog: BlogSchema) => {
  const validatedFields = blogSchema.safeParse(blog);

  if (!validatedFields.success)
    return {
      message: "Something went wrong, Try again later!",
      reason: validatedFields.error.message,
      type: "error",
    };

  const { tags, title, blocks, description, image } = validatedFields.data;

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  const user = await getSessionUser();

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

  const { id: blogId } = createdBlog;

  await prisma.activity.create({
    data: {
      blogPostId: blogId,
    },
  });

  await prisma.comments.create({
    data: {
      blogId,
      blogAuthorId: authorId!,
    },
  });

  revalidatePath("/");
  redirect("/");
};
