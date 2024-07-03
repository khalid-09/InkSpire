import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/utils";

import CreateNewBlog from "@/components/blog/create-new-blog";

export const metadata: Metadata = {
  title: "Write a new blog post",
  description:
    "Write a new blog post with an interactive editor with images and captions or lists or code snippets and many more..! Add tags and publish your blog post.",
};

const NewBlogPage = async () => {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  return (
    <>
      <CreateNewBlog location="create" />
    </>
  );
};

export default NewBlogPage;
