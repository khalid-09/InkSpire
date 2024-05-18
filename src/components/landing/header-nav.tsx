'use client';

import Link from 'next/link';
import { ModeToggle } from '../theme-toggle';
import { Button } from '../ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const components: { title: string; href: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
  },
];

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
      <div className="flex md:flex-row items-end md:items-center flex-col-reverse gap-2">
        <Button asChild>
          <Link href="/blog/new">Add Blog</Link>
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
};

interface ListItemProps {
  href: string;
  title: string;
}

const ListItem = ({ href, title }: ListItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={`
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'`}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = 'ListItem';

export default HeaderNav;
