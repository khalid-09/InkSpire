'use client';

import Link from 'next/link';
import { ModeToggle } from '../theme-toggle';
import { Button } from '../ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const HeaderNav = () => {
  return (
    <nav className="flex items-start md:items-center py-6 px-4 gap-12 justify-between md:justify-end">
      <ul className="flex gap-6 items-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/blog">All Blogs</Link>
        </li>
        <li>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="border-2">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[140px] py-3 space-y-2 px-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/blog/category/programming">React</Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/blog/category/programming">CSS</Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/blog/category/programming">
                          Animations
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/blog/category/programming">
                          Programming
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </li>
      </ul>
      <aside className="flex md:flex-row items-end md:items-center flex-col-reverse gap-2">
        <Button asChild>
          <Link href="/blog/new">Add Blog</Link>
        </Button>
        <ModeToggle />
      </aside>
    </nav>
  );
};

export default HeaderNav;
