import prisma from "@/db/db";
import { Comments } from "@prisma/client";
import { getSessionUser } from "@/lib/utils";

import Comment from "./comment/comment";
import CommentForm from "./comment/comment-form";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { P } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";

interface BlogCommentsProps {
  title: string;
  comments: Comments[];
  blogId: string;
}

const BlogComments = async ({ title, blogId }: BlogCommentsProps) => {
  const sessionUser = await getSessionUser();

  const comments = await prisma.comments.findMany({
    where: {
      blogPostId: blogId,
      parentId: null,
    },
    include: {
      user: {
        select: {
          username: true,
          image: true,
        },
      },
      replies: {
        include: {
          user: { select: { username: true, image: true } },
          replies: {
            include: { user: { select: { username: true, image: true } } },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
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
              <Comment
                key={comment.id}
                sessionUser={sessionUser}
                comment={comment}
              />
            ))}
            {comments.length === 0 && <P>No comments 👻.</P>}
          </SheetContent>
        </Sheet>
      </div>
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
