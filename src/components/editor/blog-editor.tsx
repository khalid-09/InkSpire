"use client";

import { useState, useTransition } from "react";
import BannerImage from "./banner-image";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { createBlog } from "@/actions/blog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Loading from "@/app/blog/loading";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
const RichTextEditor = dynamic(() => import("./rich-text-editor"), {
  ssr: false,
  loading: () => <Loading />,
});

const BlogEditor = ({ blog }: { blog: string }) => {
  const str =
    '[{"id":"a2dd441b-b278-473b-9112-1619c1fe2c0c","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":2},"content":[{"type":"text","text":"Luffy is the main character of the One Piece world","styles":{}}],"children":[]},{"id":"1253a3cc-0cbd-4ff9-885c-a61815687a38","type":"image","props":{"backgroundColor":"default","textAlignment":"left","name":"1330515.jpg","url":"https://utfs.io/f/661da010-e86e-408b-8a3f-b61060f48f58-xujdfe.jpg","caption":"","showPreview":true,"previewWidth":512},"children":[]},{"id":"8b2a7134-6700-4b84-8162-63e722595c08","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}]';

  let modifiedString = blog.slice(1, -1);

  // Step 2: Replace escaped double quotes with actual double quotes
  modifiedString = modifiedString.replace(/\\"/g, '"');

  const [image, setImage] = useState("/blog-banner.png");
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState(modifiedString);
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
      <Textarea
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="focus-visible:ring-non w-f ull mt-10 h-20 resize-none border-none text-4xl font-medium leading-tight shadow-none outline-none placeholder:opacity-40 focus-visible:outline-none focus-visible:ring-0"
      />
      {/* <Separator /> */}
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
