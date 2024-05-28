import AnimationWrapper from "@/components/animation-wrapper";
import SignupForm from "@/components/auth/signup-form";
import { H3 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  return (
    <AnimationWrapper>
      <section className="mt-20 flex flex-row items-center justify-center ">
        <div className="w-full space-y-10 sm:w-2/3 md:w-[40%]">
          <H3 className="text-center">Join Us Today</H3>
          <SignupForm />
          <div className="relative my-10 flex w-full items-center gap-2 font-bold uppercase opacity-10">
            <hr className="w-1/2 border-muted-foreground" />
            <span>or</span>
            <hr className="w-1/2  border-muted-foreground" />
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Button
              variant="secondary"
              className="w-[90%] space-x-3 rounded-full px-2 py-5"
            >
              <FcGoogle className="h-6 w-6" />
              <span className="text-base">Continue with Google</span>
            </Button>
            <div className="flex flex-wrap items-center justify-center">
              <p className="text-muted-foreground">Already a member ?</p>
              <Button variant="link" asChild>
                <Link href="/login">Log In here.</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default LoginPage;
