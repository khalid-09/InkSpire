"use client";

import { Button } from "@/components/ui/button";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { useEffect, useOptimistic, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { toast } from "sonner";
import BlogComments from "./blog-comments";
import { Activity } from "@prisma/client";
import { addLikes, checkIfUserLiked, removeLike } from "@/actions/activity";
import { getSessionUser } from "@/lib/utils";
import { redirect } from "next/navigation";

interface BlogActivityProps {
  blogId: string;
  blogActivity: Activity;
}

const BlogActivity = ({
  blogId,
  blogActivity: { totalLikes },
}: BlogActivityProps) => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const checkUserLikeStatus = async () => {
      const liked = await checkIfUserLiked(blogId);
      setHasLiked(liked);
      setLikes(liked ? 1 : 0);
    };

    checkUserLikeStatus();
  }, [blogId]);

  const handleLikes = async () => {
    // const user = await getSessionUser();
    // if (!user) toast.info("Please login to like a blog");

    if (hasLiked) {
      await removeLike(blogId);
      setLikes(0);
      setHasLiked(false);
      return toast.warning("Removed from favorites 💔");
    }

    await addLikes(blogId);
    setLikes(1);
    setHasLiked(true);
    toast.success("Added to favorites 💖");
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Button onClick={handleLikes} variant="secondary" size="icon">
            {likes > 0 ? (
              <GoHeartFill className="h-5 w-5 text-primary" />
            ) : (
              <GoHeart className="h-5 w-5" />
            )}
          </Button>
          <p className="text-xl">{totalLikes}</p>
        </div>
        <BlogComments />
      </div>
      <div>
        <Button variant="secondary" size="icon">
          <TwitterLogoIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default BlogActivity;
