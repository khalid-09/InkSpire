import HomeBlogSkeleton from "@/components/blog/home/home-blog-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HomePageLoading = () => {
  return (
    <section className="mt-5 flex flex-col items-start gap-10 md:flex-row">
      <div className="w-full md:w-2/3">
        <Tabs defaultValue="home">
          <TabsList>
            <TabsTrigger value="home">Home </TabsTrigger>
          </TabsList>
          <TabsContent className="space-y-4 divide-y-2" value="home">
            {Array.from({ length: 5 }).map((_, i) => (
              <HomeBlogSkeleton key={i} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-full space-y-4 md:w-1/3">
        <h4 className="mb-10 text-start text-2xl uppercase tracking-wide text-muted-foreground">
          Top categories
        </h4>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageLoading;
