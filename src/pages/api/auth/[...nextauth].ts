import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import { signIn, loginWithGoogle } from "@/lib/firebase/service";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn(email);
        if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log(passwordMatch);
          if (passwordMatch) return user;
          return null;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      if (account?.provider === "google") {
        console.log(user);
        const data: any = {
          email: user.email,
          name: user.name,
          type: "google",
          password: user.id,
        };

        token = await loginWithGoogle(data);
        console.log(token);
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("name" in token) {
        session.user.name = token.name;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }
      console.log(session);
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
