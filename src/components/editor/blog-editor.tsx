"use client";

import { useState, useTransition } from "react";
import BannerImage from "./banner-image";
import dynamic from "next/dynamic";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createBlog } from "@/actions/blog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { BlogPosts } from "@prisma/client";
const RichTextEditor = dynamic(() => import("./rich-text-editor"), {
  ssr: false,
});

const BlogEditor = () => {
  const [image, setImage] = useState("/blog-banner.png");
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        await createBlog(title, blocks, image);
        toast.success("Blog created successfully");
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    });
  };

  return (
    <section className="mb-10  space-y-3">
      <main className="mt-10 flex flex-col items-center justify-between">
        <BannerImage image={image} setImage={setImage} />
      </main>
      <Input
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="h-20 px-4 text-4xl"
      />
      <RichTextEditor setBlocks={setBlocks} initialContent={blocks} />
      <div className="flex w-full items-center justify-end gap-2">
        <Button variant="secondary">Save Draft</Button>
        <Button disabled={isPending} onClick={handleClick}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Publishing" : "Publish"}
        </Button>
      </div>
    </section>
  );
};

export default BlogEditor;
