"use client";

import { useFormStatus } from "react-dom";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const GoogleBtn = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="secondary"
      disabled={pending}
      className="w-full space-x-3 rounded-full px-2 py-5"
      onClick={() => toast.loading("Signing in with Google")}
    >
      <FcGoogle className="h-6 w-6" />
      <span className="text-base transition">
        {pending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          " Continue with Google"
        )}
      </span>
    </Button>
  );
};

export default GoogleBtn;
