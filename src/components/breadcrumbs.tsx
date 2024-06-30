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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import { Button } from "./ui/button";

interface BreadcrumbsProps {
  showChangePassword: boolean;
}

const Breadcrumbs = ({ showChangePassword }: BreadcrumbsProps) => {
  const pathname = usePathname();
  const userNavPathname = pathname.split("/").at(1);
  const userNavSubPathname = pathname.split("/").at(2);
  console.log(userNavPathname);

  return (
    <Breadcrumb className="mt-7 block md:hidden">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {userNavPathname?.charAt(0).toUpperCase()! +
                  userNavPathname?.slice(1)}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <Button asChild variant="outline">
                  <Link
                    href={
                      userNavPathname === "dashboard"
                        ? "/settings/edit-profile"
                        : "/dashboard/blogs"
                    }
                  >
                    {userNavPathname === "dashboard" ? "Settings" : "Dashboard"}
                  </Link>
                </Button>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            {showChangePassword && userNavPathname === "settings" ? (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      {userNavSubPathname?.charAt(0).toUpperCase()! +
                        userNavSubPathname?.slice(1)}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <Button asChild variant="outline">
                        <Link
                          href={
                            userNavSubPathname === "edit-profile"
                              ? "/settings/change-password"
                              : "/dashboard/edit-profile"
                          }
                        >
                          {userNavSubPathname === "edit-profile"
                            ? "Change Password"
                            : "Edit Profile"}
                        </Link>
                      </Button>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              userNavSubPathname?.charAt(0).toUpperCase()! +
              userNavSubPathname?.slice(1)
            )}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
