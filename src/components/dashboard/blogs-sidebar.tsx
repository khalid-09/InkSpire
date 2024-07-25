import { Suspense } from "react";
import UserSearchResults from "../blog/home/user-search-results";
import { H3 } from "../typography";
import TrendingBlogSkeleton from "../blog/home/trending-blog-skeleton";
import ReadTrendingBlogs from "../blog/home/read-trending-blogs";
import TagSearch from "../blog/home/tag-search";
import { TrendingUp, User } from "lucide-react";
import prisma from "@/db/db";

interface BlogsSidebarProps {
  query?: string;
}

const BlogsSidebar = async ({ query }: BlogsSidebarProps) => {
  const users = query
    ? await prisma.user.findMany({
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
    : [];

  return (
    <>
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
            <Suspense
              fallback={Array.from({ length: 5 }).map((_, i) => (
                <TrendingBlogSkeleton key={i} index={i} />
              ))}
            >
              <ReadTrendingBlogs />
            </Suspense>
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
    </>
  );
};

export default BlogsSidebar;
