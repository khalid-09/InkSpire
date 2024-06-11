"use client";

import { BlogContextProvider } from "@/context/blog-context";
import { useState } from "react";
import BlogEditor from "./editor/blog-editor";
import AnimationWrapper from "../animation-wrapper";
import PublishBlog from "./publish/publish-blog";

const CreateNewBlog = () => {
  const [type, setType] = useState<"editor" | "publish">("editor");

  return (
    <BlogContextProvider>
      {type === "editor" ? (
        <AnimationWrapper>
          <BlogEditor setType={setType} />
        </AnimationWrapper>
      ) : (
        <AnimationWrapper>
          <PublishBlog setType={setType} />
        </AnimationWrapper>
      )}
    </BlogContextProvider>
  );
};

export default CreateNewBlog;
