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
    <section className="flex min-h-dvh flex-col md:flex-row">
      <UserNavSideBar />
      <div className="mt-10 w-full md:w-[80%]">{children}</div>
    </section>
  );
};

export default UserPanelLayout;
