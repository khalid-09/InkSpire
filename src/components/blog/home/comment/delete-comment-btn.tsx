"use client";

import { Button } from "@/components/ui/button";
import { Loader2, TrashIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

const DeleteCommentButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant="outline" size="icon">
      {pending && <Loader2 className="animate-spin" size={16} />}
      {!pending && <TrashIcon className="h-5 w-5" />}
    </Button>
  );
};

export default DeleteCommentButton;
