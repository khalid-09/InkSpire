"use client";

import { useEffect, useOptimistic, useState } from "react";
import { addLikes, checkIfUserLiked, removeLike } from "@/actions/likes";
import { toast } from "sonner";

import BlogComments from "./blog-comments";

import { Button } from "@/components/ui/button";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { BlogPosts } from "@prisma/client";

interface BlogActivityProps {
  children: React.ReactNode;
  blog: BlogPosts;
  totalLikes: number;
  disabled: boolean;
  comments: number;
}

const BlogActivity = ({
  children,
  disabled,
  totalLikes,
  blog: { id: blogId },
  comments,
}: BlogActivityProps) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(totalLikes);

  useEffect(() => {
    const checkUserLikeStatus = async () => {
      const liked = await checkIfUserLiked(blogId);
      setHasLiked(liked!);
    };

    checkUserLikeStatus();
  }, [blogId]);

  const handleLikes = async () => {
    if (disabled) return toast.info("Login to like this post.");

    if (hasLiked) {
      setOptimisticLikes((prevLikes) => prevLikes - 1);
      setHasLiked(false);
      toast.warning("Removed from favorites 💔");

      try {
        await removeLike(blogId);
      } catch (error) {
        console.log(error);
        setOptimisticLikes((prevLikes) => prevLikes + 1);
        setHasLiked(true);
        toast.error("Error removing like.");
      }
      return;
    }

    setOptimisticLikes((prevLikes) => prevLikes + 1);
    setHasLiked(true);
    toast.success("Added to favorites 💖");

    try {
      await addLikes(blogId);
    } catch (error) {
      console.log(error);
      setOptimisticLikes((prevLikes) => prevLikes - 1);
      setHasLiked(false);
      toast.error("Error adding like.");
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Button onClick={handleLikes} variant="secondary" size="icon">
            {hasLiked ? (
              <GoHeartFill className="h-5 w-5 text-primary" />
            ) : (
              <GoHeart className="h-5 w-5" />
            )}
          </Button>
          <p className="text-xl tabular-nums">{optimisticLikes}</p>
        </div>
        {children}
        <p className="text-xl tabular-nums">{comments}</p>
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
