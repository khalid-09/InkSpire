import prisma from "@/db/db";
import TagList from "./tag-list";

const TagSearch = async () => {
  const tags = await prisma.blogPosts.findMany({
    where: {
      draft: false,
    },
    select: {
      tags: true,
    },
  });

  const uniqueTags = Array.from(new Set(tags.flatMap((tag) => tag.tags.at(0))));

  return (
    <div>
      <TagList tags={uniqueTags!} />
    </div>
  );
};

export default TagSearch;
