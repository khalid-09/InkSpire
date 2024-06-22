"use client";

import { Dispatch, SetStateAction, useEffect, useTransition } from "react";
import { useBlog } from "@/context/blog-context";
import { saveDraft } from "@/actions/blog";
import { BlogPosts } from "@prisma/client";

import BlogTitle from "./blog-title";
import BannerImage from "./banner-image";
import NewEditor from "./editor";

import { Button } from "../../ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface BlogEditorProps {
  setType: Dispatch<SetStateAction<"editor" | "publish">>;
  blog?: BlogPosts;
  location: "edit" | "create";
}

const BlogEditor = ({ setType, blog: blogPost, location }: BlogEditorProps) => {
  const [isPending, startTransition] = useTransition();
  const { blog, setBlog } = useBlog();

  useEffect(() => {
    if (blogPost) {
      setBlog({
        tags: blogPost.tags,
        blocks: blogPost.content,
        title: blogPost.title,
        image: blogPost.bannerImage,
        description: blogPost.description,
      });
    }
  }, [blogPost, setBlog]);

  const handleDraft = () => {
    if (!blog.title) return toast.error("Please add a title to save the draft");

    startTransition(async () => {
      try {
        const response = await saveDraft(blog.title, blog.blocks, blog.image);

        if (response) {
          toast.error(response.message);
          console.error(response.reason);
          return;
        }

        toast.success("Draft Saved successfully");
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    });
  };

  const handlePublish = () => {
    if (!blog.image)
      return toast.error("Please add a banner image to publish the blog");
    if (!blog.title)
      return toast.error("Please add a title to publish the blog");
    if (!blog.blocks)
      return toast.error("Please add some content to publish the blog");

    setType("publish");
  };

  return (
    <section className="my-10  flex w-full flex-col space-y-3">
      <BannerImage />
      <BlogTitle />
      <NewEditor data={blogPost ? blogPost.content : undefined} />
      <div className="flex w-full items-center justify-end gap-2">
        {location === "create" && (
          <Button onClick={handleDraft} variant="secondary">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Saving Draft" : "Save Draft"}
          </Button>
        )}
        <Button disabled={isPending} onClick={handlePublish}>
          {location === "create" ? " Publish" : "Update"}
        </Button>
      </div>
    </section>
  );
};

export default BlogEditor;
