"use client";

import { H3 } from "@/components/typography";
import { cn } from "@/lib/utils";
import { Bell, LockKeyhole, Notebook, SquarePen, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CurrentPath {
  currentPath: "blogs" | "notifications" | "edit-profile" | "change-password";
}

const UserNavSideBar = () => {
  const pathname = usePathname();
  const currentPath = pathname.split("/").at(2) as CurrentPath["currentPath"];

  const activeStyles =
    "transition transition-all font-semibold border-muted-foreground border-r-2";

  return (
    <aside className="hidden h-full w-full flex-1 md:block md:w-[20%]">
      <div className="mt-10 h-2/6">
        <H3 className="mb-12">Dashboard</H3>
        <div className="space-y-7">
          <Link
            href="/dashboard/blogs"
            className={cn(
              "flex items-center gap-3",
              currentPath === "blogs" && activeStyles,
            )}
          >
            <Notebook className="h-5 w-5" />
            <span>Blogs</span>
          </Link>
          <Link
            href="/dashboard/notifications"
            className={cn(
              "flex items-center gap-3",
              currentPath === "notifications" && activeStyles,
            )}
          >
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </Link>
          <Link href="/blog/new" className="flex items-center gap-3">
            <SquarePen className="h-5 w-5" />
            <span className="text-lg">Write</span>
          </Link>
        </div>
      </div>
      <div className="mt-20 h-4/6">
        <H3 className="mb-12">Settings</H3>
        <div className="space-y-7">
          <Link
            href="/settings/edit-profile"
            className={cn(
              "flex items-center gap-3",
              currentPath === "edit-profile" && activeStyles,
            )}
          >
            <User className="h-5 w-5" />
            <span>Edit Profile</span>
          </Link>
          <Link
            href="/settings/change-password"
            className={cn(
              "flex w-full items-center gap-3",
              currentPath === "change-password" && activeStyles,
            )}
          >
            <LockKeyhole className="h-5 w-5" />
            <span>Change Password</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default UserNavSideBar;
