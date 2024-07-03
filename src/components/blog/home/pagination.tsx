import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BlogFilterSchema } from "@/lib/validation/blog-filter";
import { ArrowLeftIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: BlogFilterSchema;
}

const Pagination = ({
  currentPage,
  totalPages,
  filterValues: { tag, query },
}: PaginationProps) => {
  const generatePageLink = (page: number) => {
    const searchParams = new URLSearchParams({
      ...(tag && { tag }),
      ...(query && { query }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  };

  return (
    <div className={`flex items-center justify-between`}>
      <Button asChild>
        <Link
          href={generatePageLink(currentPage - 1)}
          className={cn(
            "flex items-center gap-2 font-semibold",
            currentPage <= 1 && "invisible",
          )}
        >
          <ArrowLeftIcon size={16} />
          <span>Previous Page</span>
        </Link>
      </Button>
      <Button asChild>
        <Link
          href={generatePageLink(currentPage + 1)}
          className={cn(
            "flex items-center gap-2 font-semibold",
            currentPage >= totalPages && "invisible",
          )}
        >
          <span>Next Page</span>
          <ArrowRight size={16} />
        </Link>
      </Button>
    </div>
  );
};

export default Pagination;
