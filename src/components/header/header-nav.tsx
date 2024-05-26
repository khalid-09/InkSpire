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

const inter = Inter({ subsets: ["latin"] });

// const HeaderNav = () => {
//   return (
//     <nav className="z-50 flex flex-row items-start justify-between gap-12 px-6 py-6 md:items-center ">
//       <div className="hidden flex-col items-start gap-3 md:flex md:flex-row md:items-center md:gap-6">
//         <ul className="flex items-center gap-6">
//           <li>
//             <Link href="/">Home</Link>
//           </li>
//           <li>
//             <Link href="/blog">Blogs</Link>
//           </li>
//           <li>
//             <Categories />
//           </li>
//         </ul>
//         <Button asChild>
//           <Link href="/login">Write a Blog</Link>
//         </Button>
//       </div>
//       <div className="block md:hidden">
//         <Categories />
//       </div>
//       <div className="flex flex-row-reverse gap-2">
//         <MobileNav />
//         <ModeToggle />
//       </div>
//     </nav>
//   );
// };

const HeaderNav = () => {
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
          {/* <Button className="" variant="outline" asChild>
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
            <Avatar>
              <Button asChild size="icon" variant="outline">
                <Link href="/">
                  <AvatarImage
                    className=""
                    src="https://github.com/shadcn.png"
                  />
                </Link>
              </Button>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <ModeToggle />
          </div> */}
          <ModeToggle />
          <Button variant="secondary" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNav;
