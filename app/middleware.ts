import { NextResponse, type NextRequest } from "next/server";

// Importing NextAuth and the authentication configuration
import NextAuth from 'next-auth';
import { authConfig } from '../auth.config';

// Exporting the authentication middleware using NextAuth and the provided configuration
export default NextAuth(authConfig).auth;


// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};