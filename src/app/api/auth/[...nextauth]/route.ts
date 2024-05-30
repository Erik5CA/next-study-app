import prisma from "@/libs/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "name" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const userFound = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });
        if (!userFound) {
          throw new Error("Invalid Credentials");
        }
        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );
        if (!passwordMatch) {
          throw new Error("Invalid Credentials");
        }
        const id = userFound.id.toString();
        const user = { id: id, name: userFound.name, email: userFound.email };
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (account) token.user = user;
      return token;
    },
    session({ session, token, user }) {
      // console.log({ session, token, user });
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
