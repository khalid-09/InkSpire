"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface TitleSearchProps {
  location: string;
}

const TitleSearch = ({ location }: TitleSearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    const currentQuery = searchParams.get("query") || "";
    if (value !== currentQuery) {
      params.set("page", "1");
    }

    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    // replace(`${pathname}?${params.toString()}`);
    const newQuery = params.toString();
    push(`${pathname}?${newQuery}`, undefined);
  }, 300);

  const isVisible =
    (location === "dashboard" && pathname === "/dashboard/blogs") ||
    (location === "homepage" && pathname === "/");

  return (
    <div className={cn("", !isVisible && "invisible")}>
      <Input
        className="text-base md:px-7"
        placeholder="Search..."
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <MagnifyingGlassIcon className="absolute left-2 top-[9px] hidden h-4 w-4 text-sm md:block" />
    </div>
  );
};

export default TitleSearch;
