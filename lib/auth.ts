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
    async redirect({ url, baseUrl }) {

      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {// This user return by provider {} as you mentioned above MY CONTENT {token:}

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
  events: {
    createUser: async (message) => {
      let user = message.user;

      // Check if there is an invite for this user
      const invite = await db.invite.findFirst({
        where: {
          email: user.email ?? '',
          accepted: true
        },
      });


      if (invite) {
        const staffMember = await db.staff.create({
          data: {
            user: {
              connect: {
                id: user.id,
              },
            },
            business: {
              connect: {
                id: invite.businessId,
              },
            },
          },
        });

        // Delete the invite after creating the staff record
        await db.invite.delete({
          where: {
            id: invite.id,
          },
        });
      }


    },
  }
};
