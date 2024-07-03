"use client";

import { LoginSchema, loginSchema } from "@/lib/validation/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  EnvelopeClosedIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import { loginUser } from "@/actions/auth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const LoginForm = () => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "test@test.com",
      password: "testuser1",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    startTransition(() =>
      loginUser(data).then((data) => {
        if (data.type === "error") {
          toast.error(data.message);
          return;
        }
        toast.success(data.message);
      }),
    );
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center ">
                    <Input
                      className=" bg-secondary px-10 py-6 text-base dark:bg-background"
                      placeholder="Email"
                      disabled={isPending}
                      {...field}
                    />
                    <EnvelopeClosedIcon className="absolute left-3 top-[13px] h-5 w-5" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      type={open ? "text" : "password"}
                      className="bg-secondary px-10 py-6 text-base dark:bg-background"
                      disabled={isPending}
                      placeholder="Password"
                      {...field}
                    />
                    <LockClosedIcon className="absolute left-3 top-[13px] h-5 w-5" />
                    <span className="cursor-pointer">
                      {!open ? (
                        <EyeOpenIcon
                          onClick={() => setOpen((open) => !open)}
                          className="absolute right-3 top-[13px] h-6 w-6"
                        />
                      ) : (
                        <EyeClosedIcon
                          onClick={() => setOpen((open) => !open)}
                          className="absolute right-3 top-[13px] h-6 w-6"
                        />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" flex items-center justify-center">
          <Button disabled={isPending} className="rounded-full" type="submit">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Log In
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
