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
    <nav className="flex z-50 items-start md:items-center py-6 px-4 gap-12 justify-between md:justify-end">
      <ul className="flex gap-6 items-center">
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
                  <ul className="w-[140px] py-3 space-y-2 px-4">
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
      <aside className="flex md:flex-row items-end md:items-center flex-col-reverse gap-2">
        <Button asChild>
          <Link href="/blog/new">Write a Blog</Link>
        </Button>
        <ModeToggle />
      </aside>
    </nav>
  );
};

export default HeaderNav;
