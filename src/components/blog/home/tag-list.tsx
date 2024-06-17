"use client";

import { useState } from "react";
import FormSubmitButton from "@/components/form-submit-button";
import { filterBlogByTag } from "@/actions/tag";

import { Button } from "@/components/ui/button";
import { Sparkles, WandSparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MotionButton = motion(Button);

interface TagListProps {
  tags: (string | undefined)[];
}

const TagList = ({ tags }: TagListProps) => {
  const [showAll, setShowAll] = useState(false);
  const initialTags = tags.slice(0, 7);
  const remainingTags = tags.slice(7);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {initialTags.map((tag) => (
          <form action={filterBlogByTag} key={tag}>
            <input type="hidden" name="tag" value={tag} />
            <FormSubmitButton
              type="submit"
              className="px-3 py-2 text-sm transition hover:scale-105"
            >
              {tag}
            </FormSubmitButton>
          </form>
        ))}
        <AnimatePresence>
          {showAll &&
            remainingTags.map((tag) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <form action={filterBlogByTag} key={tag}>
                  <input type="hidden" name="tag" value={tag} />
                  <FormSubmitButton
                    type="submit"
                    className="px-3 py-2 text-sm transition hover:scale-105"
                  >
                    {tag}
                  </FormSubmitButton>
                </form>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
      {!showAll && remainingTags.length > 0 && (
        <MotionButton
          size="lg"
          onClick={() => setShowAll(true)}
          className="mt-2 space-x-2"
        >
          <span>Show more</span>
          <Sparkles />
        </MotionButton>
      )}
      {showAll && (
        <MotionButton
          size="lg"
          onClick={() => setShowAll(false)}
          className="mt-2 space-x-2"
        >
          <span>Show less</span>
          <WandSparkles />
        </MotionButton>
      )}
    </div>
  );
};

export default TagList;
