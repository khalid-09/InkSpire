"use client";

import { H1 } from "@/components/typography";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  console.log(error);

  return (
    <section className="mt-80 flex flex-col items-center gap-7 px-3 text-center">
      <H1>{error.message}! 😞</H1>
      <div>
        <Button
          variant="secondary"
          size="lg"
          className="flex items-center gap-3"
          onClick={() => reset()}
        >
          <span>Try Again</span>
          <ArrowRightIcon className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
};

export default BlogError;
