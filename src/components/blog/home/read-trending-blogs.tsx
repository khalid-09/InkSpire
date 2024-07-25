import { H1 } from "@/components/typography";
import ReadBlog from "./read-blog";
import prisma from "@/db/db";

const ReadTrendingBlogs = async () => {
  const trendingBlogs = await prisma.activity.findMany({
    orderBy: [{ totalLikes: "desc" }, { totalReads: "desc" }],
    select: { blogPost: true },
    take: 5,
  });

  return (
    <>
      {trendingBlogs.map(({ blogPost }, i) => (
        <ReadBlog
          index={i}
          type="trending"
          key={blogPost?.id!}
          blog={blogPost!}
        />
      ))}
      {trendingBlogs.length === 0 && (
        <div>
          <H1 className="mt-10">No blogs trending !🙂</H1>
        </div>
      )}
    </>
  );
};

export default ReadTrendingBlogs;
