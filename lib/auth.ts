import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import db from "@/lib/prisma"
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  // debug: true,
  adapter: PrismaAdapter(db as any),
  // session: {
  //   strategy: "jwt" as SessionStrategy,
  // },
  // pages: {
  //   signIn: "/login",
  // },
  secret: process.env.NEXT_AUTH as string,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }:any) {// This user return by provider {} as you mentioned above MY CONTENT {token:}

      if (user) {
        token.id = user.id
      }
      return token
    },

    async session({ session, token, user }: any): Promise<any> {
      // Send properties to the client, like an access_token and user id from a provider.
      return {
        ...session,
        user: {
          ...user,
          id: user?.id as string,
        },
      };
    },
    // async session({ token, session }: any) {
    //   if (token) {
    //     session.user.id = token.id
    //     session.user.name = token.name
    //     session.user.email = token.email
    //     session.user.image = token.picture
    //   }

    //   return session
    // },
    // async jwt({ token, user }: any) {
    //   const dbUser = await db.user.findFirst({
    //     where: {
    //       email: token.email,
    //     },
    //   })

    //   if (!dbUser) {
    //     if (user) {
    //       token.id = user?.id
    //     }
    //     return token
    //   }

    //   return {
    //     id: dbUser.id,
    //     name: dbUser.name,
    //     email: dbUser.email,
    //     picture: dbUser.image,
    //   }
    // },
  },
};
