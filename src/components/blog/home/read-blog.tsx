import { H3, P } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import prisma from "@/db/db";
import { getSessionUser } from "@/lib/utils";
import { BlogPosts } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { GoHeart } from "react-icons/go";

interface ReadBlogProps {
  blog: BlogPosts;
}

const ReadBlog = async ({ blog }: ReadBlogProps) => {
  const user = await prisma.user.findUnique({
    where: {
      id: blog.authorId!,
    },
  });

  return (
    <Link
      href={`/blog/${blog.title}`}
      className="group flex justify-between gap-4 py-4"
    >
      <div className="w-full">
        <div className="mb-2 flex w-full items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={user?.image! || "/vercel.svg"}
              fill
              alt={user?.name!}
              className="absolute"
            />
          </div>
          <p className="text-sm">{user?.username || "tet"}</p>
          <p className="text-sm">@</p>
        </div>
        <div className="space-y-3">
          <div className="space-y-2">
            <H3 className="transition group-hover:text-primary">
              {blog.title}
            </H3>
            <P className="[&:not(:first-child)]:mt-0">{blog.description}</P>
          </div>
          <div className="flex items-center gap-3">
            <Badge>{blog.tags.at(0)}</Badge>
            <GoHeart className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="relative h-40 w-44 overflow-hidden rounded-md">
        <Image
          src={blog.bannerImage}
          fill
          alt={blog.title}
          className="absolute object-cover"
        />
      </div>
    </Link>
  );
};

export default ReadBlog;
