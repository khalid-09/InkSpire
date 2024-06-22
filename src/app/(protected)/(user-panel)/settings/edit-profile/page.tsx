import { H4, P } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/lib/uploadthing";
import prisma from "@/db/db";
import { getSessionUser } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";
import { toast } from "sonner";
import EditProfileForm from "@/components/settings/edit-profile-form";

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
