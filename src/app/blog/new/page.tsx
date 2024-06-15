import { getSessionUser } from "@/lib/utils";
import { redirect } from "next/navigation";
import CreateNewBlog from "@/components/blog/create-new-blog";

const NewBlogPage = async () => {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  return (
    <>
      <CreateNewBlog />
    </>
  );
};

export default NewBlogPage;
