"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AnimationWrapperProps {
  children: React.ReactNode;
  initial?: { opacity: number };
  animate?: { opacity: number };
  transition?: { duration: number };
  className?: string;
}

const AnimationWrapper = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  className,
}: AnimationWrapperProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className={className}
        initial={initial}
        animate={animate}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
