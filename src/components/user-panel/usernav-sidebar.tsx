"use client";

import { H3 } from "@/components/typography";
import { cn } from "@/lib/utils";
import { Bell, LockKeyhole, Notebook, SquarePen, User } from "lucide-react";
import { usePathname } from "next/navigation";

interface CurrentPath {
  currentPath: "blogs" | "notifications" | "edit-profile" | "change-password";
}

const UserNavSideBar = () => {
  const pathname = usePathname();
  const currentPath = pathname.split("/").at(2) as CurrentPath["currentPath"];

  const activeStyles =
    "transition transition-all font-semibold border-muted-foreground border-r-2 text-xl";

  return (
    <aside className=" w-1/7 h-full pr-4">
      <div className="mt-10 h-2/6">
        <H3 className="mb-12">Dashboard</H3>
        <div className=" space-y-7">
          <div
            className={cn(
              "flex items-center gap-3",
              currentPath === "blogs" && activeStyles,
            )}
          >
            <Notebook className="h-5 w-5" />
            <span>Blogs</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-3",
              currentPath === "notifications" && activeStyles,
            )}
          >
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </div>
          <div className="flex items-center gap-3">
            <SquarePen className="h-5 w-5" />
            <span className="text-lg">Write</span>
          </div>
        </div>
      </div>
      <div className="h-4/6">
        <H3 className="mb-12">Settings</H3>
        <div className=" space-y-7">
          <div
            className={cn(
              "flex items-center gap-3",
              currentPath === "edit-profile" && activeStyles,
            )}
          >
            <User className="h-5 w-5" />
            <span>Edit Profile</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-3",
              currentPath === "change-password" && activeStyles,
            )}
          >
            <LockKeyhole className="h-5 w-5" />
            <span>Change Password</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default UserNavSideBar;
