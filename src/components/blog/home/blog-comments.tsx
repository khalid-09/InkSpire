import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MessageCircleMore, MessageSquareMore, TrashIcon } from "lucide-react";
import CommentForm from "./comment/comment-form";
import { Comments } from "@prisma/client";
import prisma from "@/db/db";
import Comment from "./comment/comment";
import { P } from "@/components/typography";

interface BlogCommentsProps {
  title: string;
  comments: Comments[];
  blogId: string;
}

const BlogComments = async ({ title, blogId }: BlogCommentsProps) => {
  const comments = await prisma.comments.findMany({
    where: {
      blogPostId: blogId,
    },
    include: {
      user: {
        select: {
          username: true,
          image: true,
        },
      },
      replies: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <>
      <div className="w-full">
        <Sheet>
          <SheetTrigger>
            <Trigger />
          </SheetTrigger>
          <SheetContent className="w-full">
            <SheetHeader className="mb-4">
              <SheetTitle>Comments</SheetTitle>
              <SheetDescription>{title}</SheetDescription>
            </SheetHeader>
            <CommentForm blogId={blogId} />
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
            {comments.length === 0 && <P>No comments 👻.</P>}
          </SheetContent>
        </Sheet>
      </div>
      {/* <div className="block md:hidden">
        <Drawer>
          <DrawerTrigger>
            <Trigger />
          </DrawerTrigger>
          <DrawerContent className="px-3">
            <DrawerHeader>
              <DrawerTitle>Comments</DrawerTitle>
              <DrawerDescription>{title}</DrawerDescription>
            </DrawerHeader>
            <CommentForm blogId={blogId} />
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
            {comments.length === 0 && <P>No comments 👻.</P>}
          </DrawerContent>
        </Drawer>
      </div> */}
    </>
  );
};

export default BlogComments;

const Trigger = () => {
  return (
    <Button variant="outline" size="icon">
      <MessageCircleMore className="h-5 w-5" />
    </Button>
  );
};
