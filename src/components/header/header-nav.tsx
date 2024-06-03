import Link from "next/link";
import { ModeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import MobileNav from "./mobile-nav";
import Categories from "./categories";
import {
  BellIcon,
  FileTextIcon,
  MagnifyingGlassIcon,
  ShadowNoneIcon,
} from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Inter } from "next/font/google";
import { auth } from "@/auth";
import SignOutBtn from "../auth/sign-out-btn";
import Image from "next/image";
import UserDropdown from "./user-dropdown";

const inter = Inter({ subsets: ["latin"] });

const HeaderNav = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-6">
      <Link href="/">
        <ShadowNoneIcon className="h-8 w-9" />
      </Link>
      <div className=" flex w-full max-w-6xl items-center justify-between gap-2 px-2">
        <div className="relative flex items-center gap-2 md:gap-4">
          <Input className="text-base md:px-7" placeholder="Search..." />
          <MagnifyingGlassIcon className="absolute left-2 top-[9px] hidden h-4 w-4 text-sm md:block" />
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button className="bg-muted" variant="outline" asChild>
                <Link href="/login" className="flex items-center gap-1">
                  <FileTextIcon className={`h-4 w-4  ${inter.className}`} />{" "}
                  <span className="hidden text-base md:block">Write</span>
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Button asChild size="icon" variant="outline">
                  <Link href="/">
                    <BellIcon />
                  </Link>
                </Button>
                <UserDropdown />
              </div>
            </>
          ) : (
            <>
              <Button variant="secondary" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default HeaderNav;
