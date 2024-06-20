import prisma from "@/db/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, cache } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeBlogSkeleton from "@/components/blog/home/home-blog-skeleton";
import ReadBlog from "@/components/blog/home/read-blog";
import { H1, H3, H4, P } from "@/components/typography";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn, convertDate, getSessionUser } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { BLOGS_PER_PAGE } from "@/lib/constants";
import { loadMoreBlogs } from "@/actions/tag";
import FormSubmitButton from "@/components/form-submit-button";
import SocialIcons from "@/components/user/social-icons";
import PaginateButton from "@/components/dashboard/blogs/paginate-btn";

interface UserProfileProps {
  params: {
    username: string;
  };
  searchParams: {
    page?: string;
  };
}

export const generateStaticParams = async () => {
  const users = await prisma.user.findMany({
    select: { username: true },
  });

  return users.map(({ username }) => ({ username }));
};

export const generateMetadata = async ({
  params: { username },
}: UserProfileProps): Promise<Metadata> => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { name: true, bio: true },
  });

  return {
    title: `${user?.name}`,
    description: `${user?.bio || "Not much to see here."}`,
  };
};

const UserProfile = async ({
  params: { username },
  searchParams: { page },
}: UserProfileProps) => {
  const currentPage = page ? parseInt(page) : 1;
  const skip = (currentPage - 1) * BLOGS_PER_PAGE;

  const sessionUserPromise = getSessionUser();
  const userPromise = prisma.user.findUnique({
    where: { username },
    include: {
      socialLinks: true,
      blogPosts: {
        orderBy: {
          id: "desc",
        },
        skip,
        take: BLOGS_PER_PAGE,
      },
    },
  });

  const [user, sessionUser] = await Promise.all([
    userPromise,
    sessionUserPromise,
  ]);
  if (!user) notFound();

  const {
    socialLinks,
    blogPosts,
    image,
    bio,
    name,
    totalPosts,
    totalReads,
    id,
    createdAt,
  } = user;

  const totalBlogs = await prisma.blogPosts.count({
    where: { authorId: id },
  });
  const hasMore = totalBlogs > currentPage * BLOGS_PER_PAGE;

  const loadMoreBlogsForUsername = loadMoreBlogs.bind(null, username);

  return (
    <section className="my-5  flex flex-col-reverse gap-10 md:flex-row">
      <Tabs defaultValue="blogs" className="w-full md:w-4/6">
        <TabsList>
          <TabsTrigger value="blogs">Blogs Published</TabsTrigger>
          <TabsTrigger className="block  md:hidden" value="about">
            About
          </TabsTrigger>
        </TabsList>
        <TabsContent className="space-y-4 divide-y-2" value="blogs">
          <Suspense
            fallback={Array.from({ length: 5 }).map((_, i) => (
              <HomeBlogSkeleton key={i} />
            ))}
          >
            {blogPosts.map((blog) => (
              <ReadBlog type="home" key={blog.id} blog={blog} />
            ))}
          </Suspense>
          {blogPosts.length === 0 && (
            <div>
              <H1 className="mt-10">
                <span className="italic text-muted-foreground">{username}</span>{" "}
                has not published any blogs yet.
              </H1>
            </div>
          )}
          {hasMore && (
            <PaginateButton
              action={loadMoreBlogsForUsername}
              value={currentPage + 1}
            >
              Show More
            </PaginateButton>
          )}
          {currentPage > 1 && blogPosts.length > 0 && (
            <PaginateButton
              action={loadMoreBlogsForUsername}
              value={currentPage - 1}
            >
              Show Less
            </PaginateButton>
          )}
        </TabsContent>
        <TabsContent value="about">
          <P className="">{bio || "Nothing to read here."}</P>
          <SocialIcons socialLinks={socialLinks} />
          <P className="text-muted-foreground ">
            Joined on {convertDate(createdAt, "dd MMMM yyyy")}
          </P>
        </TabsContent>
      </Tabs>
      <div className="flex flex-col items-center gap-4 md:items-start">
        <div className="relative h-32 w-32 overflow-hidden rounded-full">
          <Image
            src={image || ""}
            alt={name!}
            fill
            className="absolute object-cover"
          />
        </div>
        <P>@{username}</P>
        <H3>{name}</H3>
        <div>
          <span>{totalPosts || 0} Blogs</span> -{" "}
          <span>{totalReads || 0} Reads</span>
        </div>
        {sessionUser && (
          <div className={cn("", sessionUser.id !== id && " invisible")}>
            <Button asChild size="lg">
              <Link href="/settings/edit-profile">Edit Profile</Link>
            </Button>
          </div>
        )}
        <P className="hidden md:block">{bio || "Nothing to read here."}</P>
        <SocialIcons socialLinks={socialLinks} />
        <P className="hidden text-muted-foreground md:block [&:not(:first-child)]:mt-0">
          Joined on {convertDate(createdAt, "dd MMMM yyyy")}
        </P>
        <Separator className="w-full" />
      </div>
    </section>
  );
};

export default UserProfile;
