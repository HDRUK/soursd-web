import axios from "axios";
import keycloak from "@/config/keycloak";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookieStore = cookies();
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const redirectPath = "https://localhost:3000/en/account/type";

  cookieStore.delete("redirectPath");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code is missing" },
      { status: 400 }
    );
  }

  const tokenUrl = `${keycloak.authServerUrl}/realms/${keycloak.realm}/protocol/openid-connect/token`;

  try {
    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: keycloak.clientId,
        client_secret: keycloak.clientSecret,
        code,
        redirect_uri: keycloak.redirectUriRegister,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    console.log("here");
    const { access_token, refresh_token } = response.data;

    cookieStore.set("access_token", access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    cookieStore.set("refresh_token", refresh_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.redirect(
      encodeURI(`${process.env.NEXT_PUBLIC_LOCAL_ENV}${redirectPath}`)
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
