import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { authConfig } from '../auth.config';

import prisma from "@/lib/prisma";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  // pages: {
  //   signIn: "/login"
  // },
  // adapter: PrismaAdapter(prisma as any),
  // secret: process.env.NEXT_AUTH as string,
  ...authConfig,
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
        const expiresIn = 365 * 24 * 60 * 60; // 365 days in seconds
        token.exp = Math.floor(Date.now() / 1000) + expiresIn;
        token.id = user.id
      }
      return token
    },

    async session({ session, token, user }: any): Promise<any> {
      // Send properties to the client, like an access_token and user id from a provider.
      const userInfo = await prisma.user.findUnique({
        where: { id: user.id },
        include: {
          businesses: {
            select: {
              id: true,
              ownerId: true,
              title: true,
              slug: true
            }
          },
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
      const invite = await prisma.invite.findFirst({
        where: {
          email: user.email ?? '',
          accepted: true
        },
      });


      if (invite) {
        const staffMember = await prisma.staff.create({
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
        await prisma.invite.delete({
          where: {
            id: invite.id,
          },
        });
      }


    },
  }
});
