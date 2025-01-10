import axios from "axios";
import keycloak from "@/config/keycloak";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookieStore = cookies();
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const redirectPath = cookieStore.get("redirectPath") ?? { value: "/" };

  cookieStore.delete("redirectPath");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code is missing" },
      { status: 400 }
    );
  }

  const tokenUrl = `${keycloak.authServerUrl}/realms/${keycloak.realm}/protocol/openid-connect/token`;

  console.log("**** TOKEN URL", tokenUrl);

  try {
    console.log("**** POST AUTH", {
      grant_type: "authorization_code",
      client_id: keycloak.clientId,
      client_secret: keycloak.clientSecret,
      code,
      redirect_uri: keycloak.redirectUriLogin,
    });

    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: keycloak.clientId,
        client_secret: keycloak.clientSecret,
        code,
        redirect_uri: keycloak.redirectUriLogin,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    console.log("*** RESPONSE", response?.data);

    const { access_token, refresh_token, expires_in } = response.data;

    console.log("**** access_token", access_token);

    cookieStore.set("access_token", access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: expires_in,
    });

    const maxAge = parseInt(
      process.env.NEXT_PUBLIC_COOKIE_EXPIRATION_VALUE || "2592000",
      10
    );

    cookieStore.set("refresh_token", refresh_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge,
    });

    scheduleTokenRefresh(refresh_token, expires_in - 60);

    return NextResponse.redirect(
      encodeURI(`${process.env.NEXT_PUBLIC_LOCAL_ENV}${redirectPath.value}`)
    );
  } catch (_) {
    const errorType = encodeURIComponent("login");
    return NextResponse.redirect(
      encodeURI(
        `${process.env.NEXT_PUBLIC_LOCAL_ENV}/en/error?type=${errorType}`
      )
    );
  }
}

// Function to refresh the access token using the refresh token
async function refreshAccessToken(refreshToken: string) {
  const tokenUrl = `${keycloak.authServerUrl}/realms/${keycloak.realm}/protocol/openid-connect/token`;

  try {
    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: "refresh_token",
        client_id: keycloak.clientId,
        client_secret: keycloak.clientSecret,
        refresh_token: refreshToken,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    // Update cookies with new tokens
    const cookieStore = cookies();
    cookieStore.set("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: expires_in,
    });

    cookieStore.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    scheduleTokenRefresh(refresh_token, expires_in - 60);
  } catch (error) {
    console.error("Failed to refresh token:", error);
  }
}

function scheduleTokenRefresh(refreshToken: string, delay: number) {
  setTimeout(() => refreshAccessToken(refreshToken), delay * 1000);
}
