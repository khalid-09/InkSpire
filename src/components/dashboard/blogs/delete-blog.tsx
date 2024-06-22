"use client";

import { deleteBlog } from "@/actions/blog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface DeleteBlogProps {
  id: string;
  activityId: string;
  authorId: string;
}

const DeleteBlog = ({ id, activityId, authorId }: DeleteBlogProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        toast.promise(deleteBlog(id, activityId, authorId), {
          loading: "Deleting blog...",
          success: () => {
            return "Blog deleted successfully!";
          },
          error: (err) => {
            if (err instanceof Error) {
              console.error(err.message);
              return "Something went wrong, try again later!";
            } else {
              console.error("Unexpected error:", err);
              return "An unexpected error occurred!";
            }
          },
        });
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
          toast.error("Something went wrong, try again later!");
        }
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="space-x-2" size="icon">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your blog
            post.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              disabled={isPending}
              onClick={handleDelete}
              variant="destructive"
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBlog;
