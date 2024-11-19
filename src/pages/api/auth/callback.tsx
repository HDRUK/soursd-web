import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import keycloak from "@/config/keycloak";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ error: "Authorization code is missing" });
  }

  const tokenUrl = `${keycloak.authServerUrl}/realms/${keycloak.realm}/protocol/openid-connect/token`;

  try {
    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: keycloak.clientId,
        client_secret: keycloak.clientSecret,
        code: code as string,
        redirect_uri: keycloak.redirectUri,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, refresh_token } = response.data;

    // Store tokens in cookies, session, or database
    res.status(200).json({ access_token, refresh_token });
  } catch (error) {
    console.error("Token exchange failed", error);
    res
      .status(500)
      .json({ error: "Failed to exchange authorization code for tokens" });
  }
}
