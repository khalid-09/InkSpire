import prisma from "@/db/db";
import { cache } from "react";
import { Metadata } from "next";
import { getSessionUser } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";

import CreateNewBlog from "@/components/blog/create-new-blog";

interface EditBlogPageProps {
  params: {
    slug: string;
  };
}

const getBlog = cache(async (slug: string) => {
  const blog = await prisma.blogPosts.findUnique({
    where: { slug },
  });
  if (!blog) notFound();
  return blog;
});

export const generateMetadata = async ({
  params: { slug },
}: EditBlogPageProps): Promise<Metadata> => {
  const blog = await getBlog(slug);

  return {
    title: `Edit - ${blog.title}}`,
    description: `${blog.description}}`,
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

const EditBlogPage = async ({ params: { slug } }: EditBlogPageProps) => {
  const sessionUserPrommise = getSessionUser();

  const [sessionUser, blog] = await Promise.all([
    sessionUserPrommise,
    getBlog(slug),
  ]);
  if (!sessionUser) redirect("/login");

  return <CreateNewBlog blog={blog!} location="edit" />;
};

export default EditBlogPage;
