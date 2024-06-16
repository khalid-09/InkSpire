"use client";

import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useBlog } from "@/context/blog-context";
import { BlogSchema } from "@/lib/validation/blog";
import { createBlog } from "@/actions/blog";
import Image from "next/image";

import RichTextEditor from "../editor/rich-text-editor";
import { H4, P } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Cross1Icon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PublishBlogProps {
  setType: Dispatch<SetStateAction<"editor" | "publish">>;
}

const wordLimit = 200;

const PublishBlog = ({ setType }: PublishBlogProps) => {
  const {
    blog,
    blog: { title, tags, image, blocks, description },
    setBlog,
  } = useBlog();
  const [newTag, setNewTag] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    setType("editor");
  };

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setBlog((blog) => ({ ...blog, tags: [...blog.tags, newTag] }));
    }
    setNewTag("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      tags: prevBlog.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handlePublish = (blog: BlogSchema) => {
    // TODO : VALIDATE ALL THE FIELDS
    startTransition(async () => {
      try {
        const response = await createBlog(blog);

        if (response) {
          toast.error(response.message);
          console.error(response.reason);
          return;
        }

        toast.success("Blog created Successfully!");
      } catch (err) {
        console.log(err);
        if (err instanceof Error) toast.error(err.message);
      }
    });
  };

  return (
    <>
      <div className="mb-4 mt-10 flex w-full items-center justify-between">
        <H4>Preview</H4>
        <Cross1Icon className="h-6 w-6 cursor-pointer" onClick={handleClose} />
      </div>
      <div className="mb-4 flex flex-col gap-4 md:flex-row">
        <section className="flex w-full flex-1 flex-col space-y-4 md:w-3/5">
          <div className="relative h-96 overflow-hidden rounded-md">
            <Image
              src={image}
              alt="Blog-Banner-Image"
              fill
              className="absolute border object-cover"
              sizes="(min-width: 808px) 50vw, 100vw"
            />
          </div>
          <Card className="flex flex-grow flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription>
                <P>{description ? description : "📜Description📜"}</P>
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
        <section className="flex w-full flex-1 flex-col md:w-2/5">
          <Card className="flex flex-grow flex-col">
            <CardHeader>
              <Label className="mb-2 text-base">Blog Title</Label>
              <CardTitle>
                <Input
                  disabled={isPending}
                  className="bg-muted px-4 py-6 text-xl dark:bg-background"
                  value={blog.title}
                  onChange={(e) =>
                    setBlog((blog) => ({ ...blog, title: e.target.value }))
                  }
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label className="text-base">
                Short Description about your post
              </Label>
              <Textarea
                disabled={isPending}
                className="mt-2 min-h-28 resize-none bg-muted dark:bg-background"
                maxLength={200}
                value={description}
                onChange={(e) =>
                  setBlog((blog) => ({ ...blog, description: e.target.value }))
                }
              />
              <span className="mt-1 flex justify-end text-sm text-muted-foreground">
                {wordLimit - description.length} characters left
              </span>
            </CardContent>
            <CardContent>
              <Label className="text-base">
                Topics -{" "}
                <span className="text-sm text-muted-foreground">
                  ( Helps in searching and ranking your post )
                </span>
              </Label>
              <div className="relative mt-2 rounded-sm bg-muted px-3 py-3">
                <Input
                  disabled={isPending}
                  className="mb-2 bg-background px-2 py-6 text-base"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
                <Button
                  disabled={isPending}
                  onClick={handleAddTag}
                  className="absolute right-4 top-[18px]"
                >
                  Enter
                </Button>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-background px-3 py-1 text-sm font-semibold text-muted-foreground transition"
                    >
                      {tag}{" "}
                      <CrossCircledIcon
                        onClick={() => handleRemoveTag(tag)}
                        className="h-5 w-5 text-primary"
                      />
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <Button
                  disabled={isPending}
                  onClick={() => handlePublish(blog)}
                >
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isPending ? "Publishing" : "Publish"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
      <div className="mb-4 w-full">
        <RichTextEditor editable={false} content={blocks} />
      </div>
    </>
  );
};

export default PublishBlog;
