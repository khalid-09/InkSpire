import { Skeleton } from "@/components/ui/skeleton";

interface TrendingBlogSkeletonProps {
  index: number;
}

const TrendingBlogSkeleton = ({ index }: TrendingBlogSkeletonProps) => {
  return (
    <div className="flex flex-row-reverse justify-between gap-4 py-4">
      <div>
        <div className="mb-2 flex items-center gap-3">
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
      <div className="flex h-40 w-28 justify-center text-6xl font-medium text-muted-foreground">
        <p>0{index! + 1}</p>
      </div>
    </div>
  );
};

export default TrendingBlogSkeleton;
