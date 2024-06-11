import { useBlog } from "@/context/blog-context";
import { Textarea } from "../../ui/textarea";

const BlogTitle = () => {
  const {
    blog,
    blog: { title },
    setBlog,
  } = useBlog();

  return (
    <Textarea
      placeholder="Blog Title"
      value={title}
      onChange={(e) => setBlog({ ...blog, title: e.target.value })}
      className="focus-visible:ring-non w-f ull mt-10 h-20 resize-none border-none text-4xl font-medium leading-tight shadow-none outline-none placeholder:opacity-40 focus-visible:outline-none focus-visible:ring-0"
    />
  );
};

export default BlogTitle;
