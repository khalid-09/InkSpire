import Link from "next/link";
import { ModeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import MobileNav from "./mobile-nav";
import Categories from "./categories";

const HeaderNav = () => {
  return (
    <nav className="z-50 flex  flex-row items-start justify-between gap-12 px-6 py-6 md:items-center ">
      <div className="hidden flex-col items-start gap-3 md:flex md:flex-row md:items-center md:gap-6">
        <ul className="flex items-center gap-6">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blogs</Link>
          </li>
          <li>
            <Categories />
          </li>
        </ul>
        <Button asChild>
          <Link href="/login">Write a Blog</Link>
        </Button>
      </div>
      <div className="block md:hidden">
        <Categories />
      </div>
      <div className="flex flex-row-reverse gap-2">
        <MobileNav />
        <ModeToggle />
      </div>
    </nav>
  );
};

export default HeaderNav;
