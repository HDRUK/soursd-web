// src/app/api/auth/logout/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Handle the GET request for logging out
export async function GET() {
  // Access the cookies API to remove cookies
  const cookieStore = cookies();

  // Remove the access_token and refresh_token cookies
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  return NextResponse.redirect(encodeURI("http://localhost:3000"));
}
