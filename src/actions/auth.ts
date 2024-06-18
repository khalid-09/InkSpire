"use server";

import { signIn } from "@/auth";
import prisma from "@/db/db";
import { getUserByEmail } from "@/lib/data/user";
import { generateUsername } from "@/lib/utils";
import {
  LoginSchema,
  SignupSchema,
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
