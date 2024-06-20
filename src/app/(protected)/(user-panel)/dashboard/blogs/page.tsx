import prisma from "@/db/db";
import { getSessionUser } from "@/lib/utils";
import { redirect } from "next/navigation";

import PublishedBlogs from "@/components/dashboard/blogs/published-blogs";

import { H4 } from "@/components/typography";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import { BLOGS_PER_PAGE } from "@/lib/constants";
import FormSubmitButton from "@/components/form-submit-button";
import { loadMoreBlogsInDashboard } from "@/actions/tag";
import PaginateButton from "@/components/dashboard/blogs/paginate-btn";
import TitleSearch from "@/components/blog/home/title-search";

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

  const darftBlogsPromise = prisma.blogPosts.findMany({
    where: {
      draft: true,
      id: sessionUser.id,
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

  const [publishedBlogs, draftBlogs, totalBlogs, totalDraftBlogs] =
    await Promise.all([
      publishedBlogsPromise,
      darftBlogsPromise,
      totalBlogsPromise,
      totalDraftBlogsPromise,
    ]);

  const hasMorePublishedBlogs = totalBlogs > currentPage * BLOGS_PER_PAGE;
  const hasMoreDraftBlogs = totalDraftBlogs > currentPage * BLOGS_PER_PAGE;

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
          </TabsList>
          <TabsContent value="published" className="space-y-4  divide-y-2">
            {publishedBlogs.map((blog) => (
              <PublishedBlogs key={blog.id} blog={blog} />
            ))}
            {publishedBlogs.length === 0 && (
              <H4>No Blogs Published 😅. Start Writing!</H4>
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
            {draftBlogs.length === 0 && <H4>No Draft Blogs 👍</H4>}
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
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardBlogPage;
