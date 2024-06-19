import { Button } from "@/components/ui/button";
import { convertDate } from "@/lib/utils";
import { Activity, BlogPosts } from "@prisma/client";
import Image from "next/image";

type activity = {
  activity: Activity[];
};

interface PublishedBlogsProps {
  blog: BlogPosts & activity;
}

const PublishedBlogs = ({ blog }: PublishedBlogsProps) => {
  return (
    <div className="flex flex-col items-start justify-between gap-6 pt-2 md:flex-row md:items-center">
      <div className="flex gap-4">
        <div className="relative h-28 w-28 overflow-hidden rounded-sm ">
          <Image
            src={blog.bannerImage}
            alt={blog.title}
            fill
            className="absolute object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <span className="line-clamp-1">{blog.title}</span>
            <span>Published on {convertDate(blog.createdAt)}</span>
          </div>
          <div className="flex gap-3">
            <Button className="flex-grow-0" variant="outline">
              Edit
            </Button>
            <Button>Delete</Button>
          </div>
        </div>
      </div>
      <div className="flex  items-center gap-4">
        <div className="flex flex-col items-center">
          <span>{blog.activity[0].totalLikes || 0}</span>
          <span>Likes</span>
        </div>
        <div className="flex flex-col items-center">
          <span>{blog.activity[0].totalReads || 0}</span>
          <span>Reads</span>
        </div>
        <div className="flex flex-col items-center">
          <span>{blog.activity[0].totalComments || 0}</span>
          <span>Comments</span>
        </div>
      </div>
    </div>
  );
};

export default PublishedBlogs;
