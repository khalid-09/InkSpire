import prisma from "@/db/db";
import { getSessionUser } from "@/lib/utils";
import { redirect } from "next/navigation";
import { loadMoreBlogsInDashboard } from "@/actions/tag";
import { Metadata } from "next";

import PaginateButton from "@/components/dashboard/blogs/paginate-btn";
import TitleSearch from "@/components/blog/home/title-search";
import ReadBlog from "@/components/blog/home/read-blog";
import PublishedBlogs from "@/components/dashboard/blogs/published-blogs";

import { H4 } from "@/components/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BLOGS_PER_PAGE } from "@/lib/constants";

export const generateMetadata = (): Metadata => {
  return {
    title: "Dashboard - Blogs",
    description: "Manage your blogs here",
  };
};

interface DashboardBlogPageProps {
  searchParams: {
    page?: string;
    query?: string;
  };
}

const DashboardBlogPage = async ({
  searchParams: { page, query },
}: DashboardBlogPageProps) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect("/login");

  const currentPage = page ? parseInt(page) : 1;
  const skip = (currentPage - 1) * BLOGS_PER_PAGE;

  const publishedBlogsPromise = prisma.blogPosts.findMany({
    where: {
      draft: false,
      authorId: sessionUser.id,
      ...(query && {
        title: {
          contains: query,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      id: "desc",
    },
    include: {
      activity: true,
    },
    skip,
    take: BLOGS_PER_PAGE,
  });

  const darftBlogsPromise = prisma.blogPosts.findMany({
    where: {
      draft: true,
      authorId: sessionUser.id,
      ...(query && {
        title: {
          contains: query,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      id: "desc",
    },
    skip,
    take: BLOGS_PER_PAGE,
  });

  const totalBlogsPromise = prisma.blogPosts.count({
    where: {
      authorId: sessionUser.id,
      draft: false,
      ...(query && {
        title: {
          contains: query,
          mode: "insensitive",
        },
      }),
    },
  });

  const totalDraftBlogsPromise = prisma.blogPosts.count({
    where: {
      authorId: sessionUser.id,
      draft: true,
      ...(query && {
        title: {
          contains: query,
          mode: "insensitive",
        },
      }),
    },
  });

  const favBlogsPromise = prisma.user.findMany({
    where: {
      id: sessionUser.id,
    },
    select: {
      likes: {
        select: { blogPost: true },
      },
    },
  });

  const [publishedBlogs, draftBlogs, totalBlogs, totalDraftBlogs, favBlogs] =
    await Promise.all([
      publishedBlogsPromise,
      darftBlogsPromise,
      totalBlogsPromise,
      totalDraftBlogsPromise,
      favBlogsPromise,
    ]);

  const hasMorePublishedBlogs = totalBlogs > currentPage * BLOGS_PER_PAGE;
  const hasMoreDraftBlogs = totalDraftBlogs > currentPage * BLOGS_PER_PAGE;
  const [{ likes }] = favBlogs;

  return (
    <div className="mb-4">
      <H4>Manage Blogs</H4>
      <div className="mt-8 space-y-5 md:p-4">
        <div className="relative">
          <TitleSearch location="dashboard" />
        </div>
        <Tabs defaultValue="published">
          <TabsList>
            <TabsTrigger value="published">Published Blogs</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="fav">Favourites</TabsTrigger>
          </TabsList>
          <TabsContent value="published" className="space-y-4  divide-y-2">
            {publishedBlogs.map((blog) => (
              <PublishedBlogs key={blog.id} blog={blog} />
              // <DashboardBlogsSkeleton key={blog.id} />
            ))}
            {publishedBlogs.length === 0 && (
              <div>
                <H4>No Blogs Published 😅. Start Writing!</H4>
              </div>
            )}
            {hasMorePublishedBlogs && (
              <PaginateButton
                action={loadMoreBlogsInDashboard}
                value={currentPage + 1}
              >
                Show More
              </PaginateButton>
            )}
            {currentPage > 1 && publishedBlogs.length > 0 && (
              <PaginateButton
                action={loadMoreBlogsInDashboard}
                value={currentPage - 1}
              >
                Show Less
              </PaginateButton>
            )}
          </TabsContent>
          <TabsContent value="drafts">
            <div>
              <H4>No Draft Blogs 😅. Start Writing!</H4>
            </div>
            {hasMoreDraftBlogs && (
              <PaginateButton
                action={loadMoreBlogsInDashboard}
                value={currentPage + 1}
              >
                Show More
              </PaginateButton>
            )}
            {currentPage > 1 && draftBlogs.length > 0 && (
              <PaginateButton
                action={loadMoreBlogsInDashboard}
                value={currentPage - 1}
              >
                Show Less
              </PaginateButton>
            )}
          </TabsContent>
          <TabsContent value="fav">
            {likes.length === 0 && (
              <div>
                <H4>No Favourites 😅. Start Liking!</H4>
              </div>
            )}
            {likes.map(({ blogPost }) => (
              <ReadBlog type="home" blog={blogPost} key={blogPost.id} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardBlogPage;
