import BlogEditor from "@/components/editor/BlogEditor";
import { getSessionUser } from "@/lib/utils";
import { redirect } from "next/navigation";

const NewBlogPage = async () => {
  const user = await getSessionUser();

  if (!user) redirect("/login");

  return <BlogEditor />;
};

export default NewBlogPage;
