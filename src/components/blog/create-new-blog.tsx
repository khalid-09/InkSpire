"use client";

import { BlogContextProvider } from "@/context/blog-context";
import { useState } from "react";
import BlogEditor from "./editor/blog-editor";
import AnimationWrapper from "../animation-wrapper";
import PublishBlog from "./publish/publish-blog";
import { BlogPosts } from "@prisma/client";

interface CreateNewBlogProps {
  blog?: BlogPosts;
  location: "edit" | "create";
}

const CreateNewBlog = ({ blog, location }: CreateNewBlogProps) => {
  const [type, setType] = useState<"editor" | "publish">("editor");

  return (
    <BlogContextProvider>
      {type === "editor" ? (
        <AnimationWrapper>
          <BlogEditor location={location} blog={blog} setType={setType} />
        </AnimationWrapper>
      ) : (
        <AnimationWrapper>
          <PublishBlog slug={blog?.slug} location={location} />
        </AnimationWrapper>
      )}
    </BlogContextProvider>
  );
};

export default CreateNewBlog;
