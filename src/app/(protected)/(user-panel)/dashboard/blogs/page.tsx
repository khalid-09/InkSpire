import PublishedBlogs from "@/components/dashboard/blogs/published-blogs";
import { H4 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/db/db";
import { convertDate, getSessionUser } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

const DashboardBlogPage = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect("/login");

  const publishedBlogsPromise = prisma.blogPosts.findMany({
    where: {
      draft: false,
    },
    orderBy: {
      id: "desc",
    },
    include: {
      activity: true,
    },
  });

  const darftBlogsPromise = prisma.blogPosts.findMany({
    where: {
      draft: true,
    },
  });

  const [publishedBlogs, draftBlogs] = await Promise.all([
    publishedBlogsPromise,
    darftBlogsPromise,
  ]);

  return (
    <>
      <H4>Manage Blogs</H4>
      <div className="mt-8 space-y-5 md:p-4">
        <Input className="w-full" placeholder="Search Blogs" />
        <Tabs defaultValue="published">
          <TabsList>
            <TabsTrigger value="published">Published Blogs</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          <TabsContent value="published" className="space-y-4  divide-y-2">
            {publishedBlogs.map((blog) => (
              <PublishedBlogs key={blog.id} blog={blog} />
            ))}
          </TabsContent>
          <TabsContent value="drafts">Drafts</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default DashboardBlogPage;
