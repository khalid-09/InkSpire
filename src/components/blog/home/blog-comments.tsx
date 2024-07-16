import prisma from "@/db/db";
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
  blogId: string;
}

const BlogComments = async ({ title, blogId }: BlogCommentsProps) => {
  const sessionUserPromise = getSessionUser();

  const commentsPromise = prisma.comments.findMany({
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
      id: "desc",
    },
  });

  const [sessionUser, comments] = await Promise.all([
    sessionUserPromise,
    commentsPromise,
  ]);

  return (
    <>
      <div className="w-full ">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MessageCircleMore className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full overflow-y-scroll">
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
