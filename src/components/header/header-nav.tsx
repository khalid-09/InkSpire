import Link from "next/link";
import { ModeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import {
  BellIcon,
  FileTextIcon,
  MagnifyingGlassIcon,
  ShadowNoneIcon,
} from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Inter } from "next/font/google";
import { auth } from "@/auth";
import UserDropdown from "./user-dropdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TfiPencilAlt } from "react-icons/tfi";

const inter = Inter({ subsets: ["latin"] });

const HeaderNav = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="border-b border-muted/50 ">
      <nav className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-6">
        <Link href="/">
          <ShadowNoneIcon className="h-8 w-9" />
        </Link>
        <div className=" flex w-full max-w-6xl items-center justify-between gap-2 px-2">
          <div className="relative flex items-center gap-2 md:gap-4">
            <Input className="text-base md:px-7" placeholder="Search..." />
            <MagnifyingGlassIcon className="absolute left-2 top-[9px] hidden h-4 w-4 text-sm md:block" />
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            {user ? (
              <>
                <div className="hidden md:block">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button className="bg-muted" variant="outline" asChild>
                          <Link
                            href="/blog/new"
                            className="flex items-center gap-1"
                          >
                            <TfiPencilAlt
                              className={`h-4 w-4  ${inter.className}`}
                            />
                            <span className="hidden text-base md:block">
                              Write
                            </span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" align="center">
                        Write a new blog post
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild size="icon" variant="outline">
                        <Link href="/dashboard/notifications">
                          <BellIcon className="h-5 w-5 " />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="center">
                      Notifications
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <UserDropdown />
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
    </header>
  );
};

export default HeaderNav;
