import prisma from "@/db/db";
import { BLOGS_PER_PAGE } from "@/lib/constants";
import { Prisma } from "@prisma/client";
import ReadBlog from "../blog/home/read-blog";
import Pagination from "../blog/home/pagination";
import { H1 } from "../typography";
import { BlogFilterSchema } from "@/lib/validation/blog-filter";

interface BlogsFeedProps {
  tag?: string;
  query?: string;
  skip: number;
  filterValues: BlogFilterSchema;
  pageNumber: number;
}

const BlogsFeed = async ({
  tag,
  query,
  skip,
  filterValues,
  pageNumber,
}: BlogsFeedProps) => {
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

  const blogsPromise = await prisma.blogPosts.findMany({
    where,
    orderBy: {
      id: "desc",
    },
    take: BLOGS_PER_PAGE,
    skip,
  });

  const countPromise = prisma.blogPosts.count({ where });

  const [blogs, totalBlogs] = await Promise.all([blogsPromise, countPromise]);

  return (
    <>
      <div className="space-y-4 divide-y-2">
        {blogs.map((blog) => (
          <ReadBlog type="home" key={blog.id} blog={blog} />
        ))}
      </div>
      {blogs.length === 0 && (
        <div>
          <H1 className="mt-10">
            No Blogs Found ;)
            <br /> Start writing some 🙂
          </H1>
        </div>
      )}
      {blogs.length > 0 && (
        <Pagination
          currentPage={pageNumber}
          totalPages={Math.ceil(totalBlogs / BLOGS_PER_PAGE)}
          filterValues={filterValues}
        />
      )}
    </>
  );
};

export default BlogsFeed;
