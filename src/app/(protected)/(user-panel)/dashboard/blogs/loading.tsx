import { H4 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardBlogLoading = () => {
  return (
    <div className="mb-4">
      <H4>Manage Blogs</H4>
      <div className="mt-8 space-y-5 md:p-4">
        <div className="relative">
          <Input placeholder="Search..." />
        </div>
        <Tabs defaultValue="published">
          <TabsList>
            <TabsTrigger value="published">Published Blogs</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="fav">Favourites</TabsTrigger>
          </TabsList>
          <TabsContent value="published" className="space-y-4  divide-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-start justify-between gap-6 pt-2 md:flex-row md:items-center"
              >
                <div className="flex gap-4">
                  <Skeleton className="h-28 w-36 overflow-hidden rounded-sm" />
                  <div className="flex w-full flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-96" />
                      <Skeleton className="h-4 w-3/4" />
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
            ))}
          </TabsContent>
          <TabsContent value="drafts"></TabsContent>
          <TabsContent value="fav"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardBlogLoading;
