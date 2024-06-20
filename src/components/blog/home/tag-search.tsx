import prisma from "@/db/db";
import TagList from "./tag-list";
import { P } from "@/components/typography";

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
      {tags.length === 0 && (
        <P className="[&:not(:first-child)]:mt-0">No interests found</P>
      )}
    </div>
  );
};

export default TagSearch;
