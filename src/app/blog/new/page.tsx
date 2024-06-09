import BlogEditor from "@/components/editor/blog-editor";
import { getSessionUser } from "@/lib/utils";
import { redirect } from "next/navigation";
import prisma from "@/db/db";

const NewBlogPage = async () => {
  const blog = await prisma.blogPosts.findUnique({
    where: {
      id: "6665ca1ed520b78cc6734161",
    },
    select: {
      description: true,
    },
  });
  console.log(blog);

  const user = await getSessionUser();
  if (!user) redirect("/login");
  return <BlogEditor blog={blog?.description!} />;
};

export default NewBlogPage;
