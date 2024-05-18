"use client";

import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const HeaderNav = () => {
  return (
    <nav className="z-50 flex items-start justify-between gap-12 px-6 py-6 md:items-center md:justify-end">
      <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-6">
        <ul className="flex items-center gap-6">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blogs</Link>
          </li>
          <li>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="border-2">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[140px] space-y-2 px-4 py-3">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/category/react">React</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/category/css">CSS</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/category/animations">Animations</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/category/programming">Programming</Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </li>
        </ul>
        <Button asChild>
          <Link href="/blog/new">Write a Blog</Link>
        </Button>
      </div>
      <ModeToggle />
    </nav>
  );
};

export default HeaderNav;
