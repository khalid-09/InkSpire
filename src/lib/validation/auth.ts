import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z
      .string({ required_error: "Full name is required" })
      .min(3, { message: "Full name must be at least 3 characters" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({
        required_error: "Current password is required",
      })
      .min(8, { message: "Password must be at least 8 characters" }),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
