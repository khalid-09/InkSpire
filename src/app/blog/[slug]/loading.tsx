import { Skeleton } from "@/components/ui/skeleton";

const BlogPageLoading = () => {
  return (
    <article className="mb-10 space-y-10">
      <Skeleton className="h-96 w-full rounded" />
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-8 w-2/5" />
      </div>
      <div className="flex w-full items-start justify-between gap-3">
        <div className="mb-2 flex w-full items-center gap-5 md:gap-7">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
      <Skeleton className="h-96 w-full rounded-md" />
    </article>
  );
};

export default BlogPageLoading;
