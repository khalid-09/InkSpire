import prisma from "@/db/db";
import { Metadata } from "next";
import { getSessionUser } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";

import EditProfileForm from "@/components/settings/edit-profile-form";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Edit your profile here",
};

const EditProfilePage = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    include: { socialLinks: true },
  });

  if (!user) notFound();

  return <EditProfileForm user={user} />;
};

export default EditProfilePage;
