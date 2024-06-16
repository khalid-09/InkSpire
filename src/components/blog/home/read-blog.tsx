import prisma from "@/db/db";
import { BlogPosts } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { H3, P } from "@/components/typography";
import { GoHeartFill } from "react-icons/go";
import { cn, convertDate } from "@/lib/utils";
import { getUserById } from "@/lib/data/user";

interface ReadBlogProps {
  blog: BlogPosts;
  type: "home" | "trending";
  index?: number;
}

const ReadBlog = async ({
  type,
  index,
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
  const userPromise = getUserById(authorId!);

  const blogActivityPromise = prisma.activity.findUnique({
    where: {
      blogPostId: id,
    },
  });

  const [user, blogActivity] = await Promise.all([
    userPromise,
    blogActivityPromise,
  ]);

  if (!user) throw new Error("User not found");
  if (!blogActivity)
    throw new Error("Trouble fetching blog activity, try again later!");

  const { totalLikes } = blogActivity;

  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "group flex justify-between gap-4 py-4",
        type === "trending" && "flex-row-reverse",
      )}
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
            <H3 className="line-clamp-2 transition group-hover:text-primary">
              {title}
            </H3>
            <P className="line-clamp-2 [&:not(:first-child)]:mt-0">
              {description}
            </P>
          </div>
          <div
            // className={cn(
            //   "flex items-center gap-3",
            //   type === "trending" && "hidden",
            // )}
            className="flex items-center gap-3"
          >
            <Badge>{tags.at(0)}</Badge>
            <div className="flex items-center gap-1">
              <GoHeartFill className="h-5 w-5" />
              <p>{totalLikes || 0}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "relative h-40 w-44 overflow-hidden rounded-md",
          type === "trending" && "hidden",
        )}
      >
        <Image
          src={bannerImage}
          fill
          alt={title}
          className="absolute object-cover"
        />
      </div>
      <div
        className={cn(
          "flex h-40 w-28 justify-center overflow-hidden rounded-md text-6xl  font-medium text-muted-foreground",
          type === "home" && "hidden",
        )}
      >
        <p>0{index! + 1}</p>
      </div>
    </Link>
  );
};

export default ReadBlog;
