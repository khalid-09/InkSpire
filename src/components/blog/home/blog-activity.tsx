"use client";

import { Button } from "@/components/ui/button";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { MessageCircleMore } from "lucide-react";
import { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { toast } from "sonner";
import BlogComments from "./blog-comments";

const BlogActivity = () => {
  const [likes, setLikes] = useState(0);

  const handleClick = () => {
    if (likes === 1) {
      setLikes(0);
      return toast.warning("Removed from favorites 💔");
    }
    setLikes(1);
    toast.success("Added to favorites 💖");
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <div>
          <Button onClick={handleClick} variant="secondary" size="icon">
            {likes > 0 ? (
              <GoHeartFill className="h-5 w-5 text-primary" />
            ) : (
              <GoHeart className="h-5 w-5" />
            )}
          </Button>
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
