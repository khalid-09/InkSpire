import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/db/db";
import { BlogPosts } from "@prisma/client";
import ReadBlog from "@/components/blog/home/read-blog";
import { H1, H3, P } from "@/components/typography";
import HomeBlogSkeleton from "@/components/blog/home/home-blog-skeleton";
import { Suspense } from "react";
import { TrendingUp } from "lucide-react";
import TrendingBlogSkeleton from "@/components/blog/home/trending-blog-skeleton";

const HomePage = async () => {
  const blogs: BlogPosts[] = await prisma.blogPosts.findMany({
    where: {
      draft: false,
    },
  });

  const trendingBlogs = await prisma.activity.findMany({
    orderBy: {
      totalLikes: "desc",
    },
    select: { blogPost: true },
    take: 5,
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
              <Suspense
                fallback={Array.from({ length: 5 }).map((_, i) => (
                  <HomeBlogSkeleton key={i} />
                ))}
              >
                {blogs.map((blog) => (
                  <ReadBlog type="home" key={blog.id} blog={blog} />
                ))}
              </Suspense>
              {blogs.length === 0 && (
                <H1 className="mt-10">
                  No Blogs Found ;)
                  <br /> Start writing some 🙂
                </H1>
              )}
            </TabsContent>
            <TabsContent value="trending">
              <Suspense
                fallback={Array.from({ length: 5 }).map((_, i) => (
                  <TrendingBlogSkeleton key={i} index={i} />
                ))}
              >
                {trendingBlogs.map(({ blogPost }, i) => (
                  <ReadBlog
                    index={i}
                    type="trending"
                    key={blogPost?.id!}
                    blog={blogPost!}
                  />
                ))}
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full space-y-4 md:w-1/3">
          <H3 className=" text-start">Stories from all interests</H3>
          <div className="mb-20 flex flex-wrap gap-2">
            {blogs.map((blog) =>
              blog.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer px-3 py-2 text-sm transition hover:scale-105"
                >
                  {tag}
                </Badge>
              )),
            )}
          </div>
          <div className="hidden space-y-4 md:block">
            <H3 className="flex items-center gap-2">
              <span>Trending </span>
              <TrendingUp />
            </H3>
            <Suspense
              fallback={Array.from({ length: 5 }).map((_, i) => (
                <TrendingBlogSkeleton key={i} index={i} />
              ))}
            >
              {trendingBlogs.map(({ blogPost }, i) => (
                <ReadBlog
                  index={i}
                  type="trending"
                  key={blogPost?.id!}
                  blog={blogPost!}
                />
              ))}
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
