import { Skeleton } from "@/components/ui/skeleton";

const HomeBlogSkeleton = () => {
  return (
    <div className="flex justify-between gap-4 py-4">
      <div className="w-full">
        <div className="mb-2 flex w-full items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <div className="space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/4" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-[90px]" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
      <div>
        <Skeleton className="h-40 w-44 rounded-md" />
      </div>
    </div>
  );
};

export default HomeBlogSkeleton;
