"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const BlogEditor = () => {
  const [content, setContent] = useState<string>("");

  return (
    <main className="relative mt-10 flex h-96 flex-col items-center justify-between overflow-hidden rounded-lg">
      {content ? (
        <Image
          src={content}
          alt="Uploaded image"
          className="absolute  object-cover"
          fill
        />
      ) : (
        <UploadDropzone
          className="h-full w-full space-y-6 border dark:border-muted"
          appearance={{
            label:
              "text-muted-foreground hover:text-muted-foreground text-base",
            uploadIcon: "text-primary ",
            allowedContent: "text-base text-muted-foreground",
            button:
              "bg-muted-foreground dark:text-background text-base font-semibold",
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res.at(0)?.url);
            setContent(res.at(0)?.url!);
            toast.success("Image uploaded successfully");
          }}
          onUploadError={(error: Error) => {
            toast.error(error.message);
          }}
        />
      )}
      <p>Test</p>
    </main>
  );
};

export default BlogEditor;
