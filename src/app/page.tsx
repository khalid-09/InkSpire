import { Suspense } from "react";
import prisma from "@/db/db";
import { Prisma } from "@prisma/client";

import ReadTrendingBlogs from "@/components/blog/home/read-trending-blogs";
import ReadBlog from "@/components/blog/home/read-blog";
import HomeBlogSkeleton from "@/components/blog/home/home-blog-skeleton";
import TagSearch from "@/components/blog/home/tag-search";

import { H1, H3 } from "@/components/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";
import Pagination from "@/components/blog/home/pagination";
import { BlogFilterSchema } from "@/lib/validation/blog-filter";

interface HomePageProps {
  searchParams: {
    tag?: string;
    title?: string;
    page?: string;
  };
}

const BLOGS_PER_PAGE = 5;

const HomePage = async ({
  searchParams: { tag, title, page },
}: HomePageProps) => {
  const filterValues: BlogFilterSchema = { tag, title };
  const pageNumber = page ? parseInt(page) : 1;
  const skip = (pageNumber - 1) * BLOGS_PER_PAGE;

  const where: Prisma.BlogPostsWhereInput = {
    draft: false,
    ...(tag && {
      tags: {
        has: tag,
      },
    }),
    ...(title && {
      title: {
        contains: title,
        mode: "insensitive",
      },
    }),
  };

  const blogsPromise = prisma.blogPosts.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    take: BLOGS_PER_PAGE,
    skip,
  });

  const countPromise = prisma.blogPosts.count({ where });

  const trendingBlogsPromise = prisma.activity.findMany({
    orderBy: {
      totalLikes: "desc",
    },
    select: { blogPost: true },
    take: 5,
  });

  const [blogs, trendingBlogs, totalBlogs] = await Promise.all([
    blogsPromise,
    trendingBlogsPromise,
    countPromise,
  ]);

  return (
    <>
      <section className="mt-5 flex flex-col items-start gap-10 md:flex-row">
        <div className="w-full space-y-10 md:w-2/3">
          <Tabs defaultValue="home">
            <TabsList>
              <TabsTrigger value="home">
                {tag ? tag : "Recently Published"}
              </TabsTrigger>
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
          {blogs.length && (
            <Pagination
              currentPage={pageNumber}
              totalPages={Math.ceil(totalBlogs / BLOGS_PER_PAGE)}
              filterValues={filterValues}
            />
          )}
        </div>
        <aside className="w-full space-y-6 md:w-1/3">
          <div className="space-y-4">
            <H3 className="text-start font-medium">
              Stories from all interests
            </H3>
            <TagSearch />
          </div>
          <div className="hidden space-y-4 md:block">
            <H3 className="flex items-center gap-2">
              <span>Trending </span>
              <TrendingUp />
            </H3>
            <ReadTrendingBlogs trendingBlogs={trendingBlogs} />
          </div>
        </aside>
      </section>
    </>
  );
};

export default HomePage;
