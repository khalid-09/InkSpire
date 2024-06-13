import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/utils";
import UserNavSideBar from "@/components/user-panel/usernav-sidebar";

const UserPanelLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  return (
    <section className="flex h-[calc(100dvh-130px)] flex-col md:flex-row">
      <UserNavSideBar />
      <div className="w-6/7 mt-10">{children}</div>
    </section>
  );
};

export default UserPanelLayout;
