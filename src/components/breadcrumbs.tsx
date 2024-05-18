"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const categoryPathname = pathname.split("/").at(1);

  let category = {
    categoryLink: "",
    categoryName: "",
  };

  if (categoryPathname === "react") {
    category.categoryLink = "/category/react";
    category.categoryName = "React";
  } else if (categoryPathname === "css") {
    category.categoryLink = "/category/css";
    category.categoryName = "CSS";
  } else if (categoryPathname === "animations") {
    category.categoryLink = "/category/animations";
    category.categoryName = "Animations";
  } else {
    category.categoryLink = "/category/performance";
    category.categoryName = "Performance";
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="text-lg" asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="text-lg" asChild>
            <Link href={category.categoryLink}>Blog</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-lg">
            {category.categoryName}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
