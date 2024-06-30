"use client";

import { addComment } from "@/actions/comments";
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
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CommentFormProps {
  blogId: string;
}

const CommentForm = ({ blogId }: CommentFormProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });
  const { control, handleSubmit, reset } = form;

  const onSubmit = (data: CommentSchema) => {
    startTransition(async () => {
      const { type, message } = await addComment(blogId, data.comment);
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
                  className="min-h-40 w-full resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Comment
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
