"use server";

import { redirect } from "next/navigation";

export const filterBlogByTag = (formData: FormData) => {
  const tag = formData.get("tag");
  if (!tag) throw new Error("Tag is required");

  redirect(`/?tag=${tag.toString()}`);
};

export const loadMoreBlogs = (username: string, formData: FormData) => {
  const page = formData.get("page");
  if (!page) throw new Error("Page is required");

  redirect(`/user/${username}?page=${page.toString()}`);
};