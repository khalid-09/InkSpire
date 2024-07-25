import { Suspense } from "react";
import { BLOGS_PER_PAGE } from "@/lib/constants";
import { BlogFilterSchema } from "@/lib/validation/blog-filter";

import BlogsFeed from "@/components/dashboard/blogs-feed";
import BlogsSidebar from "@/components/dashboard/blogs-sidebar";
import HomeBlogSkeleton from "@/components/blog/home/home-blog-skeleton";
import ReadTrendingBlogs from "@/components/blog/home/read-trending-blogs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrendingBlogSkeleton from "@/components/blog/home/trending-blog-skeleton";

interface HomePageProps {
  searchParams: {
    tag?: string;
    query?: string;
    page?: string;
  };
}

const HomePage = ({ searchParams: { tag, query, page } }: HomePageProps) => {
  const filterValues: BlogFilterSchema = { tag, query };
  const pageNumber = page ? parseInt(page) : 1;
  const skip = (pageNumber - 1) * BLOGS_PER_PAGE;

  return (
    <section className="mb-10 mt-5 flex flex-col-reverse items-start gap-10 md:flex-row">
      <div className="w-full md:w-2/3">
        <Tabs defaultValue="home">
          <TabsList className="flex-wrap">
            <TabsTrigger value="home">
              {query
                ? 'Search results for "' + query + '"'
                : tag
                  ? tag
                  : "Recently Published"}
            </TabsTrigger>
            <TabsTrigger className="block md:hidden" value="trending">
              Trending Blogs
            </TabsTrigger>
          </TabsList>
          <TabsContent className="space-y-10" value="home">
            <Suspense
              fallback={Array.from({ length: 5 }).map((_, i) => (
                <HomeBlogSkeleton key={i} />
              ))}
            >
              <BlogsFeed
                tag={tag}
                skip={skip}
                query={query}
                filterValues={filterValues}
                pageNumber={pageNumber}
              />
            </Suspense>
          </TabsContent>
          <TabsContent value="trending">
            <Suspense
              fallback={Array.from({ length: 5 }).map((_, i) => (
                <TrendingBlogSkeleton key={i} index={i} />
              ))}
            >
              <ReadTrendingBlogs />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
      <BlogsSidebar query={query} />
    </section>
  );
};

export default HomePage;
