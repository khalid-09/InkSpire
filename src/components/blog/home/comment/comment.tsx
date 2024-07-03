"use client";

import { useState } from "react";
import { User } from "next-auth";
import { convertDate } from "@/lib/utils";
import { Comments } from "@prisma/client";
import { deleteComment } from "@/actions/comments";

import Link from "next/link";
import Image from "next/image";

import CommentForm from "./comment-form";
import DeleteCommentButton from "./delete-comment-btn";

import { Button } from "@/components/ui/button";
import { MessageSquareMore } from "lucide-react";

interface CommentUser {
  user: {
    image: string | null;
    username: string | null;
  };
}

interface Replies {
  replies: (Comments & CommentUser)[];
}

interface CommentProps {
  comment: Comments & Partial<Replies> & CommentUser;
  sessionUser: User | undefined;
}

const Comment = ({ comment, sessionUser }: CommentProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const handleReply = () => setShowReplyForm((prev) => !prev);

  const handleShowReply = () => setShowReplies((prev) => !prev);

  const { user, createdAt, content, userId, id, blogPostId, replies } = comment;

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={user?.image! || "/vercel.svg"}
            alt="hdfa"
            fill
            className="absolute object-cover"
          />
        </div>
        <Link
          href={`/user/${user?.username}`}
          className="text-sm text-muted-foreground underline"
        >
          @{user?.username}
        </Link>
        <span>{convertDate(createdAt)}</span>
      </div>
      <div>
        <p>{content}</p>
      </div>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-1">
          {replies && replies.length > 0 ? (
            <div
              onClick={handleShowReply}
              className="flex cursor-pointer items-center gap-1 text-sm text-muted-foreground"
            >
              <MessageSquareMore className="h-4 w-4" />
              {showReplies ? "Hide" : `${replies.length} Replies`}
            </div>
          ) : (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MessageSquareMore className="h-4 w-4" />
              {`${replies?.length ?? 0} Replies`}
            </div>
          )}
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
      {replies &&
        showReplies &&
        replies.map((reply) => (
          <div key={reply.id} className="mt-2 space-y-2 pl-6">
            <Comment comment={reply} sessionUser={sessionUser} key={reply.id} />
          </div>
        ))}
    </div>
  );
};

export default Comment;
