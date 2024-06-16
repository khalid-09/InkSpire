import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "../ui/avatar";
import Image from "next/image";
import { auth } from "@/auth";
import Link from "next/link";
import { getUserById } from "@/lib/data/user";
import SignOutBtn from "../auth/sign-out-btn";
import AnimationWrapper from "../animation-wrapper";
import { getSessionUser } from "@/lib/utils";
import { User } from "@prisma/client";

const UserDropdown = async () => {
  const user = await getSessionUser();
  const author = (await getUserById(user?.id!)) as User;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <Image
            src={author.image! || "/vercel.svg"}
            height={50}
            width={50}
            alt={author.name!}
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <AnimationWrapper>
          {" "}
          <DropdownMenuLabel className="cursor-pointer">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="block cursor-pointer text-base font-medium md:hidden"
            asChild
          >
            <Link href={`/blog/new`}>Write</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-base font-medium"
            asChild
          >
            <Link href={`/user/${author.username}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-base font-medium"
            asChild
          >
            <Link href="/dashboard/blogs">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-base font-medium"
            asChild
          >
            <Link href="/settings/edit-profile">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer flex-col items-start gap-2 text-base font-medium"
            asChild
          >
            <SignOutBtn />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span className="font-semibold">@{author.username}</span>
          </DropdownMenuItem>
        </AnimationWrapper>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
