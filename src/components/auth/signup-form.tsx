"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, signupSchema } from "@/lib/validation/auth";

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
  LockOpen1Icon,
} from "@radix-ui/react-icons";
import { FaUser } from "react-icons/fa6";

const SignupForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignupSchema) => {
    console.log(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center ">
                    <Input
                      className=" bg-secondary px-10 py-6 text-base dark:bg-background"
                      placeholder="Full Name"
                      {...field}
                    />
                    <FaUser className="absolute left-3 top-[13px] h-5 w-5" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      placeholder="Password"
                      {...field}
                    />
                    <LockOpen1Icon className="absolute left-3 top-[13px] h-5 w-5" />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      type={open ? "text" : "password"}
                      className="bg-secondary px-10 py-6 text-base dark:bg-background"
                      placeholder="Confirm Password"
                      {...field}
                    />
                    <LockClosedIcon className="absolute left-3 top-[13px] h-5 w-5" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" flex items-center justify-center">
          <Button className="rounded-full" type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
