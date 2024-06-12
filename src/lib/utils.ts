import prisma from "@/db/db";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";
import { auth } from "@/auth";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateUsername = async (email: string) => {
  let username = email.split("@").at(0);
  const count = await prisma.user.count({ where: { email } });
  if (count > 0) {
    return (username += nanoid(5));
  }
  return username;
};

export const getSessionUser = async () => {
  const session = await auth();
  const user = session?.user;
  return user;
};

export const convertDate = (
  dateString: Date,
  formatString: string = "dd MMMM",
): string => {
  return format(new Date(dateString), formatString);
};
