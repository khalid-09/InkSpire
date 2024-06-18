import prisma from "@/db/db";
import { Prisma } from "@prisma/client";
import { BlogFilterSchema } from "@/lib/validation/blog-filter";
import { Suspense } from "react";

import ReadTrendingBlogs from "@/components/blog/home/read-trending-blogs";
import ReadBlog from "@/components/blog/home/read-blog";
import HomeBlogSkeleton from "@/components/blog/home/home-blog-skeleton";
import TagSearch from "@/components/blog/home/tag-search";
import UserSearchResults from "@/components/blog/home/user-search-results";
import Pagination from "@/components/blog/home/pagination";

import { H1, H3, P } from "@/components/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, User } from "lucide-react";
import { BLOGS_PER_PAGE } from "@/lib/constants";

interface HomePageProps {
  searchParams: {
    tag?: string;
    query?: string;
    page?: string;
  };
}

const HomePage = async ({
  searchParams: { tag, query, page },
}: HomePageProps) => {
  const filterValues: BlogFilterSchema = { tag, query };
  const pageNumber = page ? parseInt(page) : 1;
  const skip = (pageNumber - 1) * BLOGS_PER_PAGE;

  const where: Prisma.BlogPostsWhereInput = {
    draft: false,
    ...(tag && {
      tags: {
        has: tag,
      },
    }),
    ...(query && {
      title: {
        contains: query,
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

  const usersPromise = query
    ? prisma.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              username: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
        select: {
          name: true,
          username: true,
          image: true,
        },
      })
    : Promise.resolve([]);

  const [blogs, trendingBlogs, users, totalBlogs] = await Promise.all([
    blogsPromise,
    trendingBlogsPromise,
    usersPromise,
    countPromise,
  ]);

  return (
    <>
      <section className="mb-10 mt-5 flex flex-col-reverse items-start gap-10 md:flex-row">
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="home">
            <TabsList className="flex-wrap">
              <TabsTrigger value="home">
                {query && !users.length
                  ? 'Search results for "' + query + '"'
                  : tag
                    ? tag
                    : "Recently Published"}
              </TabsTrigger>
              <TabsTrigger className="block  md:hidden" value="trending">
                Trending Blogs
              </TabsTrigger>
            </TabsList>
            <TabsContent className="space-y-10" value="home">
              <div className="space-y-4 divide-y-2">
                <Suspense
                  fallback={Array.from({ length: 5 }).map((_, i) => (
                    <HomeBlogSkeleton key={i} />
                  ))}
                >
                  {blogs.map((blog) => (
                    <ReadBlog type="home" key={blog.id} blog={blog} />
                  ))}
                </Suspense>
              </div>
              {blogs.length === 0 && (
                <div>
                  <H1 className="mt-10">
                    No Blogs Found ;)
                    <br /> Start writing some 🙂
                  </H1>
                  {page ? (
                    <P className="text-lg font-medium italic">
                      or make sure you are on the right page 🤔
                    </P>
                  ) : null}
                </div>
              )}
              {blogs.length > 0 && (
                <Pagination
                  currentPage={pageNumber}
                  totalPages={Math.ceil(totalBlogs / BLOGS_PER_PAGE)}
                  filterValues={filterValues}
                />
              )}
            </TabsContent>
            <TabsContent value="trending">
              <ReadTrendingBlogs trendingBlogs={trendingBlogs} />
              {trendingBlogs.length === 0 && (
                <div>
                  <H1 className="mt-10">No blogs trending !🙂</H1>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        {!users.length ? (
          <aside className="w-full space-y-6 md:w-1/3">
            <div className="space-y-4">
              <H3 className="text-start font-medium">
                Search by your interests!
              </H3>
              <TagSearch />
            </div>
            <div className="hidden space-y-4 md:block">
              <H3 className="flex items-center gap-2">
                <span className="font-semibold">Trending </span>
                <TrendingUp />
              </H3>
              <ReadTrendingBlogs trendingBlogs={trendingBlogs} />
            </div>
          </aside>
        ) : (
          <aside className="w-full space-y-6 md:w-1/3">
            <H3 className="flex items-center gap-2 text-start font-medium">
              <span>Users related to search</span>{" "}
              <User className="text-muted-foreground" />
            </H3>
            {users.map((user) => (
              <UserSearchResults key={user.username} user={user} />
            ))}
          </aside>
        )}
      </section>
    </>
  );
};

export default HomePage;
