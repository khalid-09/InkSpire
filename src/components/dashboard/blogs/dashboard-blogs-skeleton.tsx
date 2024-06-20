import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardBlogsSkeleton = () => {
  return Array.from({ length: 5 }).map((_, i) => (
    <div
      key={i}
      className="flex flex-col items-start justify-between gap-6 pt-2 md:flex-row md:items-center"
    >
      <div className="flex gap-4">
        <Skeleton className="h-28 w-28 overflow-hidden rounded-sm" />
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="flex gap-3">
            <Button className="flex-grow-0" variant="outline">
              Edit
            </Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </div>
      </div>
      <div className="flex  items-center gap-4">
        <div className="flex flex-col items-center">
          <span>0</span>
          <span>Likes</span>
        </div>
        <div className="flex flex-col items-center">
          <span>0</span>
          <span>Reads</span>
        </div>
        <div className="flex flex-col items-center">
          <span>0</span>
          <span>Comments</span>
        </div>
      </div>
    </div>
  ));
};
export default DashboardBlogsSkeleton;
