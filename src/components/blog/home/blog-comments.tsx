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
import PaginateButton from "@/components/dashboard/blogs/paginate-btn";
import { loadMoreComments } from "@/actions/tag";

interface BlogCommentsProps {
  title: string;
  blogId: string;
  page?: string;
  slug: string;
}

const COMMENTS_PER_PAGE = 3;

const BlogComments = async ({
  title,
  blogId,
  page,
  slug,
}: BlogCommentsProps) => {
  const sessionUserPromise = getSessionUser();

  const currentPage = page ? parseInt(page) : 1;
  const skip = (currentPage - 1) * COMMENTS_PER_PAGE;

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
    skip,
    take: COMMENTS_PER_PAGE,
  });

  const commentsCountPromise = prisma.comments.count({
    where: {
      blogPostId: blogId,
      parentId: null,
    },
  });

  const [sessionUser, comments, totalComments] = await Promise.all([
    sessionUserPromise,
    commentsPromise,
    commentsCountPromise,
  ]);

  const hasMoreComments = totalComments > currentPage * COMMENTS_PER_PAGE;

  const loadMoreCommentsForBlog = loadMoreComments.bind(null, slug);

  return (
    <>
      <div className="w-full">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MessageCircleMore className="h-5 w-5" />
            </Button>
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
            <div className="mt-4">
              {hasMoreComments && (
                <PaginateButton
                  action={loadMoreCommentsForBlog}
                  value={currentPage + 1}
                >
                  Show More
                </PaginateButton>
              )}
              {currentPage > 1 && comments.length > 0 && (
                <PaginateButton
                  action={loadMoreCommentsForBlog}
                  value={currentPage - 1}
                >
                  Show Less
                </PaginateButton>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default BlogComments;
