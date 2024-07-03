import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/utils";

import ChangePasswordForm from "@/components/settings/change-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password",
  description: "Change your password here",
};

const ChangePasswordPage = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect("/login");

  return <ChangePasswordForm />;
};

export default ChangePasswordPage;
