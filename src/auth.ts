import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db/db";
import authConfig from "./auth.config";
import { generateUsername } from "./lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  events: {
    async linkAccount({ user }) {
      const username = await generateUsername(user.email!);
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
          username,
        },
      });
      await prisma.socialLinks.create({
        data: {
          userSocialLinkId: user.id!,
        },
      });
    },
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
