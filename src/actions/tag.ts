"use server";

import { redirect } from "next/navigation";

export const filterBlogByTag = async (formData: FormData) => {
  const tag = formData.get("tag");

  if (!tag) {
    throw new Error("Tag is required");
  }

  redirect(`/?tag=${tag.toString()}`);
};
