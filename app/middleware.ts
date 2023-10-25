import { NextResponse } from 'next/server'


export const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3000, https://laginow.com, https://laginow-v4.vercel.app',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function middleware(request: Request) {
  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, { headers: corsHeaders })
  }
}

export const config = {
  matcher: '/api/:path*',
}