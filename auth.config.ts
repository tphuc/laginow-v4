import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthConfig } from "next-auth";
import prisma from "@/lib/prisma";

export const authConfig = {
    pages: {
        signIn:"/login"
      },
      adapter: PrismaAdapter(prisma as any),
      secret: process.env.NEXT_AUTH as string,
   
      providers: [], // We start with an empty array, adding providers as needed
} satisfies NextAuthConfig