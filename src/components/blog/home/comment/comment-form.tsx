"use client";

import { addComment, addReply } from "@/actions/comments";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CommentSchema, commentSchema } from "@/lib/validation/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CommentFormProps {
  blogId: string;
  commentId?: string;
  reply?: boolean;
  onSetShowReplyForm?: Dispatch<SetStateAction<boolean>>;
}

const CommentForm = ({
  blogId,
  commentId,
  reply,
  onSetShowReplyForm,
}: CommentFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });
  const { control, handleSubmit, reset } = form;

  const onSubmit = (data: CommentSchema) => {
    if (reply) {
      startTransition(async () => {
        const { type, message } = await addReply(blogId, commentId!, data);
        if (type === "error") {
          toast.error(message);
          return;
        }
        toast.success(message);
      });
      onSetShowReplyForm!((prev) => !prev);
      return;
    }

    startTransition(async () => {
      const { type, message } = await addComment(blogId, data);
      if (type === "error") {
        toast.error(message);
        return;
      }
      toast.success(message);
    });
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Leave a comment..."
                  className="min-h-36 w-full resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {reply ? "Reply" : "Comment"}
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
