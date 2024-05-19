import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { TextAlignLeftIcon } from "@radix-ui/react-icons";
import Categories from "./categories";
import Link from "next/link";

const links = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Blogs",
    link: "/blog",
  },
];

const MobileNav = () => {
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary" size="icon">
            <TextAlignLeftIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Navigation links</SheetDescription>
          </SheetHeader>
          <div className="mt-8">
            <ul className="flex flex-col items-center space-y-4">
              {links.map((link, index) => {
                return (
                  <li key={index}>
                    <SheetClose asChild>
                      <Button variant="ghost" asChild>
                        <Link href={link.link}>{link.title}</Link>
                      </Button>
                    </SheetClose>
                  </li>
                );
              })}
            </ul>
            <SheetFooter>
              <SheetClose asChild>
                <Button className="mt-8" asChild>
                  <Link href="/login">Write a Blog</Link>
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
