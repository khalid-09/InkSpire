import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/validation/auth";
import { getUserByEmail } from "./lib/data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const matchEmail = user.email === email;
          const matchPasswords = await bcrypt.compare(password, user.password);

          if (matchPasswords && matchEmail) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
