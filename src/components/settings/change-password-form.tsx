"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { changePassword } from "@/actions/auth";
import { toast } from "sonner";

import {
  ChangePasswordSchema,
  changePasswordSchema,
} from "@/lib/validation/auth";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { H4 } from "../typography";
import { Loader2 } from "lucide-react";

const ChangePasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit = (data: ChangePasswordSchema) => {
    startTransition(async () => {
      const { type, message } = await changePassword(data);
      if (type === "error") {
        toast.error(message);
        return;
      }
      toast.success(message);
    });
    reset();
  };

  return (
    <div className="px-4">
      <H4 className="mb-4">Change Password</H4>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="w-full md:w-1/2"
                    placeholder="Current Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="w-full md:w-1/2"
                    placeholder="New Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="w-full md:w-1/2"
                    placeholder="Confirm New Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} className="rounded-full" type="submit">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Change Password
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
