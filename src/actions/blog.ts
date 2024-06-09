"use server";

import prisma from "@/db/db";
import { getSessionUser } from "@/lib/utils";
import { redirect } from "next/navigation";

export const createBlog = async (
  title: string,
  blocks: string,
  image: string,
) => {
  const user = await getSessionUser();
  await prisma.blogPosts.create({
    data: {
      title,
      bannerImage: image,
      description: blocks,
      authorId: user?.id,
    },
  });
  redirect("/");
};
