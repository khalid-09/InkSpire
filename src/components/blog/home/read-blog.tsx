import prisma from "@/db/db";
import { BlogPosts } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { H3, P } from "@/components/typography";
import { GoHeartFill } from "react-icons/go";
import { convertDate } from "@/lib/utils";
import { getUserById } from "@/lib/data/user";

interface ReadBlogProps {
  blog: BlogPosts;
}

const ReadBlog = async ({
  blog: {
    authorId,
    title,
    description,
    bannerImage,
    tags,
    createdAt,
    slug,
    id,
  },
}: ReadBlogProps) => {
  const user = await getUserById(authorId!);
  if (!user) throw new Error("User not found");

  const blogActivity = await prisma.activity.findUnique({
    where: {
      blogPostId: id,
    },
  });

  if (!blogActivity)
    throw new Error("Trouble fetching blog activity, try again later!");

  const { totalLikes } = blogActivity;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex justify-between gap-4 py-4"
    >
      <div className="w-full">
        <div className="mb-2 flex w-full items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={user.image! || "/vercel.svg"}
              fill
              alt={user.name!}
              className="absolute object-cover"
            />
          </div>
          <p className="text-sm">{user.username}</p>
          <p className="text-sm">@ {convertDate(createdAt)}</p>
        </div>
        <div className="space-y-3">
          <div className="space-y-2">
            <H3 className="transition group-hover:text-primary">{title}</H3>
            <P className="line-clamp-2 [&:not(:first-child)]:mt-0">
              {description}
            </P>
          </div>
          <div className="flex items-center gap-3">
            <Badge>{tags.at(0)}</Badge>
            <div className="flex items-center gap-1">
              <GoHeartFill className="h-5 w-5" />
              <p>{totalLikes || 0}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-40 w-44 overflow-hidden rounded-md">
        <Image
          src={bannerImage}
          fill
          alt={title}
          className="absolute object-cover"
        />
      </div>
    </Link>
  );
};

export default ReadBlog;
