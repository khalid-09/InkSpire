"use server";

import prisma from "@/db/db";
import { getSessionUser } from "@/lib/utils";
import { BlogSchema, blogSchema } from "@/lib/validation/blog";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const saveDraft = async (
  title: string,
  blocks: string,
  image: string,
) => {
  const user = await getSessionUser();
  await prisma.blogPosts.create({
    data: {
      title,
      content: blocks,
      bannerImage: image,
      authorId: user?.id,
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

  const user = await getSessionUser();

  await prisma.blogPosts.create({
    data: {
      title,
      description,
      tags,
      bannerImage: image,
      content: blocks,
      authorId: user?.id,
      draft: false,
    },
  });
  await prisma.user.update({
    where: {
      id: user?.id,
    },
    data: {
      totalPosts: {
        increment: 1,
      },
    },
  });

  revalidatePath("/");
  redirect("/");
};
