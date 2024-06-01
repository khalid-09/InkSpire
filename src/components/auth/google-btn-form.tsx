import { signIn } from "@/auth";
import GoogleBtn from "./google-btn";

const GoogleBtnForm = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/category/react" });
      }}
    >
      <GoogleBtn />
    </form>
  );
};

export default GoogleBtnForm;
