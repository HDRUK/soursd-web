const keycloakConfig = {
  realm: `${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}`,
  clientId: `${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}`,
  clientSecret: `${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET}`,
  authServerUrl: `${process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL}`,
  redirectUri: `${process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URL}`,
};

export default keycloakConfig;
