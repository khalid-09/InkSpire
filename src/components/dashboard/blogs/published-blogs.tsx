import { Button } from "@/components/ui/button";
import { convertDate } from "@/lib/utils";
import { Activity, BlogPosts, Comments } from "@prisma/client";
import Image from "next/image";
import DeleteBlog from "./delete-blog";
import { Pencil } from "lucide-react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

type activity = {
  activity: Activity[];
};

interface PublishedBlogsProps {
  blog: BlogPosts & activity;
}

const PublishedBlogs = ({
  blog: {
    bannerImage,
    title,
    createdAt,
    id,
    authorId,
    slug,
    activity: [{ id: activityId, totalComments, totalLikes, totalReads }],
  },
}: PublishedBlogsProps) => {
  return (
    <div className="flex flex-col items-start justify-between gap-6 pt-2 md:flex-row md:items-center">
      <div className="flex gap-4">
        <div className="relative h-28 w-28 overflow-hidden rounded-sm ">
          <Image
            src={bannerImage}
            alt={title}
            fill
            className="absolute object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <span className="line-clamp-1">{title}</span>
            <span>Published on {convertDate(createdAt)}</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href={`/blog/edit/${slug}`} className="space-x-1">
                <Pencil1Icon className="h-4 w-4" />
                <span>Edit</span>
              </Link>
            </Button>
            <DeleteBlog authorId={authorId!} id={id} activityId={activityId} />
          </div>
        </div>
      </div>
      <div className="flex  items-center gap-4">
        <div className="flex flex-col items-center">
          <span>{totalLikes || 0}</span>
          <span>Likes</span>
        </div>
        <div className="flex flex-col items-center">
          <span>{totalReads || 0}</span>
          <span>Reads</span>
        </div>
        <div className="flex flex-col items-center">
          <span>{totalComments || 0}</span>
          <span>Comments</span>
        </div>
      </div>
    </div>
  );
};

export default PublishedBlogs;
