import { Suspense } from "react";
import prisma from "@/db/db";

import ReadTrendingBlogs from "@/components/blog/home/read-trending-blogs";
import ReadBlog from "@/components/blog/home/read-blog";
import HomeBlogSkeleton from "@/components/blog/home/home-blog-skeleton";
import TagSearch from "@/components/blog/home/tag-search";

import { H1, H3, P } from "@/components/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";

interface HomePageProps {
  searchParams: {
    tag?: string;
  };
}

const HomePage = async ({ searchParams: { tag } }: HomePageProps) => {
  const blogsPromise = prisma.blogPosts.findMany({
    where: {
      draft: false,
      ...(tag && {
        tags: {
          has: tag,
        },
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const trendingBlogsPromise = prisma.activity.findMany({
    orderBy: {
      totalLikes: "desc",
    },
    select: { blogPost: true },
    take: 5,
  });

  const [blogs, trendingBlogs] = await Promise.all([
    blogsPromise,
    trendingBlogsPromise,
  ]);

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
              <ReadTrendingBlogs trendingBlogs={trendingBlogs} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full space-y-4 md:w-1/3">
          <H3 className="text-start font-medium">Stories from all interests</H3>
          <TagSearch />
          <div className="hidden space-y-4 md:block">
            <H3 className="flex items-center gap-2">
              <span>Trending </span>
              <TrendingUp />
            </H3>
            <ReadTrendingBlogs trendingBlogs={trendingBlogs} />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
