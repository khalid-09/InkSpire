"use server";

import { signIn } from "@/auth";
import prisma from "@/db/db";
import { getUserByEmail, getUserById } from "@/lib/data/user";
import { generateUsername, getSessionUser } from "@/lib/utils";
import {
  ChangePasswordSchema,
  LoginSchema,
  SignupSchema,
  changePasswordSchema,
  loginSchema,
  signupSchema,
} from "@/lib/validation/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export const loginUser = async (values: LoginSchema) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid Fields!", type: "error" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { message: "Invalid Credentials!", type: "error" };
        default:
          return { message: "Something went wrong!", type: "error" };
      }
    }
    throw err;
  }

  return { message: "Logged In!", type: "success" };
};

export const signupUser = async (values: SignupSchema) => {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: "Invalid Fields!", type: "error" };
  }

  const { email, name, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { type: "error", message: "User already exists!" };

  const username = await generateUsername(email);

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      username,
    },
  });

  await prisma.socialLinks.create({
    data: {
      userSocialLinkId: createdUser.id,
    },
  });

  //TODO: Send email verification

  return { message: "User created!", type: "success" };
};

export const changePassword = async (data: ChangePasswordSchema) => {
  const user = await getSessionUser();
  if (!user) {
    return { message: "You are not logged In!", type: "error" };
  }

  const { id } = user;

  const validatedFields = changePasswordSchema.safeParse(data);
  if (!validatedFields.success) {
    return { message: "Invalid Fields!", type: "error" };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  const existingUser = await getUserById(id!);

  if (!existingUser) return { message: "User not found!", type: "error" };

  const passwordMatch = await bcrypt.compare(
    currentPassword,
    existingUser.password!,
  );

  if (!passwordMatch) {
    return { message: "Current Password is Incorrect!", type: "error" };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: id!,
    },
    data: {
      password: hashedPassword,
    },
  });

  return { message: "Password Changed!", type: "success" };
};
