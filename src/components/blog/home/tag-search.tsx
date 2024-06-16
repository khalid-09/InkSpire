import { filterBlogByTag } from "@/actions/tag";
import prisma from "@/db/db";

import FormSubmitButton from "@/components/form-submit-button";

const TagSearch = async () => {
  const tags = await prisma.blogPosts.findMany({
    where: {
      draft: false,
    },
    select: {
      tags: true,
    },
  });

  const uniqueTags = Array.from(new Set(tags.flatMap((tag) => tag.tags[0])));

  return (
    <div className="flex flex-wrap gap-2">
      {uniqueTags.map((tag) => (
        <form action={filterBlogByTag} key={tag}>
          <input type="hidden" name="tag" value={tag} />
          <FormSubmitButton
            type="submit"
            className=" px-3 py-2 text-sm transition hover:scale-105"
          >
            {tag}
          </FormSubmitButton>
        </form>
      ))}
    </div>
  );
};

export default TagSearch;
