"use client";

import { BlogSchema } from "@/lib/validation/blog";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

// export type Blog = {
//   title: string;
//   blocks: string;
//   image: string;
//   description: string;
//   tags: string[];
// };

interface BlogContextInterface {
  blog: BlogSchema;
  setBlog: Dispatch<SetStateAction<BlogSchema>>;
}

interface BlogContextProviderProps {
  children: React.ReactNode;
}

const initialState = {
  blog: {
    title: "",
    blocks: "",
    image: "/blog-banner.png",
    description: "",
    tags: [],
  },
  setBlog: (blog: BlogSchema) => {},
} as BlogContextInterface;

const BlogContext = createContext(initialState);

export const BlogContextProvider = ({ children }: BlogContextProviderProps) => {
  const [blog, setBlog] = useState<BlogSchema>({
    title: "",
    blocks: "",
    image: "/blog-banner.png",
    description: "",
    tags: [],
  });

  return (
    <BlogContext.Provider value={{ blog, setBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("BlogContext must be used within a BlogProvider");
  }
  return context;
};
