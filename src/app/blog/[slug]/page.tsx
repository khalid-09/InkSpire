import { Suspense, cache } from "react";
import prisma from "@/db/db";

import { convertDate, getSessionUser } from "@/lib/utils";

import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import NewEditor from "@/components/blog/editor/editor";

import BlogActivity from "@/components/blog/home/blog-activity";
import HomeBlogSkeleton from "@/components/blog/home/home-blog-skeleton";
import ReadBlog from "@/components/blog/home/read-blog";
import { H1, H2 } from "@/components/typography";
import BlogComments from "@/components/blog/home/blog-comments";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export const generateStaticParams = async () => {
  const blogPosts = await prisma.blogPosts.findMany({
    where: {
      draft: false,
    },
    select: {
      slug: true,
    },
  });

  return blogPosts.map(({ slug }) => ({
    slug,
  }));
};

const getBlog = cache(async (slug: string) => {
  const blog = await prisma.blogPosts.findUnique({
    where: { slug },
    include: {
      activity: true,
      comments: {
        include: {
          user: {
            select: { image: true, username: true, name: true },
          },
        },
      },
      author: {
        select: { image: true, username: true, name: true },
      },
    },
  });
  if (!blog) notFound();
  return blog;
});

export const generateMetadata = async ({
  params: { slug },
}: BlogPageProps): Promise<Metadata> => {
  const job = await getBlog(slug);
  return {
    title: `${job.title}`,
    description: `${job.description}`,
  };
};

const BlogPage = async ({ params: { slug } }: BlogPageProps) => {
  const blog = await getBlog(slug);

  const {
    authorId,
    title,
    bannerImage,
    content,
    createdAt,
    id,
    tags,
    activity: [{ totalLikes }],
    comments,
    author,
  } = blog;

  if (!author) notFound();

  const { image, username, name } = author;

  const sessionUserPromise = getSessionUser();

  const similarBlogsPromise = prisma.blogPosts.findMany({
    where: {
      tags: {
        hasSome: tags,
      },
      NOT: {
        id,
      },
    },
    take: 2,
  });

  const increaseReads = prisma.activity.update({
    where: {
      blogPostId: id,
    },
    data: {
      totalReads: {
        increment: 1,
      },
    },
  });

  const increaseUserReads = prisma.user.update({
    where: {
      id: authorId!,
    },
    data: {
      totalReads: {
        increment: 1,
      },
    },
  });

  const [sessionUser, similarBlogs] = await Promise.all([
    sessionUserPromise,
    similarBlogsPromise,
    increaseReads,
    increaseUserReads,
  ]);

  const disabled = sessionUser ? false : true;

  return (
    <>
      <article className="space-y-10">
        <div className="relative h-96 w-full overflow-hidden rounded">
          <Image
            src={bannerImage}
            alt={title}
            className="absolute object-cover"
            fill
          />
        </div>
        <H1>{title}</H1>
        <div className="flex w-full items-start justify-between gap-3">
          <div className="mb-2 flex w-full items-center gap-5 md:gap-7">
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={image! || "/vercel.svg"}
                fill
                alt={name!}
                className="absolute object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-muted-foreground underline transition dark:hover:text-primary-foreground">
                <Link href={`/user/${username}`}>@{username}</Link>
              </p>
            </div>
          </div>
          <div>
            <p>Published on {convertDate(createdAt)}</p>
          </div>
        </div>
        <div>
          <BlogActivity
            disabled={disabled}
            blog={blog}
            totalLikes={totalLikes}
            comments={comments.length}
          >
            <BlogComments title={title} blogId={id} comments={comments} />
          </BlogActivity>
          <NewEditor readOnly={true} data={content} />
        </div>
      </article>
      {similarBlogs.length > 0 && (
        <div className="py-4">
          <H2 className="mb-2 mt-0">Similar Blogs</H2>
          <div className="mb-10 space-y-4 divide-y-2">
            <Suspense
              fallback={Array.from({ length: 2 }).map((_, i) => (
                <HomeBlogSkeleton key={i} />
              ))}
            >
              {similarBlogs.map((blog) => (
                <ReadBlog type="home" key={blog.id} blog={blog} />
              ))}
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPage;
