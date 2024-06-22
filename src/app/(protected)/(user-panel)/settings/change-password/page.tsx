import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/utils";

import ChangePasswordForm from "@/components/settings/change-password-form";

const ChangePasswordPage = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect("/login");

  return <ChangePasswordForm />;
};

export default ChangePasswordPage;
