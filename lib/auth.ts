import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import db from "@/lib/prisma"
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db as any),
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
      const userInfo = await db.user.findUnique({
        where: { id: user.id },
        include: {
          businesses: true, 
        },
      });

      return {
        ...session,
        user: {
          ...userInfo,
          id: user?.id as string,
        },
      };
    },
  },
};
