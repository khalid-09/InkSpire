import RichTextEditor from "@/components/blog/editor/rich-text-editor";
import BlogActivity from "@/components/blog/home/blog-activity";
import { H1 } from "@/components/typography";
import prisma from "@/db/db";
import { getUserById } from "@/lib/data/user";
import { convertDate } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import BlogPageLoading from "./loading";

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
  const blog = await prisma.blogPosts.findUnique({ where: { slug } });
  if (!blog) notFound();
  return blog;
});

export const generateMetadata = async ({
  params: { slug },
}: BlogPageProps): Promise<Metadata> => {
  const job = await getBlog(slug);
  return {
    title: `${job.title}`,
  };
};

const BlogPage = async ({ params: { slug } }: BlogPageProps) => {
  const blog = await getBlog(slug);

  const { authorId, title, bannerImage, content, createdAt } = blog;

  const user = await getUserById(authorId!);

  return (
    <>
      {" "}
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
                src={user?.image! || "/vercel.svg"}
                fill
                alt={user?.name!}
                className="absolute object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-muted-foreground underline transition dark:hover:text-primary-foreground">
                <Link href={`/user/${user?.username}`}>@{user?.username}</Link>
              </p>
            </div>
          </div>
          <div>
            <p>Published on {convertDate(createdAt)}</p>
          </div>
        </div>
        <BlogActivity />
        <RichTextEditor editable={false} content={content} />
        <BlogActivity />
      </article>
    </>
  );
};

export default BlogPage;
