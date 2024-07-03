"use client";

import { MessageSquareMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteCommentButton from "./delete-comment-btn";
import CommentForm from "./comment-form";
import { useState } from "react";
import { convertDate } from "@/lib/utils";
import { Comments } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { User } from "next-auth";
import { deleteComment } from "@/actions/comments";

interface SingleCommentProps {
  id: string;
  userId: string;
  image: string | null;
  username: string | null;
  createdAt: Date;
  content: string;
  replies?: Comments[];
  sessionUser: User | undefined;
  blogPostId: string;
}

const SingleComment = ({
  id,
  userId,
  image,
  username,
  content,
  createdAt,
  replies,
  blogPostId,
  sessionUser,
}: SingleCommentProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = () => setShowReplyForm((prev) => !prev);

  return (
    <>
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
            {replies?.length || 0} Reply
          </div>
          <Button variant="link" onClick={handleReply}>
            {showReplyForm ? "Close" : "Reply"}
          </Button>
        </div>
        {sessionUser?.id === userId && (
          <form action={deleteComment}>
            <input type="hidden" name="commentId" value={id} />
            <DeleteCommentButton />
          </form>
        )}
      </div>
      {showReplyForm && (
        <CommentForm
          onSetShowReplyForm={setShowReplyForm}
          reply={true}
          commentId={id}
          blogId={blogPostId}
        />
      )}
    </>
  );
};

export default SingleComment;
