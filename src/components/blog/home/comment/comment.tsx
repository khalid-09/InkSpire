import { deleteComment } from "@/actions/comments";
import { Comments } from "@prisma/client";
import { convertDate, getSessionUser } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

import DeleteCommentButton from "./delete-comment-btn";

import { Button } from "@/components/ui/button";
import { MessageSquareMore } from "lucide-react";

interface User {
  user: {
    image: string | null;
    username: string | null;
  };
}

interface Replies {
  replies: Comments[];
}

interface CommentProps {
  comment: Comments & Replies & User;
}

const Comment = async ({ comment }: CommentProps) => {
  const sessionUser = await getSessionUser();

  const {
    user: { username, image },
    replies,
    createdAt,
    content,
    userId,
    id,
  } = comment;

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={image! || "sdfija"}
            alt="hdfa"
            fill
            className="absolute object-cover"
          />
        </div>
        <Link
          href={`/user/${username}`}
          className="text-sm text-muted-foreground underline"
        >
          @{username}
        </Link>
        <span>{convertDate(createdAt)}</span>
      </div>
      <div>
        <p>{content}</p>
      </div>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MessageSquareMore />
            {replies.length} Reply
          </div>
          <Button variant="link">Reply</Button>
        </div>
        {sessionUser?.id === userId && (
          <form action={deleteComment}>
            <input type="hidden" name="commentId" value={id} />
            <DeleteCommentButton />
          </form>
        )}
      </div>
    </div>
  );
};

export default Comment;
