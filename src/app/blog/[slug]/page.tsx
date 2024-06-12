import RichTextEditor from "@/components/blog/editor/rich-text-editor";
import BlogActivity from "@/components/blog/home/blog-activity";
import { H1 } from "@/components/typography";
import prisma from "@/db/db";
import { convertDate } from "@/lib/utils";
import { BlogPosts } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const id = decodeURIComponent(params.slug);
  const blog = (await prisma.blogPosts.findUnique({
    where: {
      id,
    },
  })) as BlogPosts;

  const { authorId, title, bannerImage, content, createdAt } = blog;

  const user = await prisma.user.findUnique({
    where: {
      id: authorId!,
    },
  });

  return (
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
              <Link href="/">@{user?.username}</Link>
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
  );
};

export default BlogPage;
