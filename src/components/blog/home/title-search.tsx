"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TitleSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("title", value);
    } else {
      params.delete("title");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Input
      className="text-base md:px-7"
      placeholder="Search..."
      defaultValue={searchParams.get("query")?.toString()}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
    />
  );
};

export default TitleSearch;
