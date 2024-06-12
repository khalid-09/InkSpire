"use client";

import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const BlogError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <section className="mt-80 flex flex-col items-center gap-7 px-3 text-center">
      <H1>It seems like something went wrong! 😞</H1>
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
