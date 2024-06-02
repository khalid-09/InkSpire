import { signOut } from "@/auth";
import { Button } from "../ui/button";

const SignOutBtn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
};

export default SignOutBtn;
