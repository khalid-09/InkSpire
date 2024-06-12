import prisma from "@/db/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (argId: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: argId } });
    return user;
  } catch {
    return null;
  }
};
