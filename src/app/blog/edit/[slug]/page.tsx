import CreateNewBlog from "@/components/blog/create-new-blog";
import prisma from "@/db/db";
import { getSessionUser } from "@/lib/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = (): Metadata => {
  return {
    title: "Edit Blog Post",
    description:
      "Edit your blog post with an interactive editor with images and captions or lists or code snippets and many more..! Add tags and publish your blog post.",
  };
};

export const generateStaticParams = async () => {
  const blogPosts = await prisma.blogPosts.findMany({
    where: {
      draft: false,
    },
    select: {
      slug: true,
    },
  });

  return blogPosts.map(({ slug }) => ({ slug }));
};

interface EditBlogPageProps {
  params: {
    slug: string;
  };
}

const EditBlogPage = async ({ params: { slug } }: EditBlogPageProps) => {
  const sessionUserPrommise = getSessionUser();

  const blogPromise = prisma.blogPosts.findUnique({
    where: {
      slug,
    },
  });

  const [sessionUser, blog] = await Promise.all([
    sessionUserPrommise,
    blogPromise,
  ]);
  if (!sessionUser) redirect("/login");

  return <CreateNewBlog blog={blog!} location="edit" />;
};

export default EditBlogPage;
