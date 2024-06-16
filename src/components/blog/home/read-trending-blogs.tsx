import { Suspense } from "react";
import TrendingBlogSkeleton from "./trending-blog-skeleton";
import ReadBlog from "./read-blog";
import { BlogPosts } from "@prisma/client";

interface ReadTrendingBlogsProps {
  trendingBlogs: { blogPost: BlogPosts | null }[];
}

const ReadTrendingBlogs = ({ trendingBlogs }: ReadTrendingBlogsProps) => {
  return (
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
  );
};

export default ReadTrendingBlogs;
