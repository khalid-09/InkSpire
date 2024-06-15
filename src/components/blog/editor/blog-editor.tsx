"use client";

import { Dispatch, SetStateAction, useTransition } from "react";
import dynamic from "next/dynamic";
import { useBlog } from "@/context/blog-context";
import { saveDraft } from "@/actions/blog";

import BlogTitle from "./blog-title";
import BannerImage from "./banner-image";

import { Button } from "../../ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const RichTextEditor = dynamic(() => import("./rich-text-editor"), {
  ssr: false,
});

interface BlogEditorProps {
  setType: Dispatch<SetStateAction<"editor" | "publish">>;
}

const BlogEditor = ({ setType }: BlogEditorProps) => {
  const [isPending, startTransition] = useTransition();
  const { blog } = useBlog();

  const handleDraft = () => {
    if (!blog.title) return toast.error("Please add a title to save the draft");

    startTransition(async () => {
      try {
        await saveDraft(blog.title, blog.blocks, blog.image);
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
    <section className="my-10 flex w-full flex-col space-y-3">
      <BannerImage />
      <BlogTitle />
      <RichTextEditor content={blog.blocks} editable={true} />
      <div className="flex w-full items-center justify-end gap-2">
        <Button onClick={handleDraft} variant="secondary">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Saving Draft" : "Save Draft"}
        </Button>
        <Button disabled={isPending} onClick={handlePublish}>
          Publish
        </Button>
      </div>
    </section>
  );
};

export default BlogEditor;
