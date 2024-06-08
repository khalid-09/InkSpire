"use client";

import { useState } from "react";
import BannerImage from "./banner-image";
import dynamic from "next/dynamic";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const RichTextEditor = dynamic(() => import("./rich-text-editor"), {
  ssr: false,
});

const BlogEditor = () => {
  const [image, setImage] = useState("/blog-banner.png");
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState("");

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
      <RichTextEditor setBlocks={setBlocks} initialContent={""} />
      <div className="flex w-full items-center justify-end gap-2">
        <Button variant="secondary">Save Draft</Button>
        <Button
          onClick={() => {
            console.log(image, title, blocks);
          }}
        >
          Publish
        </Button>
      </div>
    </section>
  );
};

export default BlogEditor;
