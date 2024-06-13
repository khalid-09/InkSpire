import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/db/db";
import { BlogPosts } from "@prisma/client";
import ReadBlog from "@/components/blog/home/read-blog";
import { H1 } from "@/components/typography";

const HomePage = async () => {
  const blogs: BlogPosts[] = await prisma.blogPosts.findMany({
    where: {
      draft: false,
    },
  });

  return (
    <>
      <section className="mt-5 flex flex-col items-start gap-10   md:flex-row">
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="home">
            <TabsList>
              <TabsTrigger value="home">Home </TabsTrigger>
              <TabsTrigger className="block  md:hidden" value="trending">
                Trending Blogs
              </TabsTrigger>
            </TabsList>
            <TabsContent className="space-y-4 divide-y-2" value="home">
              {blogs.length === 0 ? (
                <H1 className="mt-10">
                  No Blogs Found ;)
                  <br /> Start writing some 🙂
                </H1>
              ) : (
                blogs.map((blog) => <ReadBlog key={blog.id} blog={blog} />)
              )}
            </TabsContent>
            <TabsContent value="trending">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full space-y-4 md:w-1/3">
          <h4 className="mb-10 text-start text-2xl uppercase tracking-wide text-muted-foreground">
            Top categories
          </h4>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="px-3 py-2 text-sm transition hover:scale-105"
            >
              React
            </Badge>
            <Badge
              variant="secondary"
              className="px-3 py-2 text-sm transition hover:scale-105"
            >
              CSS
            </Badge>
            <Badge
              variant="secondary"
              className="px-3 py-2 text-sm transition hover:scale-105"
            >
              Animations
            </Badge>
            <Badge
              variant="secondary"
              className="px-3 py-2 text-sm transition hover:scale-105"
            >
              Perfromance
            </Badge>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
