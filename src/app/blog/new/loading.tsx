import { Skeleton } from "@/components/ui/skeleton";

const CreateBlogLoading = () => {
  return (
    <section className="mb-10  space-y-3">
      <Skeleton className="mt-10 h-80 w-full rounded-md" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-72 w-full" />
      <div className="flex w-full items-center justify-end gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </section>
  );
};

export default CreateBlogLoading;
