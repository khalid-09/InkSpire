import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/utils";
import UserNavSideBar from "@/components/user-panel/usernav-sidebar";
import prisma from "@/db/db";
import Breadcrumbs from "@/components/breadcrumbs";

const UserPanelLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect("/login");

  const user = await prisma.user.findUnique({
    where: {
      id: sessionUser.id,
    },
  });

  const showChangePassword = user?.password ? true : false;

  return (
    <section className="flex min-h-dvh flex-col md:flex-row">
      <Breadcrumbs showChangePassword={showChangePassword} />
      <UserNavSideBar showChangePassword={showChangePassword} />
      <div className="mt-10 w-full md:w-[80%]">{children}</div>
    </section>
  );
};

export default UserPanelLayout;
