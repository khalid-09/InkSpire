import { signIn } from "@/auth";
import GoogleBtn from "./google-btn";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const GoogleBtnForm = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: DEFAULT_LOGIN_REDIRECT });
      }}
    >
      <GoogleBtn />
    </form>
  );
};

export default GoogleBtnForm;
