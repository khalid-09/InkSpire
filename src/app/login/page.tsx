import LoginForm from "@/components/auth/login-form";
import { H3 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  return (
    <section className="mt-20 flex flex-row items-center justify-center ">
      <div className="w-full space-y-10 sm:w-2/3 md:w-[40%]">
        <H3 className="text-center">Welcome Back</H3>
        <LoginForm />
        <div className="space-y-4">
          <Button
            variant="secondary"
            className="w-full space-x-3 rounded-full px-2 py-5"
          >
            <FcGoogle className="h-6 w-6" />
            <span className="text-base">Continue with Google</span>
          </Button>
          <div className="flex flex-wrap items-center justify-center">
            <p className="text-muted-foreground">
              Don&apos;t have an account ?
            </p>
            <Button variant="link" asChild>
              <Link href="/signup">Join us today.</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;