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

const UserDropdown = async () => {
  const session = await auth();
  const id = session?.user?.id;
  const user = await getUserById(id!);

  console.log(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <Image
            src={user?.image! || "/vercel.svg"}
            height={50}
            width={50}
            alt={user?.name!}
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
            <Link href={`/user/${user?.username}`}>Profile</Link>
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
          <DropdownMenuItem className="flex cursor-pointer flex-col items-start gap-2 text-base font-medium">
            <SignOutBtn />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span className="font-semibold">@{user?.username}</span>
          </DropdownMenuItem>
        </AnimationWrapper>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
